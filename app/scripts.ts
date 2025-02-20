import { Program, web3 } from '@project-serum/anchor';
import * as anchor from '@project-serum/anchor';

import fs from 'fs';
import path from 'path';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { IDL as BonesPokerIDL } from "./bones_poker_contract";
import {
    PublicKey,
    Connection,
    Keypair
} from '@solana/web3.js';
import { ESCROW_VAULT_SEED, GAME_POOL_SEED, GLOBAL_AUTHORITY_SEED, PROGRAM_ID } from './types';
import { createAddTableTx, createAddTournamentTx, createEnterTableTx, createEnterTableWithTokenTx, createEnterTournamentTx, createEnterTournamentWithTokenTx, createInitializeTx, createRemoveTableTx, createRemoveTournamentTx, createSendRewardTx, createSendRewardWithTokenTx, createSendTournamentRewardTx, createSendTournamentRewardWithTokenTx, createTournamentPoolTx, createUpdateAdminTx, createUpdateBackendWalletTx, createUpdateTreasuryTx, createUserLeaveTableTx, createUserLeaveTableWithTokenTx, createUserLeaveTournamentTx, createUserLeaveTournamentWithTokenTx, getTableData } from './script';


let solConnection = null;
let payer = null;
let program: Program = null;
let programId = new anchor.web3.PublicKey(PROGRAM_ID);

export const setClusterConfig = async (cluster: web3.Cluster) => {
    solConnection = new web3.Connection(web3.clusterApiUrl(cluster));
    const walletKeypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync(path.resolve(process.env.ANCHOR_WALLET), 'utf-8'))), { skipValidation: true });
    const wallet = new NodeWallet(walletKeypair);
    // anchor.setProvider(anchor.AnchorProvider.local(web3.clusterApiUrl(cluster)));
    // Configure the client to use the local cluster.
    anchor.setProvider(new anchor.AnchorProvider(solConnection, wallet, { skipPreflight: true, commitment: 'confirmed' }));
    payer = wallet;

    console.log("payer path: ", process.env.ANCHOR_WALLET);
    console.log("payer: ", payer.publicKey.toBase58());

    // Generate the program client from IDL.
    program = new anchor.Program(BonesPokerIDL as anchor.Idl, programId);
    console.log('ProgramId: ', program.programId.toBase58());

    const [globalAuthority, bump] = await PublicKey.findProgramAddress(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId
    );
    console.log('GlobalAuthority: ', globalAuthority.toBase58());
    // await main();
    const [gamePool, game_bump] = await PublicKey.findProgramAddress(
        [Buffer.from(GAME_POOL_SEED)],
        PROGRAM_ID,
    );
    const [escrowVault, escrow_bump] = await PublicKey.findProgramAddress(
        [Buffer.from(ESCROW_VAULT_SEED)],
        PROGRAM_ID,
    );
    console.log("GamePool ", gamePool.toBase58())
    console.log("Escrow Vault ", escrowVault.toBase58());

}


