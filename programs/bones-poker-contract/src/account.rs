use anchor_lang::prelude::*;

use crate::error::*;

#[account]
#[derive(Default)]
pub struct GlobalPool {
    // 8 + 128
    pub super_admin: Pubkey, // 32
    pub admin: Pubkey,       // 32
    pub backend: Pubkey,     // 32
    pub treasury: Pubkey,    // 32
}

#[account]
#[derive(Default)]
pub struct GamePool {
    // 8 + 1034
    pub table_count: u64,        // 8
    pub stack: [u64; 18],        // 144
    pub buy_in: [u64; 18],       // 144
    pub blinds: [u64; 18],       // 144
    pub max_seats: [u8; 18],     // 18
    pub pay_token: [Pubkey; 18], // 32*18
}

// #[account]
// #[zero_copy]
// #[derive(Default)]
#[account(zero_copy)]
pub struct TournamentPool {
    // 8 + 2298
    pub tournament_count: u64,       // 8
    pub stack: [u64; 20],            // 160
    pub buy_in: [u64; 20],           // 160
    pub blinds: [u64; 20],           // 160
    pub revenue: [Distribution; 20], // 88*20
    pub max_seats: [u8; 20],         // 20
    pub pay_token: [Pubkey; 20],     //32*20
}

#[derive(Default, AnchorDeserialize, AnchorSerialize, Copy, Clone)]
pub struct Distribution {
    pub reward: [u64; 10],
    pub reward_count: u64,
}

impl Default for TournamentPool {
    #[inline]
    fn default() -> TournamentPool {
        TournamentPool {
            tournament_count: 0,
            stack: [0; 20],
            buy_in: [0; 20],
            blinds: [0; 20],
            revenue: [Distribution {
                ..Default::default()
            }; 20],
            max_seats: [0; 20],
            pay_token: [Pubkey::default(); 20],
        }
    }
}
impl TournamentPool {
    pub fn register(
        &mut self,
        stack: u64,
        buy_in: u64,
        blinds: u64,
        max_seats: u8,
        pay_token: Pubkey,
        revenue: Vec<u64>,
    ) -> Result<()> {
        require!(self.tournament_count < 20, PokerError::MaxTournamentsLimit);
        self.stack[self.tournament_count as usize] = stack;
        self.buy_in[self.tournament_count as usize] = buy_in;
        self.blinds[self.tournament_count as usize] = blinds;
        self.max_seats[self.tournament_count as usize] = max_seats;
        self.pay_token[self.tournament_count as usize] = pay_token;
        self.tournament_count += 1;
        self.revenue[self.tournament_count as usize].reward_count = revenue.len() as u64;
        for i in 0..revenue.len() {
            self.revenue[self.tournament_count as usize].reward[i] = revenue[i];
        }
        Ok(())
    }

    pub fn remove(
        &mut self,
        stack: u64,
        buy_in: u64,
        blinds: u64,
        max_seats: u8,
        pay_token: Pubkey,
        revenue: Vec<u64>,
    ) -> Result<()> {
        require!(self.tournament_count > 0, PokerError::MinTournamentsLimit);
        let mut reward_plan = Distribution {
            reward: [0u64; 10],
            reward_count: 0 as u64,
        };
        for i in 0..revenue.len() {
            reward_plan.reward[i] = revenue[i];
            reward_plan.reward_count += 1;
        }
        let mut exist_flag: u8 = 0;
        for i in 0..self.tournament_count {
            let index = i as usize;
            if self.stack[index].eq(&stack)
                && self.buy_in[index].eq(&buy_in)
                && self.blinds[index].eq(&blinds)
                && self.max_seats[index].eq(&max_seats)
                && self.pay_token[index].eq(&pay_token)
                && self.revenue[index].reward.eq(&reward_plan.reward)
                && self.revenue[index]
                    .reward_count
                    .eq(&reward_plan.reward_count)
            {
                if i < self.tournament_count - 1 {
                    let last_idx = (self.tournament_count - 1) as usize;
                    self.stack[index] = self.stack[last_idx];
                    self.buy_in[index] = self.buy_in[last_idx];
                    self.blinds[index] = self.blinds[last_idx];
                    self.max_seats[index] = self.max_seats[last_idx];
                    self.pay_token[index] = self.pay_token[last_idx];
                    self.revenue[index].reward_count = self.revenue[last_idx].reward_count;
                    self.revenue[index].reward = self.revenue[last_idx].reward;
                }
                self.tournament_count -= 1;
                exist_flag = 1;
            }
        }
        require_eq!(exist_flag, 1u8, PokerError::TournamentNotFound);
        Ok(())
    }

    pub fn find(
        &mut self,
        stack: u64,
        buy_in: u64,
        blinds: u64,
        max_seats: u8,
        pay_token: Pubkey,
    ) -> Result<()> {
        let mut exist_flag: u8 = 0;
        for i in 0..self.tournament_count {
            let index = i as usize;
            if self.stack[index].eq(&stack)
                && self.buy_in[index].eq(&buy_in)
                && self.blinds[index].eq(&blinds)
                && self.max_seats[index].eq(&max_seats)
                && self.pay_token[index].eq(&pay_token)
            {
                exist_flag = 1;
            }
        }
        require_eq!(exist_flag, 1u8, PokerError::TournamentNotFound);
        Ok(())
    }
}
