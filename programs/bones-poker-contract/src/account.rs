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
    // 8 + 258
    pub table_count: u64,    // 8
    pub stack: [u64; 10],    // 80
    pub buy_in: [u64; 10],   // 80
    pub blinds: [u64; 10],   // 80
    pub max_seats: [u8; 10], // 10
}