const main = async () => {
    await setClusterConfig('devnet');
    // await initProject();
    // Nu8tPJheGmoe1RnZXTcEs8pPa52CBUNR72DZsqTUd5V
    let onChainData = await getTableDataOnChain();
    console.log("onChainData ", onChainData);

    // Nu8tPJheGmoe1RnZXTcEs8pPa52CBUNR72DZsqTUd5V
    // await updateAdmin(new PublicKey("Nu8tPJheGmoe1RnZXTcEs8pPa52CBUNR72DZsqTUd5V"));

    // await updateTreasury(new PublicKey("4JVKGKYATWKhtvQdP8DQkEz5Aq54xUU7EaToVUGnJJaS"));
    // await updateBackendWallet(new PublicKey("3wXAk9JUYqbVcXyYtNAgQzHz7m47CzQ6kRPennxpJFtU"));

    // await addTable(1000, 100000008, 50, 2, new PublicKey("AsACVnuMa5jpmfp3BjArmb2qWg5A6HBkuXePwT37RrLY"));

    // await RemoveTable(1000, 10000000, 50, 3, new PublicKey("So11111111111111111111111111111111111111112"));

    // await enterTable(1000, 100000000, 50, 2);
    // await enterTableWithTokenOnChain(1000, 100000000, 50, 2, new PublicKey("AsACVnuMa5jpmfp3BjArmb2qWg5A6HBkuXePwT37RrLY"))

    // await userLeaveTableOnChain(1000, 100000000, 50, 2, new PublicKey("3wXAk9JUYqbVcXyYtNAgQzHz7m47CzQ6kRPennxpJFtU"))

    // await userLeaveTableWithTokenOnChain(1000, 100000000, 50, 2, new PublicKey("G42V1DfQKKHrxxfdjDrRphPStZx5Jqu2JwShfN3WoKmK"), new PublicKey("AsACVnuMa5jpmfp3BjArmb2qWg5A6HBkuXePwT37RrLY"));

    // await sendReward(new PublicKey("G42V1DfQKKHrxxfdjDrRphPStZx5Jqu2JwShfN3WoKmK"), 100000000, 0);
    // await sendRewardWithToken(new PublicKey("G42V1DfQKKHrxxfdjDrRphPStZx5Jqu2JwShfN3WoKmK"), 100000000, 0, new PublicKey("AsACVnuMa5jpmfp3BjArmb2qWg5A6HBkuXePwT37RrLY"))
    // await addTournament(1000, 10000000, 50, 2, new PublicKey("AsACVnuMa5jpmfp3BjArmb2qWg5A6HBkuXePwT37RrLY"));
    // await RemoveTournament(1000, 100000000, 50, 4, new PublicKey("So11111111111111111111111111111111111111112"), [10000]);
    // await enterTournament(1000, 10000000, 50, 2);
    // await enterTournamentWithToken(1000, 10000000, 50, 2, new PublicKey("AsACVnuMa5jpmfp3BjArmb2qWg5A6HBkuXePwT37RrLY"))
    // await userLeaveTournamentWithToken(1000, 10000000, 50, 2, new PublicKey("G42V1DfQKKHrxxfdjDrRphPStZx5Jqu2JwShfN3WoKmK"), new PublicKey("AsACVnuMa5jpmfp3BjArmb2qWg5A6HBkuXePwT37RrLY"))
    // userLeaveTournament(1000, 10000000, 50, 2, new PublicKey("G42V1DfQKKHrxxfdjDrRphPStZx5Jqu2JwShfN3WoKmK"))

    // await createTournamentPool()
    // await addTournament(1000, 1000000, 50, 4, new PublicKey("So11111111111111111111111111111111111111112"), [50, 30, 20])
    // await enterTournament(1000, 1000000, 50, 4)
    await userLeaveTournament(5000, 10000000, 10, 80, new PublicKey("G42V1DfQKKHrxxfdjDrRphPStZx5Jqu2JwShfN3WoKmK"))
    // , "DjMMsvj4ZUBpAXCaR2Z7XuqzWFMegpb86iEKBfj1HrH8", "6j29tWCuHogzNq2fHmDQ4A8C7yDRWgstKKNAD9tNTSat", "79Z6xiQfPY2XqoSp9gUb8Y6QDqmVWwH2AmBXLrtttcV9", "79Z6xiQfPY2XqoSp9gUb8Y6QDqmVWwH2AmBXLrtttcV9"
    // await sendTournamentReward(1000000, 1000, 10000000, 20, 8, [5000, 3000, 2000], ["G42V1DfQKKHrxxfdjDrRphPStZx5Jqu2JwShfN3WoKmK", "DjMMsvj4ZUBpAXCaR2Z7XuqzWFMegpb86iEKBfj1HrH8", "6j29tWCuHogzNq2fHmDQ4A8C7yDRWgstKKNAD9tNTSat"]);
    // await addTournament(1000, 1000000, 50, 4, new PublicKey("AsACVnuMa5jpmfp3BjArmb2qWg5A6HBkuXePwT37RrLY"), [50, 30, 20]);
    // await enterTournamentWithToken(1000, 1000000, 50, 4, new PublicKey("AsACVnuMa5jpmfp3BjArmb2qWg5A6HBkuXePwT37RrLY"));
    // await userLeaveTournament(1000, 1000000, 50, 4, new PublicKey("G42V1DfQKKHrxxfdjDrRphPStZx5Jqu2JwShfN3WoKmK"));
    // await userLeaveTournamentWithToken(1000, 10000, 50, 50, new PublicKey("G42V1DfQKKHrxxfdjDrRphPStZx5Jqu2JwShfN3WoKmK"), new PublicKey("AsACVnuMa5jpmfp3BjArmb2qWg5A6HBkuXePwT37RrLY"));
    // await sendTournamentRewardWithToken(1000000, 1000, 1000000, 50, 4, [50, 30, 20], ["G42V1DfQKKHrxxfdjDrRphPStZx5Jqu2JwShfN3WoKmK", "GXTDoAHLCMwSzv8Avtf1UzR8zejqsFXmQrB7DT39DNLo", "DfS7cXaq77n4aLTZuL97LTyJLtRKVb3X2KewhKskvr1h"], new PublicKey("AsACVnuMa5jpmfp3BjArmb2qWg5A6HBkuXePwT37RrLY"))


}

