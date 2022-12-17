use anchor_lang::prelude::*;
use solana_program::program::{invoke, invoke_signed};
use solana_program::system_instruction;

pub mod account;
pub mod constants;
pub mod error;

use account::*;
use constants::*;
use error::*;

declare_id!("A6gEoFvGyNPyYjYs7kQLibAsn3H8wD5f4rVDvBjTVace");

#[program]
pub mod bones_poker_contract {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, _global_bump: u8, _escrow_bump: u8) -> Result<()> {
        let global_authority = &mut ctx.accounts.global_authority;
        let (expected_address, expected_bump) = Pubkey::find_program_address(
            &[GLOBAL_AUTHORITY_SEED.as_bytes()],
            &bones_poker_contract::ID,
        );
        require_keys_eq!(global_authority.key(), expected_address);
        require_eq!(expected_bump, _global_bump, PokerError::InvalidBump);

        let (expected_escrow_address, expected_escrow_bump) = Pubkey::find_program_address(
            &[ESCROW_VAULT_SEED.as_bytes()],
            &bones_poker_contract::ID,
        );

        require_keys_eq!(ctx.accounts.escrow_vault.key(), expected_escrow_address);
        require_eq!(expected_escrow_bump, _escrow_bump, PokerError::InvalidBump);

        global_authority.super_admin = ctx.accounts.admin.key();

