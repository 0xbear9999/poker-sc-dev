import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { BonesPokerContract } from "../target/types/bones_poker_contract";

describe("bones-poker-contract", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.BonesPokerContract as Program<BonesPokerContract>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
