"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = __importStar(require("crypto"));
var Transaction = /** @class */ (function () {
    function Transaction(amount, payer, // public key
    payee // public key
    ) {
        this.amount = amount;
        this.payer = payer;
        this.payee = payee;
    }
    Transaction.prototype.toString = function () {
        return JSON.stringify(this);
    };
    return Transaction;
}());
var Block = /** @class */ (function () {
    function Block(prevHash, //link to previous block
    transaction, timestamp) {
        if (timestamp === void 0) { timestamp = Date.now(); }
        this.prevHash = prevHash;
        this.transaction = transaction;
        this.timestamp = timestamp;
    }
    Object.defineProperty(Block.prototype, "hash", {
        get: function () {
            var str = JSON.stringify(this);
            var hash = crypto.createHash('SHA256');
            hash.update(str).end();
            return hash.digest('hex');
        },
        enumerable: false,
        configurable: true
    });
    return Block;
}());
var Chain = /** @class */ (function () {
    function Chain() {
        this.chain = [new Block(null, new Transaction(100, 'genesis block', 'Simon'))];
    }
    Object.defineProperty(Chain.prototype, "lastBlock", {
        get: function () {
            return this.chain[this.chain.length - 1];
        },
        enumerable: false,
        configurable: true
    });
    Chain.prototype.addBlock = function (transaction, senderPublicKey, signature) {
        var newBlock = new Block(this.lastBlock.hash, transaction);
        this.chain.push(newBlock);
    };
    Chain.instance = new Chain(); //singleton -> ONLY ONE CHAIN
    return Chain;
}());
var Wallet = /** @class */ (function () {
    function Wallet() {
    }
    return Wallet;
}());
