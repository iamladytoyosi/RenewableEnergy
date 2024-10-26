describe('Usage and Distribution Ledger Contract', () => {
  let chain: Chain;
  let accounts: { [key: string]: Account };
  
  beforeAll(() => {
    chain = new Chain();
    accounts = chain.accounts;
  });
  
  it('should record energy usage for an account', () => {
    const account = accounts['investor1'];
    const block = chain.mineBlock([
      Tx.contractCall(
          'usage-ledger',
          'record-usage',
          [account.address, 50], // 50 units of energy usage
          account.address
      ),
    ]);
    const receipt = block.receipts[0];
    expect(receipt.result).toBeOk();
    expect(receipt.result).toEqual('(ok 50)');
  });
  
  it('should distribute energy units based on usage', () => {
    const block = chain.mineBlock([
      Tx.contractCall(
          'usage-ledger',
          'distribute-energy-units',
          [],
          accounts['owner'].address
      ),
    ]);
    const receipt = block.receipts[0];
    expect(receipt.result).toBeOk();
    expect(receipt.result).toEqual('(ok "Units distributed")');
  });
});
