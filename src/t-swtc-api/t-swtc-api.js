//依赖关系
var express = require('express');
var router = express.Router();
var httpUtils = require('../../lib/http/httpUtils.js');
var delay = require('delay');
var path = require('path');
var fs = require('fs');
var moment = require('moment');
// 引入井通库
var japi = require('swtc-api');

// 测试签名相关的
var Wallet = japi.Remote.Wallet;





// 创建钱包
router.get('/Walletgenerate', async (req, res, next) => {
  var w1 = Wallet.generate();
  console.log(w1);
  res.end();
});

router.get('/WalletfromSecret', async (req, res, next) => {
  var w1 = Wallet.fromSecret('xxx');
  console.log(w1);
  res.end();
});



// 获取余额
router.get('/getAccountBalances', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})

  // 正确的地址
  remote.getAccountBalances('jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz').then( result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })

  // 错误的地址
  remote.getAccountBalances('jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz2').then( result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })
  res.end();
});

// 获得账号支付信息
router.get('/getAccountPayment', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})

  remote.getAccountPayment('jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz', '84CCE378A2882D417AC311CA027FC1EAD21E5486B7C7E6FBFE71187FF28E0F65').then( result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })

  res.end();
});

// 获得账号支付记录
router.get('/getAccountPayments', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})

  remote.getAccountPayments('jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz', { results_per_page: 1 }).then( result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })

  res.end();
});

// 获得账号挂单信息
router.get('/getAccountOrder', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})

  remote.getAccountOrder('jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz', '8D6DC86FF64DFE83AFB9B5B0E43B7BCA05B9FAB88C5F73D540814FE1DE195CAA').then( result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })

  res.end();
});

// 获得账号挂单列表
router.get('/getAccountOrders', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})

  remote.getAccountOrders('jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz').then( result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })

  res.end();
});

// 获得账号事务信息
router.get('/getAccountTransaction', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})

  remote.getAccountTransaction('jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz', 'F42226C6A483D14ED14D34945E366917EE508CC04BE00CFF50E200440E6B0AD9').then( result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })

  res.end();
});

// 获得账号交易记录
router.get('/getAccountTransactions', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})

  remote.getAccountTransactions('jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz').then( result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })
  res.end();
});

// 获得帐号交易序列号
router.get('/getAccountSequence', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})

  remote.getAccountSequence('jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz').then( result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })
  res.end();
});

// 获得货币对的挂单列表
router.get('/getOrderBooks', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})

  remote.getOrderBooks('SWT', 'CNY+' + remote._issuer).then( result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })
  res.end();
});

// 获得某一事务信息
router.get('/getTransaction', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})

  remote.getTransaction('FA45FD2FD57BF051EF19C967DFC17CD2721E29BF432B0E10CBE0AF0510A9F032').then( result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })
  res.end();
});

// 获得最新帐本
router.get('/getLedger', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})

  remote.getLedger().then( result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })
  res.end();
});

// 获得某一帐本及其交易信息
router.get('/getLedgerNew', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})
  
  remote.getLedger(14853643).then( result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })

  remote.getLedger('1A9BF9022534A7D26A8B771CD8C2B3BEE0D6AFF68F0FED8448CE5ADBACD04162').then( result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })
  res.end();
});

// 获得挂单佣金信息
router.get('/getAccountBrokerage', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})
  
  remote.getAccountBrokerage('jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz').then( result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })
  
  res.end();
});

// 支付
router.get('/buildPaymentTx', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})
  
  remote.buildPaymentTx({
       account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
       to: 'j3vyFAMQW2Ls48eoFCTsMXFq2KNWVUskSx',
       amount: remote.makeAmount(1, 'JSLASH')
  }).submitPromise('xxx', 'payment memo').then( result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })
  
  res.end();
});

