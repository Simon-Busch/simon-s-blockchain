import * as crypto from 'crypto';

class Transaction {
  constructor(
    public amount: number,
    public payer: string, // public key
    public payee: string // public key
  ) {}

  toString() {
    return JSON.stringify(this);
  }
}

class Block {
  constructor(
    public prevHash: string | null, //link to previous block
    public transaction: Transaction,
    public timestamp = Date.now()
  ) {}

  get hash() {
    const str = JSON.stringify(this);
    const hash = crypto.createHash('SHA256');
    hash.update(str).end();
    return hash.digest('hex');
  }
}

class Chain {
  public static instance = new Chain(); //singleton -> ONLY ONE CHAIN

  chain: Block[];

  constructor() {
    this.chain = [new Block(null, new Transaction(100, 'genesis block', 'Simon'))];
  }

  get lastBlock() {
    return this.chain[this.chain.length -1];
  }

  addBlock(transaction: Transaction, senderPublicKey: string, signature: string) {
    const newBlock = new Block(this.lastBlock.hash, transaction);
    this.chain.push(newBlock);
  }
}

class Wallet {

}