export const getTableDataOnChain = async () => {
    try {

        let data = await getTableData(program);
        // console.log("table data >> ", tableData)
        return data;
    } catch (e) {
        console.log(e)
        return null;
    }
}


export const initProject = async (
) => {
    const tx = await createInitializeTx(payer.publicKey, program);
    const { blockhash } = await solConnection.getRecentBlockhash('confirmed');
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = blockhash;
    payer.signTransaction(tx);
    let txId = await solConnection.sendTransaction(tx, [(payer as NodeWallet).payer]);
    await solConnection.confirmTransaction(txId, "confirmed");
    console.log("txHash =", txId);
}

export const createTournamentPool = async () => {
    const tx = await createTournamentPoolTx(payer.publicKey, program, solConnection);
    const { blockhash } = await solConnection.getRecentBlockhash('confirmed');
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = blockhash;
    payer.signTransaction(tx);
    let txId = await solConnection.sendTransaction(tx, [(payer as NodeWallet).payer]);
    await solConnection.confirmTransaction(txId, "confirmed");
    console.log("txHash =", txId);
}

export const updateAdmin = async (
    newAdmin: PublicKey
) => {
    const tx = await createUpdateAdminTx(payer.publicKey, program, newAdmin);
    const { blockhash } = await solConnection.getRecentBlockhash('confirmed');
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = blockhash;
    payer.signTransaction(tx);
    let txId = await solConnection.sendTransaction(tx, [(payer as NodeWallet).payer]);
    await solConnection.confirmTransaction(txId, "confirmed");
    console.log("txHash =", txId);
}

export const updateTreasury = async (
    treasury: PublicKey
) => {
    const tx = await createUpdateTreasuryTx(payer.publicKey, program, treasury);
    const { blockhash } = await solConnection.getRecentBlockhash('confirmed');
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = blockhash;
    payer.signTransaction(tx);
    let txId = await solConnection.sendTransaction(tx, [(payer as NodeWallet).payer]);
    await solConnection.confirmTransaction(txId, "confirmed");
    console.log("txHash =", txId);
}

export const updateBackendWallet = async (
    newBackend: PublicKey
) => {
    const tx = await createUpdateBackendWalletTx(payer.publicKey, program, newBackend);
    const { blockhash } = await solConnection.getRecentBlockhash('confirmed');
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = blockhash;
    payer.signTransaction(tx);
    let txId = await solConnection.sendTransaction(tx, [(payer as NodeWallet).payer]);
    await solConnection.confirmTransaction(txId, "confirmed");
    console.log("txHash =", txId);
}

export const addTable = async (
    stack: number,
    buy_in: number,
    blinds: number,
    max_seats: number,
    tokenMint: PublicKey,
) => {
    const tx = await createAddTableTx(payer.publicKey, program, stack, buy_in, blinds, max_seats, tokenMint);
    const { blockhash } = await solConnection.getRecentBlockhash('confirmed');
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = blockhash;
    payer.signTransaction(tx);
    let txId = await solConnection.sendTransaction(tx, [(payer as NodeWallet).payer]);
    await solConnection.confirmTransaction(txId, "confirmed");
    console.log("txHash =", txId);
}


export const addTournament = async (
    stack: number,
    buy_in: number,
    blinds: number,
    max_seats: number,
    tokenMint: PublicKey,
    rewardPlan: number[]
) => {
    console.log(payer.publicKey.toBase58(), ">>>")
    const tx = await createAddTournamentTx(payer.publicKey, program, stack, buy_in, blinds, max_seats, tokenMint, rewardPlan);
    const { blockhash } = await solConnection.getRecentBlockhash('confirmed');
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = blockhash;
    payer.signTransaction(tx);
    let txId = await solConnection.sendTransaction(tx, [(payer as NodeWallet).payer]);
    await solConnection.confirmTransaction(txId, "confirmed");
    console.log("txHash =", txId);
}
export const RemoveTournament = async (
    stack: number,
    buy_in: number,
    blinds: number,
    max_seats: number,
    tokenMint: PublicKey,
    rewardPlan: number[]
) => {
    const tx = await createRemoveTournamentTx(payer.publicKey, program, stack, buy_in, blinds, max_seats, tokenMint, rewardPlan);
    const { blockhash } = await solConnection.getRecentBlockhash('confirmed');
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = blockhash;
    payer.signTransaction(tx);
    let txId = await solConnection.sendTransaction(tx, [(payer as NodeWallet).payer]);
    await solConnection.confirmTransaction(txId, "confirmed");
    console.log("txHash =", txId);
}

