//依赖关系
var express = require('express');
var router = express.Router();
var httpUtils = require('../../lib/http/httpUtils.js');
var delay = require('delay');
var path = require('path');
var fs = require('fs');
var moment = require('moment');
// 引入井通库
var jlib = require("swtc-lib");

// 测试签名相关的
const BigNumber = require('bignumber.js');
const swtc_serializer_1 = require("swtc-serializer");




// 3-创建Wallet对象-创建钱包
router.get('/initWallet', async (req, res, next) => {
    //创建Wallet对象
    var Wallet = jlib.Wallet;
    //方式一
    var w1 = Wallet.generate();
    //方式二
    var w2 = Wallet.fromSecret("xxx");
    let resData = {
      w1:w1,
      w2:w2
    }
    res.send(resData);
});

// 4.1-创建 Remote 对象
router.get('/initRemote', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });

    console.log(remote)
    res.send('Remote 创建成功，类在后台控制台已打印');
});

// 4.2-创建连接
router.get('/connectRemote', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });

    remote
      .connectPromise()
      .then(server_info => {
        res.send(server_info);
        remote.disconnect();
      })
      .catch(e=>{
        res.status(500).send(httpUtils.Res500(`${e}`));
      });
});

// 4.3-创建连接
router.get('/disconnectRemote', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });

    remote
      .connectPromise()
      .then(server_info => {
        //res.send(server_info);
        remote.disconnect();
        res.send('链接已经成功创建并已经关闭');
      })
      .catch(e=>{
        res.status(500).send(httpUtils.Res500(`${e}`));
      });
});

// 4.4-请求底层服务器信息
router.get('/requestServerInfo', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });

    remote
    .connectPromise()
    .then(async () => {
      let response = await remote.requestServerInfo().submitPromise();
      res.send(response);
      remote.disconnect();
    })
    .catch(e=>{
      res.status(500).send(httpUtils.Res500(`${e}`));
    });
});

// 4.5-获取最新账本信息
router.get('/requestLedgerClosed', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });
    
    remote
    .connectPromise()
    .then(async () => {
      let response = await remote.requestLedgerClosed().submitPromise();
      res.send(response);
      remote.disconnect();
    })
    .catch(e=>{
      res.status(500).send(httpUtils.Res500(`${e}`));
    });
});

// 4.6-获取某一账本具体信息
router.get('/requestLedger', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });
    
    remote
    .connectPromise()
    .then(async () => {
      let response = await remote
      .requestLedger({
        ledger_index: "4553682",
        transactions: true
      })
      .submitPromise();
      res.send(response);
      remote.disconnect();
    })
    .catch(e=>{
      res.status(500).send(httpUtils.Res500(`${e}`));
    });
});

// 4.7-查询某一交易具体信息
router.get('/requestTx', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });

    remote
    .connectPromise()
    .then(async () => {
      let req = remote.requestTx({
        hash: "2C3F60ABEC539BEE768FAE1820B9C284C7EC2D45EF1D7F9E28F4357056E822F7"
      });
      let response = await req.submitPromise();
      res.send(response);
      remote.disconnect();
    })
    .catch(e=>{
      res.status(500).send(httpUtils.Res500(`${e}`));
    });
});

// 4.8-请求账号信息
router.get('/requestAccountInfo', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://47.92.4.236:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });

    remote
    .connectPromise()
    .then(async () => {
      let options = { account: "jJCtKD2MbfYoVdQEbjTmbXmNiVkLBTknLC" };
      let req = remote.requestAccountInfo(options);
      let response = await req.submitPromise();
      res.send(response);
      remote.disconnect();
    })
    .catch(e=>{
      res.status(500).send(httpUtils.Res500(`${e}`));
    });
});

// 4.9-获得账号可接收和发送的货币
router.get('/requestAccountTums', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });

    remote
    .connectPromise()
    .then(async () => {
      let options = { account: "jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz" };
      let req = remote.requestAccountTums(options);
      let response = await req.submitPromise();
      res.send(response);
      remote.disconnect();
    })
    .catch(e=>{
      res.status(500).send(httpUtils.Res500(`${e}`));
    });
});