// 设置关系
router.get('/buildRelationTx', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})
  
  let options = {
    account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
    target: 'j3vyFAMQW2Ls48eoFCTsMXFq2KNWVUskSx',
    limit: remote.makeAmount(1, 'JSLASH'),
    type:'authorize'
  };
  let tx = remote.buildRelationTx(options);
  tx.submitPromise('xxx', '授权').then( result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })
  
  res.end();
});

// 挂单
router.get('/buildOfferCreateTx', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})
  
  let options = {
      type: 'Sell',
      account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
      taker_pays: remote.makeAmount(1),
      taker_gets: remote.makeAmount(1, 'JSLASH')
  };
  let tx = remote.buildOfferCreateTx(options);

  tx.submitPromise('xxx').then( result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })
  
  res.end();
});

// 取消挂单
router.get('/buildOfferCancelTx', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})
  
  let options = {account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz', sequence: 18};
  let tx = remote.buildOfferCancelTx(options);

  tx.submitPromise('xxx').then( result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })
  
  res.end();
});

// 设置挂单佣金
router.get('/buildBrokerageTx', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})
  
  let options = {
    account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
    mol: 1,
    den: 1000,
    feeAccount: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
    amount: remote.makeAmount(3, "JSLASH")
  }

  let tx = remote.buildBrokerageTx(options);

  tx.submitPromise('xxx').then( result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })
  
  res.end();
});

// 本地签名
router.get('/postBlob', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})
  
  remote.postBlob({blob: '1200002200000000240000257861D4038D7EA4C680000000000000000000000000544553540000000000A582E432BFC48EEDEF852C814EC57F3CD2D4159668400000000000271073210256F9ED0A13D879E2DAC205A23CF1BA6DA210C094F3B18168945BBCD0664BAD0C744630440220400CDFF5590C540777E9AC2C7672E73DF2EBDAFBF323E7C143302686F01ED2D402206308DA9E9D14D86EF8D9938A48BC4ACDA7478698E7E805838C4F44857D103E658114C1D4C79B2C9CD8FE9AB1EE29FAA18432A3DBFD8A83140D2C803B102F69C7AF902747C0CE6B0C90CF869AF9EA7D06E6B58BE8AF95E1F1'}).then( result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })
  
  res.end();
});

// 查询帐号的签名列表
router.get('/getAccountSignerList', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})

  const a = { secret: 'xxx', address: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz' }
  let result = await remote.getAccountSignerList(a.address).then( result =>{
    console.log(result);
  }).catch(e=>{
    console.log(e);
  })
  
  res.end();
});

// 设置签名列表
router.get('/buildSignerListTx', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})

  const a = { secret: 'xxx', address: 'jwDQAAh3aEH74cSx5kLvxHGf9t248pFqyk' }
  const a1 = { secret: 'xxx', address: 'jGg9QzGsMTtPU9DgU4TEMi69LLyrPzfdqf' }
  const a2 = { secret: 'xxx', address: 'jEdMhnqsN228jvqnedtY8QGbmH99Pq63MM' }

  const tx = remote.buildSignerListTx({
    account: a.address,
    threshold: 7,
    lists: [
        { account: a1.address, weight: 4 },
        { account: a2.address, weight: 5 },
    ]
  })

  await tx._setSequencePromise()
  // log_json(tx.tx_json)
  // console.log(`需要设置足够的燃料支持多签交易tx.setFee()`)
  tx.setFee(30000)  // 燃料
  // log_json(tx.tx_json)
  let result = await tx.submitPromise(a.secret)
  console.log(result)
  // log_json(result.tx_json)
  
  res.end();
});

// 废除帐号的主密钥
router.get('/buildAccountSetTx', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})

  const a = { secret: 'xxx', address: 'jwDQAAh3aEH74cSx5kLvxHGf9t248pFqyk' }
  const a1 = { secret: 'xxx', address: 'jGg9QzGsMTtPU9DgU4TEMi69LLyrPzfdqf' }
  const a2 = { secret: 'xxx', address: 'jEdMhnqsN228jvqnedtY8QGbmH99Pq63MM' }

  const tx = remote.buildAccountSetTx({
    account: a.address,
    type: 'property',
    set_flag: 4
  })

  await tx._setSequencePromise()
  let result = await tx.submitPromise(a.secret)
  console.log(result)
  // log_json(result.tx_json)
  
  res.end();
});