        Ok(())
    }

    pub fn update_admin(
        ctx: Context<UpdateAdmin>,
        _global_bump: u8,
        new_admin: Pubkey,
    ) -> Result<()> {
        let global_authority = &mut ctx.accounts.global_authority;

        // Validate PDA bump and seed
        let (expected_address, expected_bump) = Pubkey::find_program_address(
            &[GLOBAL_AUTHORITY_SEED.as_bytes()],
            &bones_poker_contract::ID,
        );
        require_keys_eq!(global_authority.key(), expected_address);
        require_eq!(expected_bump, _global_bump, PokerError::InvalidBump);

        // Assert payer is the superadmin
        require_keys_eq!(
            global_authority.super_admin,
            ctx.accounts.admin.key(),
            PokerError::InvalidSuperOwner
        );

        global_authority.admin = new_admin;
        Ok(())
    }

    pub fn update_treasury(
        ctx: Context<UpdateTreasury>,
        _global_bump: u8,
        treasury: Pubkey,
    ) -> Result<()> {
        let global_authority = &mut ctx.accounts.global_authority;

        // Validate PDA bump and seed
        let (expected_address, expected_bump) = Pubkey::find_program_address(
            &[GLOBAL_AUTHORITY_SEED.as_bytes()],
            &bones_poker_contract::ID,
        );
        require_keys_eq!(global_authority.key(), expected_address);
        require_eq!(expected_bump, _global_bump, PokerError::InvalidBump);

        // Assert payer is the superadmin
        require_keys_eq!(
            global_authority.super_admin,
            ctx.accounts.admin.key(),
            PokerError::InvalidSuperOwner
        );

        global_authority.treasury = treasury;
        Ok(())
    }

    pub fn update_backend(
        ctx: Context<UpdateBackend>,
        _global_bump: u8,
        backend: Pubkey,
    ) -> Result<()> {
        let global_authority = &mut ctx.accounts.global_authority;

        // Validate PDA bump and seed
        let (expected_address, expected_bump) = Pubkey::find_program_address(
            &[GLOBAL_AUTHORITY_SEED.as_bytes()],
            &bones_poker_contract::ID,
        );
        require_keys_eq!(global_authority.key(), expected_address);
        require_eq!(expected_bump, _global_bump, PokerError::InvalidBump);

        // Assert payer is the superadmin
        require_keys_eq!(
            global_authority.super_admin,
            ctx.accounts.admin.key(),
            PokerError::InvalidSuperOwner
        );

        global_authority.backend = backend;
        Ok(())
    }

    pub fn add_tournament(
        ctx: Context<AddTournament>,
        _global_bump: u8,
        _tournament_bump: u8,
        stack: u64,
        buy_in: u64,
        blinds: u64,
        max_seats: u8,
    ) -> Result<()> {
        let global_authority = &mut ctx.accounts.global_authority;
        let tournament_pool = &mut ctx.accounts.tournament_pool;
        // Validate PDA bump and seed
        let (expected_global_address, expected_bump) = Pubkey::find_program_address(
            &[GLOBAL_AUTHORITY_SEED.as_bytes()],
            &bones_poker_contract::ID,
        );
        require_keys_eq!(global_authority.key(), expected_global_address);
        require_eq!(expected_bump, _global_bump, PokerError::InvalidBump);

        // Assert payer is the superadmin
        require!(
            global_authority.super_admin == ctx.accounts.admin.key()
                || ctx.accounts.admin.key() == global_authority.admin,
            PokerError::InvalidAdmin
        );

        // Validate PDA bump and seed
        let (expected_tournamentpool_address, expected_tournamentpool_bump) =
            Pubkey::find_program_address(
                &[TOURNAMENT_POOL_SEED.as_bytes()],
                &bones_poker_contract::ID,
            );
        require_keys_eq!(
            tournament_pool.clone().key(),
            expected_tournamentpool_address
        );
        require_eq!(
            expected_tournamentpool_bump,
            _global_bump,
            PokerError::InvalidBump
        );

        require!(
            tournament_pool.tournament_count <= 20,
            PokerError::MaxTournamentsLimit
        );
        // if tournament_pool.tournament_count > 0 {
        //     let mut exist: u8 = 0;
        //     for i in 0..tournament_pool.tournament_count {
        //         let index = i as usize;
        //         if tournament_pool.stack[index].eq(&stack)
        //             && tournament_pool.buy_in[index].eq(&buy_in)
        //             && tournament_pool.blinds[index].eq(&blinds)
        //             && tournament_pool.max_seats[index].eq(&max_seats)
        //         {
        //             exist = 1;
        //             break;
        //         }
        //     }
        //     require!(exist == 0, PokerError::TableAlreadyExist);
        // }

        let count = tournament_pool.tournament_count as usize;
        tournament_pool.stack[count] = stack;
        tournament_pool.buy_in[count] = buy_in;
        tournament_pool.blinds[count] = blinds;
        tournament_pool.max_seats[count] = max_seats;
        tournament_pool.tournament_count += 1;
        Ok(())
    }

    pub fn add_table(
        ctx: Context<AddTable>,
        _global_bump: u8,
        _game_bump: u8,
        stack: u64,
        buy_in: u64,
        blinds: u64,
        max_seats: u8,
    ) -> Result<()> {
        let global_authority = &mut ctx.accounts.global_authority;
        let game_pool = &mut ctx.accounts.game_pool;
        // Validate PDA bump and seed
        let (expected_global_address, expected_bump) = Pubkey::find_program_address(
            &[GLOBAL_AUTHORITY_SEED.as_bytes()],
            &bones_poker_contract::ID,
        );
        require_keys_eq!(global_authority.key(), expected_global_address);
        require_eq!(expected_bump, _global_bump, PokerError::InvalidBump);

        // Assert payer is the superadmin
        require!(
            global_authority.super_admin == ctx.accounts.admin.key()
                || ctx.accounts.admin.key() == global_authority.admin,
            PokerError::InvalidAdmin
        );

        // Validate PDA bump and seed
        let (expected_gamepool_address, expected_gamepool_bump) =
            Pubkey::find_program_address(&[GAME_POOL_SEED.as_bytes()], &bones_poker_contract::ID);
        require_keys_eq!(game_pool.clone().key(), expected_gamepool_address);
        require_eq!(
            expected_gamepool_bump,
            _global_bump,
            PokerError::InvalidBump
        );

        require!(game_pool.table_count < 10, PokerError::MaxTablesLimit);
        if game_pool.table_count > 0 {
            let mut exist: u8 = 0;
            for i in 0..game_pool.table_count {
                let index = i as usize;
                if game_pool.stack[index].eq(&stack)
                    && game_pool.buy_in[index].eq(&buy_in)
                    && game_pool.blinds[index].eq(&blinds)
                    && game_pool.max_seats[index].eq(&max_seats)
                {
                    exist = 1;
                    break;
                }
            }
            require!(exist == 0, PokerError::TableAlreadyExist);
        }

        let count = game_pool.table_count as usize;
        game_pool.stack[count] = stack;
        game_pool.buy_in[count] = buy_in;
        game_pool.blinds[count] = blinds;
        game_pool.max_seats[count] = max_seats;
        game_pool.table_count += 1;
        Ok(())
    }

    pub fn remove_tournament(
        ctx: Context<RemoveTournament>,
        _global_bump: u8,
        _tournament_bump: u8,
        stack: u64,
        buy_in: u64,
        blinds: u64,
        max_seats: u8,
    ) -> Result<()> {
        let global_authority = &mut ctx.accounts.global_authority;
        let tournament_pool = &mut ctx.accounts.tournament_pool;
        // Validate PDA bump and seed
        let (expected_global_address, expected_bump) = Pubkey::find_program_address(
            &[GLOBAL_AUTHORITY_SEED.as_bytes()],
            &bones_poker_contract::ID,
        );
        require_keys_eq!(global_authority.key(), expected_global_address);
        require_eq!(expected_bump, _global_bump, PokerError::InvalidBump);

        // validator is the superadmin
        require!(
            global_authority.super_admin == ctx.accounts.admin.key()
                || global_authority.admin == ctx.accounts.admin.key()
                || global_authority.backend == ctx.accounts.admin.key(),
            PokerError::InvalidAdmin
        );

        // Validate PDA bump and seed
        let (expected_tournamentpool_address, expected_tournamentpool_bump) =
            Pubkey::find_program_address(
                &[TOURNAMENT_POOL_SEED.as_bytes()],
                &bones_poker_contract::ID,
            );
        require_keys_eq!(tournament_pool.key(), expected_tournamentpool_address);
        require_eq!(
            expected_tournamentpool_bump,
            _tournament_bump,
            PokerError::InvalidBump
        );

        require!(
            tournament_pool.tournament_count > 0,
            PokerError::MinTournamentsLimit
        );
        let mut exist_flag: u8 = 0;
        for i in 0..tournament_pool.tournament_count {
            let index = i as usize;
            if tournament_pool.buy_in[index].eq(&buy_in)
                && tournament_pool.stack[index].eq(&stack)
                && tournament_pool.blinds[index].eq(&blinds)
                && tournament_pool.max_seats[index].eq(&max_seats)
            {
                if i < tournament_pool.tournament_count - 1 {
                    let last_idx = (tournament_pool.tournament_count - 1) as usize;
                    tournament_pool.stack[index] = tournament_pool.stack[last_idx];
                    tournament_pool.buy_in[index] = tournament_pool.buy_in[last_idx];
                    tournament_pool.blinds[index] = tournament_pool.blinds[last_idx];
                    tournament_pool.max_seats[index] = tournament_pool.max_seats[last_idx];
                }
                tournament_pool.tournament_count -= 1;
                exist_flag = 1;
            }
        }

        require_eq!(exist_flag, 1, PokerError::TournamentNotFound);

        Ok(())
    }

    pub fn remove_table(
        ctx: Context<RemoveTable>,
        _global_bump: u8,
        _game_bump: u8,
        stack: u64,
        buy_in: u64,
        blinds: u64,
        max_seats: u8,
    ) -> Result<()> {
        let global_authority = &mut ctx.accounts.global_authority;
        let game_pool = &mut ctx.accounts.game_pool;
        // Validate PDA bump and seed
        let (expected_global_address, expected_bump) = Pubkey::find_program_address(
            &[GLOBAL_AUTHORITY_SEED.as_bytes()],
            &bones_poker_contract::ID,
        );
        require_keys_eq!(global_authority.key(), expected_global_address);
        require_eq!(expected_bump, _global_bump, PokerError::InvalidBump);

        // validator is the superadmin
        require!(
            global_authority.super_admin == ctx.accounts.admin.key()
                || global_authority.admin == ctx.accounts.admin.key(),
            PokerError::InvalidAdmin
        );

        // Validate PDA bump and seed
        let (expected_gamepool_address, expected_gamepool_bump) =
            Pubkey::find_program_address(&[GAME_POOL_SEED.as_bytes()], &bones_poker_contract::ID);
        require_keys_eq!(game_pool.key(), expected_gamepool_address);
        require_eq!(expected_gamepool_bump, _game_bump, PokerError::InvalidBump);

        require!(game_pool.table_count > 0, PokerError::MinTablesLimit);
        let mut exist_flag: u8 = 0;
        for i in 0..game_pool.table_count {
            let index = i as usize;
            if game_pool.buy_in[index].eq(&buy_in)
                && game_pool.stack[index].eq(&stack)
                && game_pool.blinds[index].eq(&blinds)
                && game_pool.max_seats[index].eq(&max_seats)
            {
                if i < game_pool.table_count - 1 {
                    let last_idx = (game_pool.table_count - 1) as usize;
                    game_pool.stack[index] = game_pool.stack[last_idx];
                    game_pool.buy_in[index] = game_pool.buy_in[last_idx];
                    game_pool.blinds[index] = game_pool.blinds[last_idx];
                    game_pool.max_seats[index] = game_pool.max_seats[last_idx];
                }
                game_pool.table_count -= 1;
                exist_flag = 1;
            }
        }

        require_eq!(exist_flag, 1, PokerError::TableNotFound);

        Ok(())
    }

    pub fn enter_tournament(
        ctx: Context<EnterTournament>,
        _escrow_bump: u8,
        _tournament_bump: u8,
        stack: u64,
        buy_in: u64,
        blinds: u64,
        max_seats: u8,
    ) -> Result<()> {
        let tournament_pool = &ctx.accounts.tournament_pool;
        let escrow_vault = &ctx.accounts.escrow_vault;
        // Validate PDA bump and seed
        let (expected_escrow_address, expected_escrow_bump) = Pubkey::find_program_address(
            &[ESCROW_VAULT_SEED.as_bytes()],
            &bones_poker_contract::ID,
        );
        require_keys_eq!(escrow_vault.key(), expected_escrow_address);
        require_eq!(expected_escrow_bump, _escrow_bump, PokerError::InvalidBump);

        // Validate PDA bump and seed
        let (expected_tournamentpool_address, expected_tournamentpool_bump) =
            Pubkey::find_program_address(
                &[TOURNAMENT_POOL_SEED.as_bytes()],
                &bones_poker_contract::ID,
            );
        require_keys_eq!(tournament_pool.key(), expected_tournamentpool_address);
        require_eq!(
            expected_tournamentpool_bump,
            _tournament_bump,
            PokerError::InvalidBump
        );

        let mut exist_flag: u8 = 0;
        for i in 0..tournament_pool.tournament_count {
            let index = i as usize;
            if tournament_pool.buy_in[index].eq(&buy_in)
                && tournament_pool.stack[index].eq(&stack)
                && tournament_pool.blinds[index].eq(&blinds)
                && tournament_pool.max_seats[index].eq(&max_seats)
            {
                exist_flag = 1;
            }
        }
        require_eq!(exist_flag, 1, PokerError::TournamentNotFound);

        require!(
            ctx.accounts.player.to_account_info().lamports() > buy_in,
            PokerError::InsufficientSolBalance
        );

        invoke(
            &system_instruction::transfer(
                ctx.accounts.player.key,
                ctx.accounts.escrow_vault.key,
                buy_in,
            ),
            &[
                ctx.accounts.player.to_account_info().clone(),
                ctx.accounts.escrow_vault.to_account_info().clone(),
                ctx.accounts.system_program.to_account_info().clone(),
            ],
        )?;
        Ok(())
    }

    pub fn enter_table(
        ctx: Context<EnterTable>,
        _escrow_bump: u8,
        _game_bump: u8,
        stack: u64,
        buy_in: u64,
        blinds: u64,
        max_seats: u8,
    ) -> Result<()> {
        let game_pool = &ctx.accounts.game_pool;
        let escrow_vault = &ctx.accounts.escrow_vault;
        // Validate PDA bump and seed
        let (expected_escrow_address, expected_escrow_bump) = Pubkey::find_program_address(
            &[ESCROW_VAULT_SEED.as_bytes()],
            &bones_poker_contract::ID,
        );
        require_keys_eq!(escrow_vault.key(), expected_escrow_address);
        require_eq!(expected_escrow_bump, _escrow_bump, PokerError::InvalidBump);

        // Validate PDA bump and seed
        let (expected_gamepool_address, expected_gamepool_bump) =
            Pubkey::find_program_address(&[GAME_POOL_SEED.as_bytes()], &bones_poker_contract::ID);
        require_keys_eq!(game_pool.key(), expected_gamepool_address);
        require_eq!(expected_gamepool_bump, _game_bump, PokerError::InvalidBump);

        let mut exist_flag: u8 = 0;
        for i in 0..game_pool.table_count {
            let index = i as usize;
            if game_pool.buy_in[index].eq(&buy_in)
                && game_pool.stack[index].eq(&stack)
                && game_pool.blinds[index].eq(&blinds)
                && game_pool.max_seats[index].eq(&max_seats)
            {
                exist_flag = 1;
            }
        }
        require_eq!(exist_flag, 1, PokerError::TableNotFound);

        require!(
            ctx.accounts.player.to_account_info().lamports() > buy_in,
            PokerError::InsufficientSolBalance
        );

        invoke(
            &system_instruction::transfer(
                ctx.accounts.player.key,
                ctx.accounts.escrow_vault.key,
                buy_in,
            ),
            &[
                ctx.accounts.player.to_account_info().clone(),
                ctx.accounts.escrow_vault.to_account_info().clone(),
                ctx.accounts.system_program.to_account_info().clone(),
            ],
        )?;
        Ok(())
    }

    pub fn user_leave_tournament(
        ctx: Context<UserLeaveTournament>,
        _global_bump: u8,
        _escrow_bump: u8,
        _tournament_bump: u8,
        stack: u64,
        buy_in: u64,
        blinds: u64,
        max_seats: u8,
    ) -> Result<()> {
        let global_authority = &ctx.accounts.global_authority;
        let escrow_vault = &mut ctx.accounts.escrow_vault;
        let tournament_pool = &ctx.accounts.tournament_pool;

        require_keys_eq!(
            ctx.accounts.owner.key(),
            global_authority.backend,
            PokerError::InvalidBackendAddress
        );

        require!(
            escrow_vault.to_account_info().lamports() > buy_in,
            PokerError::InsufficientSolBalance
        );

        // Validate PDA bump and seed
        let (expected_global_address, expected_global_bump) = Pubkey::find_program_address(
            &[GLOBAL_AUTHORITY_SEED.as_bytes()],
            &bones_poker_contract::ID,
        );
        require_keys_eq!(global_authority.key(), expected_global_address);
        require_eq!(expected_global_bump, _global_bump, PokerError::InvalidBump);

        // Validate PDA bump and seed
        let (expected_escrow_address, expected_escrow_bump) = Pubkey::find_program_address(
            &[ESCROW_VAULT_SEED.as_bytes()],
            &bones_poker_contract::ID,
        );
        require_keys_eq!(escrow_vault.key(), expected_escrow_address);
        require_eq!(expected_escrow_bump, _escrow_bump, PokerError::InvalidBump);

        // Validate PDA bump and seed
        let (expected_tournamentpool_address, expected_tournamentpool_bump) =
            Pubkey::find_program_address(&[GAME_POOL_SEED.as_bytes()], &bones_poker_contract::ID);
        require_keys_eq!(tournament_pool.key(), expected_tournamentpool_address);
        require_eq!(
            expected_tournamentpool_bump,
            _tournament_bump,
            PokerError::InvalidBump
        );

        let mut exist_flag: u8 = 0;
        for i in 0..tournament_pool.tournament_count {
            let index = i as usize;
            if tournament_pool.buy_in[index].eq(&buy_in)
                && tournament_pool.stack[index].eq(&stack)
                && tournament_pool.blinds[index].eq(&blinds)
                && tournament_pool.max_seats[index].eq(&max_seats)
            {
                exist_flag = 1;
            }
        }
        require_eq!(exist_flag, 1, PokerError::TournamentNotFound);

        let seeds = &[ESCROW_VAULT_SEED.as_bytes(), &[_escrow_bump]];
        let signer = &[&seeds[..]];

        invoke_signed(
            &system_instruction::transfer(escrow_vault.key, ctx.accounts.user.key, buy_in),
            &[
                ctx.accounts.user.to_account_info().clone(),
                ctx.accounts.owner.to_account_info().clone(),
                ctx.accounts.escrow_vault.to_account_info().clone(),
                ctx.accounts.system_program.to_account_info().clone(),
            ],
            signer,
        )?;

        Ok(())
    }

    pub fn user_leave_table(
        ctx: Context<UserLeaveTable>,
        _global_bump: u8,
        _escrow_bump: u8,
        _game_bump: u8,
        stack: u64,
        buy_in: u64,
        blinds: u64,
        max_seats: u8,
    ) -> Result<()> {
        let global_authority = &ctx.accounts.global_authority;
        let escrow_vault = &mut ctx.accounts.escrow_vault;
        let game_pool = &ctx.accounts.game_pool;

        require_keys_eq!(
            ctx.accounts.owner.key(),
            global_authority.backend,
            PokerError::InvalidBackendAddress
        );

        require!(
            escrow_vault.to_account_info().lamports() > buy_in,
            PokerError::InsufficientSolBalance
        );

        // Validate PDA bump and seed
        let (expected_global_address, expected_global_bump) = Pubkey::find_program_address(
            &[GLOBAL_AUTHORITY_SEED.as_bytes()],
            &bones_poker_contract::ID,
        );
        require_keys_eq!(global_authority.key(), expected_global_address);
        require_eq!(expected_global_bump, _global_bump, PokerError::InvalidBump);

        // Validate PDA bump and seed
        let (expected_escrow_address, expected_escrow_bump) = Pubkey::find_program_address(
            &[ESCROW_VAULT_SEED.as_bytes()],
            &bones_poker_contract::ID,
        );
        require_keys_eq!(escrow_vault.key(), expected_escrow_address);
        require_eq!(expected_escrow_bump, _escrow_bump, PokerError::InvalidBump);

        // Validate PDA bump and seed
        let (expected_gamepool_address, expected_gamepool_bump) =
            Pubkey::find_program_address(&[GAME_POOL_SEED.as_bytes()], &bones_poker_contract::ID);
        require_keys_eq!(game_pool.key(), expected_gamepool_address);
        require_eq!(expected_gamepool_bump, _game_bump, PokerError::InvalidBump);

        let mut exist_flag: u8 = 0;
        for i in 0..game_pool.table_count {
            let index = i as usize;
            if game_pool.buy_in[index].eq(&buy_in)
                && game_pool.stack[index].eq(&stack)
                && game_pool.blinds[index].eq(&blinds)
                && game_pool.max_seats[index].eq(&max_seats)
            {
                exist_flag = 1;
            }
        }
        require_eq!(exist_flag, 1, PokerError::TableNotFound);

        let seeds = &[ESCROW_VAULT_SEED.as_bytes(), &[_escrow_bump]];
        let signer = &[&seeds[..]];

        invoke_signed(
            &system_instruction::transfer(escrow_vault.key, ctx.accounts.user.key, buy_in),
            &[
                ctx.accounts.user.to_account_info().clone(),
                ctx.accounts.owner.to_account_info().clone(),
                ctx.accounts.escrow_vault.to_account_info().clone(),
                ctx.accounts.system_program.to_account_info().clone(),
            ],
            signer,
        )?;

        Ok(())
    }

    pub fn send_reward(
        ctx: Context<SendReward>,
        _global_bump: u8,
        _escrow_bump: u8,
        reward_amount: u64,
        leave_amount: u64,
    ) -> Result<()> {
        let global_authority = &ctx.accounts.global_authority;
        let escrow_vault = &mut ctx.accounts.escrow_vault;

        require_keys_eq!(
            ctx.accounts.owner.key(),
            global_authority.backend,
            PokerError::InvalidBackendAddress
        );

        require_keys_eq!(
            ctx.accounts.treasury.key(),
            global_authority.treasury,
            PokerError::InvalidTreasuryAddress
        );

        require!(
            escrow_vault.to_account_info().lamports() > reward_amount + leave_amount,
            PokerError::InsufficientSolBalance
        );

        // Validate PDA bump and seed
        let (expected_global_address, expected_global_bump) = Pubkey::find_program_address(
            &[GLOBAL_AUTHORITY_SEED.as_bytes()],
            &bones_poker_contract::ID,
        );
        require_keys_eq!(global_authority.key(), expected_global_address);
        require_eq!(expected_global_bump, _global_bump, PokerError::InvalidBump);

        // Validate PDA bump and seed
        let (expected_escrow_address, expected_escrow_bump) = Pubkey::find_program_address(
            &[ESCROW_VAULT_SEED.as_bytes()],
            &bones_poker_contract::ID,
        );
        require_keys_eq!(escrow_vault.key(), expected_escrow_address);
        require_eq!(expected_escrow_bump, _escrow_bump, PokerError::InvalidBump);

        let mut reward_amount2transfer = reward_amount
            .checked_mul(9)
            .unwrap()
            .checked_div(10)
            .unwrap();
        if reward_amount2transfer > 5_000 {
            reward_amount2transfer -= 5_000;
        } else {
            reward_amount2transfer = 0;
        }

        let mut leave_amount2trasnfer = leave_amount + reward_amount.checked_div(10).unwrap();
        if leave_amount2trasnfer > 5_000 {
            leave_amount2trasnfer -= 5_000;
        } else {
            leave_amount2trasnfer = 0;
        }
        let seeds = &[ESCROW_VAULT_SEED.as_bytes(), &[_escrow_bump]];
        let signer = &[&seeds[..]];

        if leave_amount2trasnfer > 0 {
            // transfer 10% sol to treasury
            invoke_signed(
                &system_instruction::transfer(
                    escrow_vault.key,
                    &global_authority.treasury,
                    leave_amount2trasnfer,
                ),
                &[
                    ctx.accounts.treasury.to_account_info().clone(),
                    ctx.accounts.owner.to_account_info().clone(),
                    escrow_vault.to_account_info().clone(),
                    ctx.accounts.system_program.to_account_info().clone(),
                ],
                signer,
            )?;
        }

        if reward_amount2transfer > 0 {
            // transfer 90% sol to winner
            invoke_signed(
                &system_instruction::transfer(
                    escrow_vault.key,
                    ctx.accounts.winner.key,
                    reward_amount2transfer,
                ),
                &[
                    ctx.accounts.winner.to_account_info().clone(),
                    ctx.accounts.owner.to_account_info().clone(),
                    escrow_vault.to_account_info().clone(),
                    ctx.accounts.system_program.to_account_info().clone(),
                ],
                signer,
            )?;
        }

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,
    #[account(
        init,
        seeds = [GLOBAL_AUTHORITY_SEED.as_ref()],
        bump,
        space = 8 + 128,
        payer = admin
    )]
    pub global_authority: Account<'info, GlobalPool>,
    #[account(
        mut,
        seeds = [ESCROW_VAULT_SEED.as_ref()],
        bump,
    )]
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub escrow_vault: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct UpdateAdmin<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,
    #[account(
        mut,
        seeds = [GLOBAL_AUTHORITY_SEED.as_ref()],
        bump,
    )]
    pub global_authority: Account<'info, GlobalPool>,
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct UpdateTreasury<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,
    #[account(
        mut,
        seeds = [GLOBAL_AUTHORITY_SEED.as_ref()],
        bump,
    )]
    pub global_authority: Account<'info, GlobalPool>,
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct UpdateBackend<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,
    #[account(
        mut,
        seeds = [GLOBAL_AUTHORITY_SEED.as_ref()],
        bump,
    )]
    pub global_authority: Account<'info, GlobalPool>,
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct AddTournament<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,
    #[account(
        mut,
        seeds = [GLOBAL_AUTHORITY_SEED.as_ref()],
        bump,
    )]
    pub global_authority: Account<'info, GlobalPool>,
    #[account(
        init_if_needed,
        seeds = [TOURNAMENT_POOL_SEED.as_ref()],
        bump,
        payer= admin,
        space=508+8,
    )]
    pub tournament_pool: Account<'info, TournamentPool>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct AddTable<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,
    #[account(
        mut,
        seeds = [GLOBAL_AUTHORITY_SEED.as_ref()],
        bump,
    )]
    pub global_authority: Account<'info, GlobalPool>,
    #[account(
        init_if_needed,
        seeds = [GAME_POOL_SEED.as_ref()],
        bump,
        payer= admin,
        space=258+8,
    )]
    pub game_pool: Account<'info, GamePool>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct RemoveTournament<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,
    #[account(
        mut,
        seeds = [GLOBAL_AUTHORITY_SEED.as_ref()],
        bump,
    )]
    pub global_authority: Account<'info, GlobalPool>,
    #[account(
        mut,
        seeds = [TOURNAMENT_POOL_SEED.as_ref()],
        bump,
    )]
    pub tournament_pool: Account<'info, TournamentPool>,
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct RemoveTable<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,
    #[account(
        mut,
        seeds = [GLOBAL_AUTHORITY_SEED.as_ref()],
        bump,
    )]
    pub global_authority: Account<'info, GlobalPool>,
    #[account(
        mut,
        seeds = [GAME_POOL_SEED.as_ref()],
        bump,
    )]
    pub game_pool: Account<'info, GamePool>,
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct EnterTournament<'info> {
    #[account(mut)]
    pub player: Signer<'info>,
    #[account(
        mut,
        seeds = [ESCROW_VAULT_SEED.as_ref()],
        bump,
    )]
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub escrow_vault: AccountInfo<'info>,
    #[account(
        mut,
        seeds = [TOURNAMENT_POOL_SEED.as_ref()],
        bump,
    )]
    pub tournament_pool: Account<'info, TournamentPool>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct EnterTable<'info> {
    #[account(mut)]
    pub player: Signer<'info>,
    #[account(
        mut,
        seeds = [ESCROW_VAULT_SEED.as_ref()],
        bump,
    )]
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub escrow_vault: AccountInfo<'info>,
    #[account(
        mut,
        seeds = [GAME_POOL_SEED.as_ref()],
        bump,
    )]
    pub game_pool: Account<'info, GamePool>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct UserLeaveTournament<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        seeds = [GLOBAL_AUTHORITY_SEED.as_ref()],
        bump,
    )]
    pub global_authority: Account<'info, GlobalPool>,
    #[account(
        mut,
        seeds = [ESCROW_VAULT_SEED.as_ref()],
        bump,
    )]
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub escrow_vault: AccountInfo<'info>,
    #[account(
        seeds = [TOURNAMENT_POOL_SEED.as_ref()],
        bump,
    )]
    pub tournament_pool: Account<'info, TournamentPool>,
    #[account(mut)]
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub user: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct UserLeaveTable<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        seeds = [GLOBAL_AUTHORITY_SEED.as_ref()],
        bump,
    )]
    pub global_authority: Account<'info, GlobalPool>,
    #[account(
        mut,
        seeds = [ESCROW_VAULT_SEED.as_ref()],
        bump,
    )]
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub escrow_vault: AccountInfo<'info>,
    #[account(
        seeds = [GAME_POOL_SEED.as_ref()],
        bump,
    )]
    pub game_pool: Account<'info, GamePool>,
    #[account(mut)]
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub user: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SendReward<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        seeds = [GLOBAL_AUTHORITY_SEED.as_ref()],
        bump,
    )]
    pub global_authority: Account<'info, GlobalPool>,
    #[account(
        mut,
        seeds = [ESCROW_VAULT_SEED.as_ref()],
        bump,
    )]
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub escrow_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub treasury: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub winner: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}
