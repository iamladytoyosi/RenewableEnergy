describe('Profit-Sharing Contract', () => {
  let chain: Chain;
  let accounts: { [key: string]: Account };
  
  beforeAll(() => {
    chain = new Chain();
    accounts = chain.accounts;
  });
  
  it('should deposit profit into the profit pool', () => {
    const block = chain.mineBlock([
      Tx.contractCall(
          'profit-sharing',
          'deposit-profit',
          [1000], // depositing 1000 STX
          accounts['owner'].address
      ),
    ]);
    const receipt = block.receipts[0];
    expect(receipt.result).toBeOk();
    expect(receipt.result).toEqual('(ok 1000)');
  });
  
  it('should distribute profit to investors', () => {
    const block = chain.mineBlock([
      Tx.contractCall(
          'profit-sharing',
          'distribute-profit',
          [],
          accounts['owner'].address
      ),
    ]);
    const receipt = block.receipts[0];
    expect(receipt.result).toBeOk();
    expect(receipt.result).toEqual('(ok "Profit distributed")');
  });
});