// 激活帐号的主密钥
router.get('/buildAccountSetTxClearFlag', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})

  const a = { secret: 'xxx', address: 'jwDQAAh3aEH74cSx5kLvxHGf9t248pFqyk' }
  const a1 = { secret: 'xxx', address: 'jGg9QzGsMTtPU9DgU4TEMi69LLyrPzfdqf' }
  const a2 = { secret: 'xxx', address: 'jEdMhnqsN228jvqnedtY8QGbmH99Pq63MM' }

  const tx = remote.buildAccountSetTx({
    account: a.address,
    type: 'property',
    clear_flag: 4
  })

  await tx._setSequencePromise()
  tx.setFee(20000) 
  tx.multiSigning(a1)
  tx.multiSigning(a2)
  tx.multiSigned()
  let result = await tx.submitPromise()
  console.log(result)
  // log_json(result.tx_json)
  
  res.end();
});

// 多重签名交易v1
router.get('/multiSignBuildPaymentTxv1', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})

  const a = { secret: 'xxx', address: 'jwDQAAh3aEH74cSx5kLvxHGf9t248pFqyk' }
  const a1 = { secret: 'xxx', address: 'jGg9QzGsMTtPU9DgU4TEMi69LLyrPzfdqf' }
  const a2 = { secret: 'xxx', address: 'jEdMhnqsN228jvqnedtY8QGbmH99Pq63MM' }

  let to = 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz'

  let tx = remote.buildPaymentTx({ account: a.address, to, amount: remote.makeAmount(1) })
  tx.addMemo('测试多重签名')

  await tx._setSequencePromise() // 添加sequence
  tx.setFee(20000) // 燃料
  tx = tx.multiSigning(a1) // 签入a1
  let tx_json = tx.tx_json
  let tx2 = remote.buildMultisignedTx(tx_json) //json 转换为 对象
  tx2.multiSigning(a2) // 签入a2
  tx2.multiSigned() // 签名完毕
  let result = await tx2.submitPromise()
  console.log(result)
  
  res.end();
});

// 多重签名交易v2
router.get('/multiSignBuildPaymentTxv2', async (req, res, next) => {
  var Remote = japi.Remote;
  var remote = new Remote({server: 'http://swtcproxy.swtclib.ca:5080'})

  const a = { secret: 'xxx', address: 'jwDQAAh3aEH74cSx5kLvxHGf9t248pFqyk' }
  const a1 = { secret: 'xxx', address: 'jGg9QzGsMTtPU9DgU4TEMi69LLyrPzfdqf' }
  const a2 = { secret: 'xxx', address: 'jEdMhnqsN228jvqnedtY8QGbmH99Pq63MM' }

  let to = 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz'
  // 创建支付交易
  let tx = remote.buildPaymentTx({ account: a.address, to, amount: remote.makeAmount(1) })
  tx.addMemo('测试多重签名')

  // 多签
  await tx._setSequencePromise() // 添加sequence
  tx.setFee(20000) // 燃料
  tx = remote.buildSignFirstTx({tx, account: a1.address, secret: a1.secret})
  // tx.tx_json 需要依次传递给不同的多签方
  let tx_json = tx.tx_json
  // 然后重组成tx
  let tx2 = remote.buildSignOtherTx({tx_json, account: a2.address, secret: a2.secret})

  // 最后进行从整
  let tx3 = remote.buildMultisignedTx(tx2.tx_json)
  tx3.multiSigned()


  let result = await tx3.submitPromise()
  console.log(result)
  
  res.end();
});


//导出模块接口
module.exports = router;