// 4.10-获得账号关系
router.get('/requestAccountRelations', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://47.92.4.236:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });
    
    remote
    .connectPromise()
    .then(async () => {
      let options = {
        account: "jJCtKD2MbfYoVdQEbjTmbXmNiVkLBTknLC",
        type: "trust"
      };
      let req = remote.requestAccountRelations(options);
      let response = await req.submitPromise();
      res.send(response);
      remote.disconnect();
    })
    .catch(e=>{
      res.status(500).send(httpUtils.Res500(`${e}`));
    });
});

// 4.11-获得账号挂单
router.get('/requestAccountOffers', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });
    
    remote
    .connectPromise()
    .then(async () => {
      let options = { account: "jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz" };
      let req = remote.requestAccountOffers(options);
      let response = await req.submitPromise();
      res.send(response);
      remote.disconnect();
    })
    .catch(e=>{
      res.status(500).send(httpUtils.Res500(`${e}`));
    });
});

// 4.12-获得账号交易列表
router.get('/requestAccountTx', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });
    
    remote
    .connectPromise()
    .then(async () => {
      let options = { account: "jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz" };
      let req = remote.requestAccountTx(options);
      let response = await req.submitPromise();
      res.send(response);
      remote.disconnect();
    })
    .catch(e=>{
      res.status(500).send(httpUtils.Res500(`${e}`));
    });
});

// 4.13-获得市场挂单
router.get('/requestOrderBook', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });
    
    remote
    .connectPromise()
    .then(async () => {
      let options = {
        limit: 5,
        pays: remote.makeCurrency(),
        gets: remote.makeCurrency("CNY")
      };
      let req = remote.requestOrderBook(options);
      let response = await req.submitPromise();
      res.send(response);
      remote.disconnect();
    })
    .catch(e=>{
      res.status(500).send(httpUtils.Res500(`${e}`));
    });
});

// 4.14-获得挂单佣金设置信息
router.get('/requestBrokerage', async (req, res, next) => {
    var Remote = jlib.Remote;
    const remote = new Remote();
    
    account = "jGxW97eCqxfAWvmqSgNkwc2apCejiM89bG";
    remote.connectPromise().then(async () => {
      let request = remote.requestBrokerage({ account });
      let response = await request.submitPromise();
      res.send(response);
      remote.disconnect();
    })
    .catch(e=>{
      res.status(500).send(httpUtils.Res500(`${e}`));
    });
});

// 4.15-支付
router.get('/buildPaymentTx', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });
    remote
      .connectPromise()
      .then(async () => {
        let tx = remote.buildPaymentTx({
          account: "jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz",
          to: "jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D",
          amount: remote.makeAmount(99900)
        });
        let response = await tx.submitPromise(
          "xxx",
          "给支付"
        );
        res.send(response);
        remote.disconnect();
      })
    .catch(e=>{
      res.status(500).send(httpUtils.Res500(`${e}`));
    });
});

// 4.16-设置关系
router.get('/buildRelationTx', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });
    remote
      .connectPromise()
      .then(async () => {
        let options = {
          account: "jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz",
          target: "jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D",
          limit: remote.makeAmount(1, "CNY"),
          type: "authorize"
        };
        let tx = remote.buildRelationTx(options);
        let response = await tx.submitPromise(
          "xxx",
          "授权"
        );
        res.send(response);
        remote.disconnect();
      })
    .catch(e=>{
      res.status(500).send(httpUtils.Res500(`${e}`));
    });
});

// 4.17-设置账号属性
router.get('/buildAccountSetTx', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });

    remote.connect(function(err, result) {
      if (err) {
        res.status(500).send(httpUtils.Res500(`${err}`));
        return;
      }
      var options = {
        account: "jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz",
        type: "property"
      };
      var tx = remote.buildAccountSetTx(options);
      tx.submitPromise("xxx")
        .then(res=>{
          res.send('设置账号属性成功，接口待完善。');
        })
        .catch(e=>{
          res.status(500).send(httpUtils.Res500(`设置账号属性失败，接口待完善。${e}`));
        });
    });
});

// 4.18-挂单
router.get('/buildOfferCreateTx', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });
    remote
      .connectPromise()
      .then(async () => {
        let options = {
          type: "Sell",
          account: "jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz",
          taker_pays: remote.makeAmount(0.01, "CNY"),
          taker_gets: remote.makeAmount(1)
        };
        let tx = remote.buildOfferCreateTx(options);
        let response = await tx.submitPromise("xxx");
        res.send(response);
        remote.disconnect();
      })
    .catch(e=>{
      res.status(500).send(httpUtils.Res500(`${e}`));
    });
});