export const RemoveTable = async (
    stack: number,
    buy_in: number,
    blinds: number,
    max_seats: number,
    tokenMint: PublicKey
) => {
    const tx = await createRemoveTableTx(payer.publicKey, program, stack, buy_in, blinds, max_seats, tokenMint);
    const { blockhash } = await solConnection.getRecentBlockhash('confirmed');
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = blockhash;
    payer.signTransaction(tx);
    let txId = await solConnection.sendTransaction(tx, [(payer as NodeWallet).payer]);
    await solConnection.confirmTransaction(txId, "confirmed");
    console.log("txHash =", txId);
}

export const enterTournamentWithToken = async (
    stack: number,
    buy_in: number,
    blinds: number,
    max_seats: number,
    tokenMint: PublicKey
) => {
    const tx = await createEnterTournamentWithTokenTx(payer.publicKey, program, stack, buy_in, blinds, max_seats, tokenMint, solConnection);
    const { blockhash } = await solConnection.getRecentBlockhash('confirmed');
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = blockhash;
    payer.signTransaction(tx);
    let txId = await solConnection.sendTransaction(tx, [(payer as NodeWallet).payer]);
    await solConnection.confirmTransaction(txId, "confirmed");
    console.log("txHash =", txId);
}

export const enterTournament = async (
    stack: number,
    buy_in: number,
    blinds: number,
    max_seats: number
) => {
    const tx = await createEnterTournamentTx(payer.publicKey, program, stack, buy_in, blinds, max_seats);
    const { blockhash } = await solConnection.getRecentBlockhash('confirmed');
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = blockhash;
    payer.signTransaction(tx);
    let txId = await solConnection.sendTransaction(tx, [(payer as NodeWallet).payer]);
    await solConnection.confirmTransaction(txId, "confirmed");
    console.log("txHash =", txId);
}

export const enterTable = async (
    stack: number,
    buy_in: number,
    blinds: number,
    max_seats: number
) => {
    const tx = await createEnterTableTx(payer.publicKey, program, stack, buy_in, blinds, max_seats);
    const { blockhash } = await solConnection.getRecentBlockhash('confirmed');
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = blockhash;
    payer.signTransaction(tx);
    let txId = await solConnection.sendTransaction(tx, [(payer as NodeWallet).payer]);
    await solConnection.confirmTransaction(txId, "confirmed");
    console.log("txHash =", txId);
}

export const userLeaveTournament = async (
    stack: number,
    buy_in: number,
    blinds: number,
    max_seats: number,
    user: PublicKey
) => {
    const tx = await createUserLeaveTournamentTx(payer.publicKey, program, stack, buy_in, blinds, max_seats, user);
    const { blockhash } = await solConnection.getRecentBlockhash('confirmed');
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = blockhash;
    payer.signTransaction(tx);
    let txId = await solConnection.sendTransaction(tx, [(payer as NodeWallet).payer]);
    await solConnection.confirmTransaction(txId, "confirmed");
    console.log("txHash =", txId);
}


export const userLeaveTournamentWithToken = async (
    stack: number,
    buy_in: number,
    blinds: number,
    max_seats: number,
    user: PublicKey,
    tokenMint: PublicKey
) => {
    const tx = await createUserLeaveTournamentWithTokenTx(payer.publicKey, program, stack, buy_in, blinds, max_seats, user, tokenMint, solConnection);
    const { blockhash } = await solConnection.getRecentBlockhash('confirmed');
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = blockhash;
    payer.signTransaction(tx);
    let txId = await solConnection.sendTransaction(tx, [(payer as NodeWallet).payer]);
    await solConnection.confirmTransaction(txId, "confirmed");
    console.log("txHash =", txId);
}

export const userLeaveTableOnChain = async (
    stack: number,
    buy_in: number,
    blinds: number,
    max_seats: number,
    user: PublicKey
) => {
    try {
        const tx = await createUserLeaveTableTx(payer.publicKey, program, stack, buy_in, blinds, max_seats, user);
        const { blockhash } = await solConnection.getLatestBlockhash('confirmed');
        tx.feePayer = payer.publicKey;
        tx.recentBlockhash = blockhash;
        payer.signTransaction(tx);
        let txId = await solConnection.sendTransaction(tx, [(payer as NodeWallet).payer]);
        await solConnection.confirmTransaction(txId, "confirmed");
        console.log("userleave txHash =", txId);
    } catch (e) {
        console.log(e)
    }
}

