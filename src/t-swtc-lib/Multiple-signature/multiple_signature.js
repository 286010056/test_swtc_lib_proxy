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





// 查询帐号的签名列表
router.get('/requestSignerList', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });
    
    remote
    .connectPromise()
    .then(async () => {
      let options = { account: "jwDQAAh3aEH74cSx5kLvxHGf9t248pFqyk" };
      let result = await remote.requestSignerList(options).submitPromise()
      res.send(result);
      remote.disconnect()
    })
    .catch(e=>{
      res.status(500).send(httpUtils.Res500(`${e}`));
    });
});

// 设置帐号的签名列表
router.get('/buildSignerListTx', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });

    const a = { 
      secret: 'xxx',
      address: 'jwDQAAh3aEH74cSx5kLvxHGf9t248pFqyk'
    }
    const a1 = { 
      secret:'xxx',
      address: 'jGg9QzGsMTtPU9DgU4TEMi69LLyrPzfdqf'
    }
    const a2 = { 
      secret: 'xxx',
      address: 'jEdMhnqsN228jvqnedtY8QGbmH99Pq63MM'
    }


    const tx = remote.buildSignerListTx({
        account: a.address,
        threshold: 5,
        lists: [
            { account: a1.address, weight: 3 },
            { account: a2.address, weight: 3 },
        ]
    })
    

    remote
    .connectPromise()
    .then(async () => {
      let result_v1 = await tx._setSequencePromise();
      tx.setFee(30000);
      let result_v2 = await tx.submitPromise(a.secret)
      res.send(result_v2);
      remote.disconnect()
    })
    .catch(e=>{
      res.status(500).send(httpUtils.Res500(`${e}`));
    });
});

// 废除帐号的主密钥
router.get('/buildAccountSetTx', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });

    const a = { 
      secret: 'xxx',
      address: 'jwDQAAh3aEH74cSx5kLvxHGf9t248pFqyk'
    }

    const tx = remote.buildAccountSetTx({
      account: a.address,
      type: 'property',
      set_flag: 4
    })

    remote
    .connectPromise()
    .then(async () => {
      let result_v1 = await tx._setSequencePromise()
      let result = await tx.submitPromise(a.secret)

      res.send(result);
      remote.disconnect()
    })
    .catch(e=>{
      res.status(500).send(httpUtils.Res500(`${e}`));
    });
});

// 激活帐号的主密钥
router.get('/activationAccountSetTx', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });

    const a = { 
      secret: 'xxx',
      address: 'jwDQAAh3aEH74cSx5kLvxHGf9t248pFqyk'
    }

    const a1 = { 
      secret:'xxx',
      address: 'jGg9QzGsMTtPU9DgU4TEMi69LLyrPzfdqf'
    }

    const a2 = { 
      secret: 'xxx',
      address: 'jEdMhnqsN228jvqnedtY8QGbmH99Pq63MM'
    }

    const tx = remote.buildAccountSetTx({
      account: a.address,
      type: 'property',
      clear_flag: 4 // 这个是clear
    })

    remote
    .connectPromise()
    .then(async () => {
      let result_v1 = await tx._setSequencePromise()
      tx.setFee(20000)
      // 把列表里面的都加上去
      // 完毕之后进行添加
      tx.multiSigning(a1)
      tx.multiSigning(a2)
      tx.multiSigned()
      let result = await tx.submitPromise() // 不需要私钥

      res.send(result);
      remote.disconnect()
    })
    .catch(e=>{
      res.status(500).send(httpUtils.Res500(`${e}`));
    });
});

// 多签支付v1
router.get('/multiSigning_v1', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });

    const a = { 
      secret: 'xxx',
      address: 'jwDQAAh3aEH74cSx5kLvxHGf9t248pFqyk'
    }

    const a1 = { 
      secret:'xxx',
      address: 'jGg9QzGsMTtPU9DgU4TEMi69LLyrPzfdqf'
    }

    const a2 = { 
      secret: 'xxx',
      address: 'jEdMhnqsN228jvqnedtY8QGbmH99Pq63MM'
    }

    let to = 'jjpHPBT28Ux8wkvokraYFy2N6QtvYVcdvz'

    // 创建支付交易
    let tx = remote.buildPaymentTx({ account: a.address, to, amount: remote.makeAmount(0.01) })
    tx.addMemo('多签支付测试')

    remote
    .connectPromise()
    .then(async () => {
      // 设置sequence
      let result_v1 = await tx._setSequencePromise()
      tx.setFee(20000)
      // 把列表里面的都加上去
      // 完毕之后进行添加
      tx.multiSigning(a1) // 签名
      // tx.tx_json 需要依次传递给不同的多签方
      let tx_json = tx.tx_json
      let tx2 = remote.buildMultisignedTx(tx_json) // 把签名转换为内部对象
      tx2.multiSigning(a2)

      tx2.multiSigned() // 完成签名

      let result = await tx2.submitPromise() // 不需要私钥

      res.send(result);
      remote.disconnect()
    })
    .catch(e=>{
      res.status(500).send(httpUtils.Res500(`${e}`));
    });
});


// 多签支付v2
router.get('/multiSigning_v2', async (req, res, next) => {
    var Remote = jlib.Remote;
    var remote = new Remote({
      server: "ws://sgws.jingtumzs.com:5020",
      issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    });

    const a = { 
      secret: 'xxx',
      address: 'jwDQAAh3aEH74cSx5kLvxHGf9t248pFqyk'
    }

    const a1 = { 
      secret:'xxx',
      address: 'jGg9QzGsMTtPU9DgU4TEMi69LLyrPzfdqf'
    }

    const a2 = { 
      secret: 'xxx',
      address: 'jEdMhnqsN228jvqnedtY8QGbmH99Pq63MM'
    }

    let to = 'jjpHPBT28Ux8wkvokraYFy2N6QtvYVcdvz'

    // 创建支付交易
    let tx = remote.buildPaymentTx({ account: a.address, to, amount: remote.makeAmount(0.01) })
    tx.addMemo('多签支付测试')

    remote
    .connectPromise()
    .then(async () => {
      // 设置sequence
      let result_v1 = await tx._setSequencePromise()
      tx.setFee(20000)
      // 把列表里面的都加上去
      // 完毕之后进行添加
      tx = remote.buildSignFirstTx({tx, account: a1.address, secret: a1.secret});
      // tx.tx_json 需要依次传递给不同的多签方
      let tx_json = tx.tx_json
      
      // 然后重组成tx
      let tx2 = remote.buildSignOtherTx({tx_json, account: a2.address, secret: a2.secret});

      
      // 最后，不要账号密码进行组装，给一个组装完毕的标识
      let tx3 = remote.buildMultisignedTx(tx2.tx_json)
      tx3.multiSigned()

      let result = await tx3.submitPromise()

      res.send(result);
      remote.disconnect()
    })
    .catch(e=>{
      res.status(500).send(httpUtils.Res500(`${e}`));
    });
});

//导出模块接口
module.exports = router;