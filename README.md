# Decentralized Investment and Energy Distribution Platform

A Clarity smart contract system for managing investments, proposal voting, profit distribution, and energy usage tracking on the Stacks blockchain.

## Features

### Investment Management
- Minimum investment threshold of 100 units
- Track total investments and individual investor contributions
- Secure investor registration system

### Proposal System
- Create and vote on proposals
- Automatic proposal ID generation
- Track voting results per proposal

### Profit Distribution
- Proportional profit distribution based on investment amounts
- Automated profit pool management
- Fair share calculation system

### Energy Usage Tracking
- Record and monitor energy consumption per account
- Calculate proportional energy unit distribution
- Track usage metrics across all participants

## Contract Functions

### Investment Functions

#### `invest(amount)`
Allows users to invest in the platform.
- Parameters:
    - `amount`: Amount to invest (must be >= 100)
- Returns:
    - Success: The invested amount
    - Error: Code 100 if amount is below minimum

#### `propose(description)`
Creates a new proposal for voting.
- Parameters:
    - `description`: ASCII string (max 256 chars) describing the proposal
- Returns:
    - Success: The proposal ID
    - Error: None

#### `vote(proposal-id)`
Casts a vote for a specific proposal.
- Parameters:
    - `proposal-id`: ID of the proposal to vote on
- Returns:
    - Success: The proposal ID
    - Error: Code 101 if proposal doesn't exist

### Profit Management

#### `deposit-profit(amount)`
Deposits profit into the distribution pool.
- Parameters:
    - `amount`: Profit amount to deposit
- Returns:
    - Success: The deposited amount

#### `distribute-profit()`
Distributes accumulated profit to investors proportionally.
- Returns:
    - Success: "Profit distributed" message
    - Error: Code 102 if no investments exist

### Energy Management

#### `record-usage(account, units)`
Records energy usage for an account.
- Parameters:
    - `account`: Principal of the user
    - `units`: Number of energy units used
- Returns:
    - Success: The recorded units

#### `get-usage(account)`
Retrieves energy usage for an account.
- Parameters:
    - `account`: Principal of the user
- Returns:
    - The usage data if exists, none otherwise

#### `distribute-energy-units()`
Distributes rewards based on energy usage proportions.
- Returns:
    - Success: "Units distributed" message
    - Error: Code 103 if no usage data exists

## Error Codes

- `100`: Investment amount below minimum threshold
- `101`: Proposal not found
- `102`: No investments available for distribution
- `103`: No energy usage data available

## Data Storage

### Maps
- `investors`: Tracks investor accounts and their invested amounts
- `proposals`: Stores proposal details and vote counts
- `energy-usage`: Records energy consumption per account

### Variables
- `total-invested`: Total amount invested in the platform
- `next-proposal-id`: Counter for proposal IDs
- `profit-pool`: Accumulated profit for distribution

## Usage Example

```clarity
;; Invest in the platform
(contract-call? .contract invest u1000)

;; Create a new proposal
(contract-call? .contract propose "Increase minimum investment")

;; Vote on a proposal
(contract-call? .contract vote u0)

;; Record energy usage
(contract-call? .contract record-usage tx-sender u50)

;; Distribute profits
(contract-call? .contract distribute-profit)
```

## Security Considerations

1. The contract ensures minimum investment thresholds
2. Profit distribution is proportional to investment amounts
3. Energy unit distribution is based on verified usage data
4. All mathematical operations consider potential overflow scenarios

## Contributing

Feel free to submit issues and enhancement requests. For substantial changes:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
