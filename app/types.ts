import * as anchor from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';

export const PROGRAM_ID = new PublicKey("7q9ZzDW4o8K4QPoNirc8tfmt72HwAxB4zvf1QnjcsM7E");
// sc address 1 : 5kdbnm4Kdc83dCSCVSASyoAJNemUt3bdFrPE3cpyvwZV
// sc address 2 : A6gEoFvGyNPyYjYs7kQLibAsn3H8wD5f4rVDvBjTVace

// export const TREASURY_WALLET = new PublicKey("vbFsWcMNyhp7GeqmBpmTcr5aJ4C8piopvyVSFyHVxVU");
export const TREASURY_WALLET = new PublicKey("vbFsWcMNyhp7GeqmBpmTcr5aJ4C8piopvyVSFyHVxVU");
export const BE_ADDRESS = new PublicKey("3wXAk9JUYqbVcXyYtNAgQzHz7m47CzQ6kRPennxpJFtU");
export const ADMIN = new PublicKey("Nu8tPJheGmoe1RnZXTcEs8pPa52CBUNR72DZsqTUd5V");
export const GLOBAL_AUTHORITY_SEED = "global-authority-v1";
export const GAME_POOL_SEED = "game-pool-v4";

export const TOURNAMENT_POOL_SEED = "tournament-pool-v2";
export const TOURNAMENT_POOL_SIZE = 2920;

export const ESCROW_VAULT_SEED = "escrow-vault-v1";
export const DEPLOY_WALLET_ADDRESS = "4JVKGKYATWKhtvQdP8DQkEz5Aq54xUU7EaToVUGnJJaS";

export interface GlobalPool {
    // 8 + 128
    super_admin: PublicKey, // 32
    admin: PublicKey,       // 32
    backend: PublicKey,     // 32
    treasury: PublicKey,    // 32
}

export interface GamePool {
    table_count: anchor.BN,   // 8
    stack: anchor.BN[],       // 8*10
    buy_in: anchor.BN[],      // 8*10
    blinds: anchor.BN[],      // 8*10
    max_seats: number[],      // 1*10
    payToken: PublicKey[]
}


export interface GamePoolOnChain {
    tableCount: anchor.BN,   // 8
    stack: anchor.BN[],       // 8*10
    buyIn: anchor.BN[],      // 8*10
    blinds: anchor.BN[],      // 8*10
    maxSeats: number[],      // 1*10
    payToken: PublicKey[]
}

export interface TournamentPoolOnChain {
    tournamentCount: anchor.BN,       // 8
    stack: anchor.BN[],            // 160
    buyIn: anchor.BN[],           // 160
    blinds: anchor.BN[],           // 160
    revenue: DistributionOnChain[], // 88*20
    maxSeats: number[],         // 20
    payToken: PublicKey[],     //32*20

}

export interface DistributionOnChain {
    reward: anchor.BN[],
    rewardCount: anchor.BN,
}

export interface Distribution {
    reward: number[],
    rewardCount: number,
}