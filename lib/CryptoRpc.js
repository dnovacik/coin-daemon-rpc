const _ = require('lodash');
const Jayson = require('jayson');

class CryptoRpc {
  constructor(url) {
    this.Jayson = Jayson.Client.http(url);
  }

  async call() {
    let method = arguments[0];
    let params = [...arguments].splice(1);

    return new Promise((resolve, reject) => {
      this.Jayson.request(method, params)
        .then(response => {
          return resolve(response);
        })
        .catch(err => {
          return reject(err);
        })
    })
  }
}

const methods = [
  'abandonTransaction',
  'abortRescan',
  'addMultiSigAddress',
  'addNode',
  'addWitnessAddress',
  'backupWallet',
  'bumpFee',
  'clearBanned',
  'combineRawTransaction',
  'createMultiSig',
  'createRawTransaction',
  'createWitnessAddress',
  'decodeRawTransaction',
  'decodeScript',
  'disconnectNode',
  'dumpPrivKey',
  'dumpWallet',
  'encryptWallet',
  'estimateFee',
  'estimatePriority',
  'estimateSmartFee',
  'estimateSmartPriority',
  'fundRawTransaction',
  'generate',
  'generateToAddress',
  'getAccount',
  'getAccountAddress',
  'getAddedNodeInfo',
  'getAddressesByAccount',
  'getBalance',
  'getBestBlockHash',
  'getBlock',
  'getBlockCount',
  'getBlockHash',
  'getBlockHeader',
  'getBlockTemplate',
  'getBlockchainInfo',
  'getChainTips',
  'getChainTxStats',
  'getConnectionCount',
  'getDifficulty',
  'getGenerate',
  'getHashesPerSec',
  'getInfo',
  'getMemoryInfo',
  'getMempoolAncestors',
  'getMempoolDescendants',
  'getMempoolEntry',
  'getMempoolInfo',
  'getMiningInfo',
  'getNetTotals',
  'getNetworkHashPs',
  'getNetworkInfo',
  'getNewAddress',
  'getPeerInfo',
  'getRawChangeAddress',
  'getRawMempool',
  'getRawTransaction',
  'getReceivedByAccount',
  'getReceivedByAddress',
  'getTransaction',
  'getTxOut',
  'getTxOutProof',
  'getTxOutSetInfo',
  'getUnconfirmedBalance',
  'getWalletInfo',
  'getWork',
  'help',
  'importAddress',
  'importMulti',
  'importPrivKey',
  'importPrunedFunds',
  'importPubKey',
  'importWallet',
  'keypoolRefill',
  'listAccounts',
  'listAddressGroupings',
  'listBanned',
  'listLockUnspent',
  'listReceivedByAccount',
  'listReceivedByAddress',
  'listSinceBlock',
  'listTransactions',
  'listUnspent',
  'listWallets',
  'lockUnspent',
  'move',
  'mnsync',
  'ping',
  'preciousBlock',
  'prioritiseTransaction',
  'pruneBlockchain',
  'removePrunedFunds',
  'rescanBlockchain',
  'saveMempool',
  'sendFrom',
  'sendMany',
  'sendRawTransaction',
  'sendToAddress',
  'setAccount',
  'setBan',
  'setGenerate',
  'setNetworkActive',
  'setTxFee',
  'signMessage',
  'signMessageWithPrivKey',
  'signRawTransaction',
  'stop',
  'submitBlock',
  'upTime',
  'validateAddress',
  'verifyChain',
  'verifyMessage',
  'verifyTxOutProof',
  'version',
  'walletLock',
  'walletPassphrase',
  'walletPassphraseChange',
];

for (let method of methods) {
  CryptoRpc.prototype[method] = _.partial(CryptoRpc.prototype.call, method.toLowerCase());
  if (method.toLowerCase() != method) {
    CryptoRpc.prototype[method.toLowerCase()] = _.partial(CryptoRpc.prototype.call, method.toLowerCase());
  }
}

module.exports = CryptoRpc;