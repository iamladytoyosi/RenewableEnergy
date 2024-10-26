import { describe, it, expect } from 'vitest';
import { Clarinet, Tx, Chain, Account } from 'clarinet-sdk';

describe('Investment Contract', () => {
  let chain: Chain;
  let accounts: { [key: string]: Account };
  
  beforeAll(() => {
    chain = new Chain();
    accounts = chain.accounts;
  });
  
  it('should allow an investment above the minimum amount', () => {
    const investor1 = accounts['investor1'];
    const block = chain.mineBlock([
      Tx.contractCall(
          'investment',
          'invest',
          [100],
          investor1.address
      ),
    ]);
    const receipt = block.receipts[0];
    expect(receipt.result).toBeOk();
    expect(receipt.result).toEqual('(ok 100)');
  });
  
  it('should fail if investment is below the minimum amount', () => {
    const investor1 = accounts['investor1'];
    const block = chain.mineBlock([
      Tx.contractCall(
          'investment',
          'invest',
          [50],
          investor1.address
      ),
    ]);
    const receipt = block.receipts[0];
    expect(receipt.result).toBeErr();
  });
  
  it('should create a new proposal', () => {
    const proposer = accounts['investor1'];
    const block = chain.mineBlock([
      Tx.contractCall(
          'investment',
          'propose',
          ['"Build a new solar farm"'],
          proposer.address
      ),
    ]);
    const receipt = block.receipts[0];
    expect(receipt.result).toBeOk();
    expect(receipt.result).toEqual('(ok u0)'); // Proposal ID should start at 0
  });
  
  it('should allow voting on a proposal', () => {
    const voter = accounts['investor2'];
    const block = chain.mineBlock([
      Tx.contractCall(
          'investment',
          'vote',
          [0], // Voting on proposal ID 0
          voter.address
      ),
    ]);
    const receipt = block.receipts[0];
    expect(receipt.result).toBeOk();
  });
});