// 4.19-取消挂单
router.get('/buildOfferCancelTx', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });
    remote
      .connectPromise()
      .then(async () => {
        let options = {
          account: "jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz",
          sequence: 7
        };
        let tx = remote.buildOfferCancelTx(options);
        let response = await tx.submitPromise("xxx");
        res.send(response);
        remote.disconnect();
      })
    .catch(e=>{
      res.status(500).send(httpUtils.Res500(`${e}`));
    });
});


// 4.22-设置挂单佣金
router.get('/callContractTx', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });

    remote.connect(function(err, result) {
      if (err) {
        res.status(500).send(httpUtils.Res500(`${err}`));
        return;
      }
      var options = {
        account: "jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz",
        destination: "jNdpxLQbmMMf4ZVXjn3nb98xPYQ7EpEpTN",
        foo: "foo",
        params: ["jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz"]
      };
      var tx = remote.callContractTx(options);
      tx.submitPromise("xxx")
        .then(res=>{
          res.send('设置挂单佣金成功。');
        })
        .catch(e=>{
          res.status(500).send(httpUtils.Res500(e));
        });
    });
});

// 测试-本地签名
router.get('/localSignature', async (req, res, next) => {
    var Wallet = jlib.Wallet;
    var Transaction = jlib.Transaction;

    let amount = new BigNumber("100000"); //0.1
    amount = amount.dividedBy(10**6);
    const tx = Transaction.buildPaymentTx({
        from: 'jKqYXRNeraBxypoZ2CEnMLUqTQd4GUrEk4',
        to: 'jakTvBwKFExGDXuggaQG9CkjYmycX7kR1c',
        amount: {
            value: amount.toString(),
            currency:'GSL', //SWT GSL
            issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or'}, //SWT issuer为''
        memo: '10120',
        secret: 'xxx',
        sequence: '3'
    });
    console.log(tx);
    const prefix = 0x53545800;
    const jser = swtc_serializer_1.Factory();

    tx.sign((err,data)=>{
        console.log(data)
        const jserObj = new jser(Buffer.alloc(Buffer.byteLength(data,'hex'), data, 'hex'));
        console.log(jserObj.hash());
    })
    res.end();
});


// 根据私钥获取钱包地址
router.post('/address_from_secret', async (req, res, next) => {
  const { secretArray } = req.body;
  let res_data = {
    data:[],
    wallet:[],
  };
  for (i in secretArray){
    let secret = secretArray[i];
    var Wallet = jlib.Wallet;
    var w2 = Wallet.fromSecret(secret);
    res_data.data.push(w2.address);
    res_data.wallet.push(w2);
  }
  res.send(res_data);
});

// 测试签名交易函数
router.post('/test/signPromise', async (req, res, next) => {
  const { account, to, value, currency, issuer, secret, memo, sequence } = req.body;
  var Remote = jlib.Remote;
  var remote = new Remote({
    server: "ws://106.54.116.47:5020",
    issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
  });
  let result =  await new Promise(resolve => {
    remote
      .connectPromise()
      .then(async () => {
        let amount = remote.makeAmount(value, currency, issuer);
        let tx = remote.buildPaymentTx({
          account: account,
          to: to,
          amount: amount
        });
        if(sequence){
          let response = await tx.signPromise(
            secret,
            memo,
            sequence,
          );
          resolve({success:true,data:response});
        }else{
          let response = await tx.signPromise(
            secret,
            memo,
          );
          resolve({success:true,data:response});
        }
        remote.disconnect();
      })
    .catch(e=>{
      resolve({success:false,data:e});
    });    
  });
  console.log(result);
  res.send(result);
});

// 测试提交直接签过名的blob
router.post('/test/tx/signPromise', async (req, res, next) => {
  const { blob } = req.body;
  var Remote = jlib.Remote;
  var remote = new Remote({
    server: "ws://sgws.jingtumzs.com:5020",
    issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
  });
  let result =  await new Promise(resolve => {
    remote
      .connectPromise()
      .then(async () => {
        let tx = remote.buildSignTx({blob});
        let response =  await tx.submitPromise()
        resolve({success:true,data:response});
        remote.disconnect();
      })
    .catch(e=>{
      resolve({success:false,data:e});
    });    
  });
  console.log(result);
  res.send(result);
});


//导出模块接口
module.exports = router;