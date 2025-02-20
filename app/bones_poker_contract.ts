export type BonesPokerContract = {
  "version": "0.1.0",
  "name": "bones_poker_contract",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "escrowBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createTournamentPool",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tournamentPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updateAdmin",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "newAdmin",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateTreasury",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "treasury",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateBackend",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "backend",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "addTournament",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tournamentPool",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        },
        {
          "name": "token",
          "type": "publicKey"
        },
        {
          "name": "revenue",
          "type": {
            "vec": "u64"
          }
        }
      ]
    },
    {
      "name": "addTable",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gamePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "gameBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        },
        {
          "name": "token",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "removeTournament",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tournamentPool",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        },
        {
          "name": "token",
          "type": "publicKey"
        },
        {
          "name": "revenue",
          "type": {
            "vec": "u64"
          }
        }
      ]
    },
    {
      "name": "removeTable",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gamePool",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "gameBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        },
        {
          "name": "token",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "enterTournament",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tournamentPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        }
      ]
    },
    {
      "name": "enterTournamentWithToken",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tournamentPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "playerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        }
      ]
    },
    {
      "name": "enterTable",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gamePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "gameBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        }
      ]
    },
    {
      "name": "enterTableWithToken",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gamePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "playerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "gameBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        }
      ]
    },
    {
      "name": "userLeaveTournamentWithToken",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tournamentPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        }
      ]
    },
    {
      "name": "userLeaveTournament",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tournamentPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        }
      ]
    },
    {
      "name": "userLeaveTable",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gamePool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "gameBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        }
      ]
    },
    {
      "name": "userLeaveTableWithToken",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gamePool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "gameBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        }
      ]
    },
    {
      "name": "sendReward",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "rewardAmount",
          "type": "u64"
        },
        {
          "name": "leaveAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "sendRewardWithToken",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "winnerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "rewardAmount",
          "type": "u64"
        },
        {
          "name": "leaveAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "sendTournamentReward",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tournamentPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "rewardAmount",
          "type": "u64"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        },
        {
          "name": "revenue",
          "type": {
            "vec": "u64"
          }
        }
      ]
    },
    {
      "name": "sendTournamentRewardWithToken",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tournamentPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "rewardAmount",
          "type": "u64"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        },
        {
          "name": "revenue",
          "type": {
            "vec": "u64"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "globalPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "superAdmin",
            "type": "publicKey"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "backend",
            "type": "publicKey"
          },
          {
            "name": "treasury",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "gamePool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tableCount",
            "type": "u64"
          },
          {
            "name": "stack",
            "type": {
              "array": [
                "u64",
                18
              ]
            }
          },
          {
            "name": "buyIn",
            "type": {
              "array": [
                "u64",
                18
              ]
            }
          },
          {
            "name": "blinds",
            "type": {
              "array": [
                "u64",
                18
              ]
            }
          },
          {
            "name": "maxSeats",
            "type": {
              "array": [
                "u8",
                18
              ]
            }
          },
          {
            "name": "payToken",
            "type": {
              "array": [
                "publicKey",
                18
              ]
            }
          }
        ]
      }
    },
    {
      "name": "tournamentPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tournamentCount",
            "type": "u64"
          },
          {
            "name": "stack",
            "type": {
              "array": [
                "u64",
                20
              ]
            }
          },
          {
            "name": "buyIn",
            "type": {
              "array": [
                "u64",
                20
              ]
            }
          },
          {
            "name": "blinds",
            "type": {
              "array": [
                "u64",
                20
              ]
            }
          },
          {
            "name": "revenue",
            "type": {
              "array": [
                {
                  "defined": "Distribution"
                },
                20
              ]
            }
          },
          {
            "name": "maxSeats",
            "type": {
              "array": [
                "u8",
                20
              ]
            }
          },
          {
            "name": "payToken",
            "type": {
              "array": [
                "publicKey",
                20
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Distribution",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "reward",
            "type": {
              "array": [
                "u64",
                10
              ]
            }
          },
          {
            "name": "rewardCount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidSuperOwner",
      "msg": "Invalid Super Owner"
    },
    {
      "code": 6001,
      "name": "InvalidAdmin",
      "msg": "Invalid Admin"
    },
    {
      "code": 6002,
      "name": "InvalidBackendAddress",
      "msg": "Invalid Backend Permission"
    },
    {
      "code": 6003,
      "name": "InvalidBump",
      "msg": "Invalid Bump"
    },
    {
      "code": 6004,
      "name": "MaxTablesLimit",
      "msg": "Max Limit Tables Are Already Created(20)"
    },
    {
      "code": 6005,
      "name": "MaxTournamentsLimit",
      "msg": "Max Limit Tounaments Are Already Created(20)"
    },
    {
      "code": 6006,
      "name": "MinTablesLimit",
      "msg": "There Is No Tables Created"
    },
    {
      "code": 6007,
      "name": "MinTournamentsLimit",
      "msg": "There Is No Tournaments Created"
    },
    {
      "code": 6008,
      "name": "TableNotFound",
      "msg": "Table Does Not Exist"
    },
    {
      "code": 6009,
      "name": "TournamentNotFound",
      "msg": "Tournament Does Not Exist"
    },
    {
      "code": 6010,
      "name": "InsufficientSolBalance",
      "msg": "Insufficient Sol Balance"
    },
    {
      "code": 6011,
      "name": "InvalidTreasuryAddress",
      "msg": "Invalid Treasury Address"
    },
    {
      "code": 6012,
      "name": "TableAlreadyExist",
      "msg": "Table Is Already Existing"
    }
  ]
};

