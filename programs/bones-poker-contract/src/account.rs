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
    // 8 + 508
    pub table_count: u64,    // 8
    pub stack: [u64; 20],    // 160
    pub buy_in: [u64; 20],   // 160
    pub blinds: [u64; 20],   // 160
    pub max_seats: [u8; 20], // 20
}

#[account]
#[derive(Default)]
pub struct TournamentPool {
    // 8 + 508
    pub tournament_count: u64, // 8

    pub stack: [u64; 20],    // 160
    pub buy_in: [u64; 20],   // 160
    pub blinds: [u64; 20],   // 160
    pub max_seats: [u8; 20], // 20
}