export const userLeaveTableWithTokenOnChain = async (
    stack: number,
    buy_in: number,
    blinds: number,
    max_seats: number,
    user: PublicKey,
    tokenMint: PublicKey
) => {
    try {
        const tx = await createUserLeaveTableWithTokenTx(payer.publicKey, program, stack, buy_in, blinds, max_seats, user, tokenMint, solConnection);
        const { blockhash } = await solConnection.getLatestBlockhash('confirmed');
        tx.feePayer = payer.publicKey;
        tx.recentBlockhash = blockhash;
        payer.signTransaction(tx);
        let txId = await solConnection.sendTransaction(tx, [(payer as NodeWallet).payer]);
        await solConnection.confirmTransaction(txId, "confirmed");
        console.log("userleave txHash =", txId);
    } catch (e) {
        console.log(e)
    }
}

export const sendReward = async (
    winner: PublicKey,
    totalWinnedVault: number,
    leaveVault: number
) => {
    try {
        console.log("payer >> ", payer.publicKey.toBase58())

        const tx = await createSendRewardTx(payer.publicKey, program, winner, totalWinnedVault, leaveVault);
        const { blockhash } = await solConnection.getLatestBlockhash('confirmed');
        tx.feePayer = payer.publicKey;
        tx.recentBlockhash = blockhash;
        payer.signTransaction(tx);
        let txId = await solConnection.sendTransaction(tx, [(payer as NodeWallet).payer]);
        await solConnection.confirmTransaction(txId, "confirmed");
        console.log("sendReward txHash =", txId);
    } catch (e) {
        console.log(e)
    }
}

export const sendRewardWithToken = async (
    winner: PublicKey,
    totalWinnedVault: number,
    leaveVault: number,
    tokenMint: PublicKey
) => {
    try {
        console.log("payer >> ", payer.publicKey.toBase58())

        const tx = await createSendRewardWithTokenTx(payer.publicKey, program, winner, totalWinnedVault, leaveVault, tokenMint, solConnection);
        const { blockhash } = await solConnection.getLatestBlockhash('confirmed');
        tx.feePayer = payer.publicKey;
        tx.recentBlockhash = blockhash;
        payer.signTransaction(tx);
        let txId = await solConnection.sendTransaction(tx, [(payer as NodeWallet).payer]);
        await solConnection.confirmTransaction(txId, "confirmed");
        console.log("sendReward txHash =", txId);
    } catch (e) {
        console.log(e)
    }
}

export const enterTableWithTokenOnChain = async (
    stack: number,
    buy_in: number,
    blinds: number,
    max_seats: number,
    tokenMint: PublicKey
) => {
    const tx = await createEnterTableWithTokenTx(payer.publicKey, program, stack, buy_in, blinds, max_seats, tokenMint, solConnection);
    const { blockhash } = await solConnection.getRecentBlockhash('confirmed');
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = blockhash;
    payer.signTransaction(tx);
    let txId = await solConnection.sendTransaction(tx, [(payer as NodeWallet).payer]);
    await solConnection.confirmTransaction(txId, "confirmed");
    console.log("txHash =", txId);
}

export const sendTournamentReward = async (
    rewardAmount: number,
    stack: number,
    buy_in: number,
    blinds: number,
    max_seats: number,
    rewardPlan: number[],
    winners: string[]
) => {
    const tx = await createSendTournamentRewardTx(payer.publicKey, program, rewardAmount, stack, buy_in, blinds, max_seats, rewardPlan, winners);
    const { blockhash } = await solConnection.getRecentBlockhash('confirmed');
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = blockhash;
    payer.signTransaction(tx);
    let txId = await solConnection.sendTransaction(tx, [(payer as NodeWallet).payer]);
    await solConnection.confirmTransaction(txId, "confirmed");
    console.log("txHash =", txId);
}

export const sendTournamentRewardWithToken = async (
    rewardAmount: number,
    stack: number,
    buy_in: number,
    blinds: number,
    max_seats: number,
    rewardPlan: number[],
    winners: string[],
    tokenMint: PublicKey
) => {
    const tx = await createSendTournamentRewardWithTokenTx(payer.publicKey, program, tokenMint, rewardAmount, stack, buy_in, blinds, max_seats, rewardPlan, winners, solConnection);
    const { blockhash } = await solConnection.getRecentBlockhash('confirmed');
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = blockhash;
    payer.signTransaction(tx);
    let txId = await solConnection.sendTransaction(tx, [(payer as NodeWallet).payer]);
    await solConnection.confirmTransaction(txId, "confirmed");
    console.log("txHash =", txId);
}
main();