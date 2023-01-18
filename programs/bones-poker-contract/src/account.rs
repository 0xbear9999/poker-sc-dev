use anchor_lang::prelude::*;

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

#[account]
#[derive(Default)]
pub struct TournamentPool {
    // 8 + 1034
    pub tournament_count: u64,   // 8
    pub stack: [u64; 18],        // 144
    pub buy_in: [u64; 18],       // 144
    pub blinds: [u64; 18],       // 144
    pub max_seats: [u8; 18],     // 18
    pub pay_token: [Pubkey; 18], //32*18
}