export const IDL: BonesPokerContract = {
  "version": "0.1.0",
  "name": "bones_poker_contract",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "escrowBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createTournamentPool",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tournamentPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updateAdmin",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "newAdmin",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateTreasury",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "treasury",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateBackend",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "backend",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "addTournament",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tournamentPool",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        },
        {
          "name": "token",
          "type": "publicKey"
        },
        {
          "name": "revenue",
          "type": {
            "vec": "u64"
          }
        }
      ]
    },
    {
      "name": "addTable",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gamePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "gameBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        },
        {
          "name": "token",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "removeTournament",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tournamentPool",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        },
        {
          "name": "token",
          "type": "publicKey"
        },
        {
          "name": "revenue",
          "type": {
            "vec": "u64"
          }
        }
      ]
    },
    {
      "name": "removeTable",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gamePool",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "gameBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        },
        {
          "name": "token",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "enterTournament",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tournamentPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        }
      ]
    },
    {
      "name": "enterTournamentWithToken",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tournamentPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "playerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        }
      ]
    },
    {
      "name": "enterTable",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gamePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "gameBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        }
      ]
    },
    {
      "name": "enterTableWithToken",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gamePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "playerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "gameBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        }
      ]
    },
    {
      "name": "userLeaveTournamentWithToken",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tournamentPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        }
      ]
    },
    {
      "name": "userLeaveTournament",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tournamentPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        }
      ]
    },
    {
      "name": "userLeaveTable",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gamePool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "gameBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        }
      ]
    },
    {
      "name": "userLeaveTableWithToken",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gamePool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "gameBump",
          "type": "u8"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        }
      ]
    },
    {
      "name": "sendReward",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "rewardAmount",
          "type": "u64"
        },
        {
          "name": "leaveAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "sendRewardWithToken",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "winnerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "rewardAmount",
          "type": "u64"
        },
        {
          "name": "leaveAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "sendTournamentReward",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tournamentPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "rewardAmount",
          "type": "u64"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        },
        {
          "name": "revenue",
          "type": {
            "vec": "u64"
          }
        }
      ]
    },
    {
      "name": "sendTournamentRewardWithToken",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tournamentPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "escrowBump",
          "type": "u8"
        },
        {
          "name": "rewardAmount",
          "type": "u64"
        },
        {
          "name": "stack",
          "type": "u64"
        },
        {
          "name": "buyIn",
          "type": "u64"
        },
        {
          "name": "blinds",
          "type": "u64"
        },
        {
          "name": "maxSeats",
          "type": "u8"
        },
        {
          "name": "revenue",
          "type": {
            "vec": "u64"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "globalPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "superAdmin",
            "type": "publicKey"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "backend",
            "type": "publicKey"
          },
          {
            "name": "treasury",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "gamePool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tableCount",
            "type": "u64"
          },
          {
            "name": "stack",
            "type": {
              "array": [
                "u64",
                18
              ]
            }
          },
          {
            "name": "buyIn",
            "type": {
              "array": [
                "u64",
                18
              ]
            }
          },
          {
            "name": "blinds",
            "type": {
              "array": [
                "u64",
                18
              ]
            }
          },
          {
            "name": "maxSeats",
            "type": {
              "array": [
                "u8",
                18
              ]
            }
          },
          {
            "name": "payToken",
            "type": {
              "array": [
                "publicKey",
                18
              ]
            }
          }
        ]
      }
    },
    {
      "name": "tournamentPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tournamentCount",
            "type": "u64"
          },
          {
            "name": "stack",
            "type": {
              "array": [
                "u64",
                20
              ]
            }
          },
          {
            "name": "buyIn",
            "type": {
              "array": [
                "u64",
                20
              ]
            }
          },
          {
            "name": "blinds",
            "type": {
              "array": [
                "u64",
                20
              ]
            }
          },
          {
            "name": "revenue",
            "type": {
              "array": [
                {
                  "defined": "Distribution"
                },
                20
              ]
            }
          },
          {
            "name": "maxSeats",
            "type": {
              "array": [
                "u8",
                20
              ]
            }
          },
          {
            "name": "payToken",
            "type": {
              "array": [
                "publicKey",
                20
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Distribution",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "reward",
            "type": {
              "array": [
                "u64",
                10
              ]
            }
          },
          {
            "name": "rewardCount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidSuperOwner",
      "msg": "Invalid Super Owner"
    },
    {
      "code": 6001,
      "name": "InvalidAdmin",
      "msg": "Invalid Admin"
    },
    {
      "code": 6002,
      "name": "InvalidBackendAddress",
      "msg": "Invalid Backend Permission"
    },
    {
      "code": 6003,
      "name": "InvalidBump",
      "msg": "Invalid Bump"
    },
    {
      "code": 6004,
      "name": "MaxTablesLimit",
      "msg": "Max Limit Tables Are Already Created(20)"
    },
    {
      "code": 6005,
      "name": "MaxTournamentsLimit",
      "msg": "Max Limit Tounaments Are Already Created(20)"
    },
    {
      "code": 6006,
      "name": "MinTablesLimit",
      "msg": "There Is No Tables Created"
    },
    {
      "code": 6007,
      "name": "MinTournamentsLimit",
      "msg": "There Is No Tournaments Created"
    },
    {
      "code": 6008,
      "name": "TableNotFound",
      "msg": "Table Does Not Exist"
    },
    {
      "code": 6009,
      "name": "TournamentNotFound",
      "msg": "Tournament Does Not Exist"
    },
    {
      "code": 6010,
      "name": "InsufficientSolBalance",
      "msg": "Insufficient Sol Balance"
    },
    {
      "code": 6011,
      "name": "InvalidTreasuryAddress",
      "msg": "Invalid Treasury Address"
    },
    {
      "code": 6012,
      "name": "TableAlreadyExist",
      "msg": "Table Is Already Existing"
    }
  ]
};
