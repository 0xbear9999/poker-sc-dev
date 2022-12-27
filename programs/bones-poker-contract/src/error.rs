use anchor_lang::prelude::*;

#[error_code]
pub enum PokerError {
    // 0x1770 - 0
    #[msg("Invalid Super Owner")]
    InvalidSuperOwner,
    // 0x1771
    #[msg("Invalid Admin")]
    InvalidAdmin,
    // 0x1772
    #[msg("Invalid Backend Permission")]
    InvalidBackendAddress,
    // 0x1773
    #[msg("Invalid Bump")]
    InvalidBump,
    // 0x1774
    #[msg("Max Limit Tables Are Already Created(20)")]
    MaxTablesLimit,
    // 0x1775
    #[msg("Max Limit Tounaments Are Already Created(20)")]
    MaxTournamentsLimit,
    // 0x1776
    #[msg("There Is No Tables Created")]
    MinTablesLimit,
    // 0x1777
    #[msg("There Is No Tournaments Created")]
    MinTournamentsLimit,
    // 0x1778
    #[msg("Table Does Not Exist")]
    TableNotFound,
    // 0x1779
    #[msg("Tournament Does Not Exist")]
    TournamentNotFound,
    // 0x1780
    #[msg("Insufficient Sol Balance")]
    InsufficientSolBalance,
    // 0x1781
    #[msg("Invalid Treasury Address")]
    InvalidTreasuryAddress,
    // 0x1782
    #[msg("Table Is Already Existing")]
    TableAlreadyExist,
}
