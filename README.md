# test_swtc_lib_proxy
用于测试swtc_lib和swtc_proxy


## swtc-chains

> 描述： 基础信息：包含各个平台的各种币种 基础信息

### 主要依赖

1. 无
 
### 测试情况

1. test passing 100%

### 问题以及建议

1. 无

## swtc-address-codec

> 描述： 主要作用是验证地址是否有效，加密base58和hex的互相转换的完整性和正确性

### 主要依赖

1. swtc-chains
2. x-address-codec -> create-hash

### 测试情况

1. test passing 100%

### 问题以及建议

1. 主要依赖 x-address-codec 已经不再维护，已经迁移到 ripple-address-codec 需要考虑是否迁移。[x-address-codec](https://github.com/ripple/x-address-codec) [ripple-address-codec](https://github.com/ripple/ripple-address-codec)


## swtc-keypairs

> 描述： 主要是生成各个不同规范的账号，进行不同规范的账号的测试。公私钥，16进账，签名等等。算法为 Elliptic 椭圆曲线加密

### 主要依赖

1. swtc-address-codec
2. swtc-factory
3. Elliptic

### 测试情况

1. test passing 100%

### 问题以及建议

1. 无

## swtc-factory

> 描述：提供生成公钥私钥，公钥验证，私钥验证，私钥导出公钥，用私钥给一段信息加密的相关功能

### 主要依赖

1. swtc-keypairs

### 测试情况

1. test passing 100%

### 问题以及建议

1. 无

## swtc-Wallet

> 描述： 提供生成公钥私钥，公钥验证，私钥验证，私钥导出公钥，用私钥给一段信息加密的相关功能,和swtc-factory实现的功能类似，这个比较新，lib库中的功能基本上用的这个。

### 主要依赖

1. swtc-keypairs

### 测试情况

1. test passing 100%

### 问题以及建议

1. 无


## swtc-utils

> 描述： 井通公链 utility 库，基于钱包。各种工具类库。

### 主要依赖

1. swtc-wallet

### 测试情况

1. test passing 100%
   * [X] ~~*hexToString*~~ [2020-01-06]
   * [X] ~~*stringToHex*~~ [2020-01-06]
   * [X] ~~*isValidAmount*~~ [2020-01-06]
   * [X] ~~*isValidAmount0*~~ [2020-01-06]
   * [X] ~~*...*~~ [2020-01-06]

### 问题以及建议

1. 无

## swtc-serializer

> 描述： 井通公链交易序列化库, 基于钱包。里面包含了各种工具和一些验证函数。

### 主要依赖

1. swtc-wallet

### 测试情况

1. test passing 100%
   
* datacheck.spec 36 passing 100%
   * [X] ~~*allNumeric*~~ [2020-01-06]
   * [X] ~~*isCurrency*~~ [2020-01-06]
   * [X] ~~*isRelation*~~ [2020-01-06]
   * [X] ~~*isTumCode*~~ [2020-01-06]
   * [X] ~~*isAmount*~~ [2020-01-06]
   * [X] ~~*...*~~ [2020-01-06]

* serializer.spec 47 passing 100%
   * [X] ~~*inst.buffer*~~ [2020-01-06]
   * [X] ~~*inst.pointer*~~ [2020-01-06]
   * [X] ~~*lookup_type_le*~~ [2020-01-06]
   * [X] ~~*lookup_type_tx*~~ [2020-01-06]
   * [X] ~~*sort_typedef*~~ [2020-01-06]
   * [X] ~~*...*~~ [2020-01-06]

* signature.spec 16 passing 100%
   * [X] ~~*signature*~~ [2020-01-06]
   * [X] ~~*inst.buffer*~~ [2020-01-06]

* tumAmount.spec 28 passing 100%
   * [X] ~~*parse_issuer*~~ [2020-01-06]
   * [X] ~~*parse_swt_value*~~ [2020-01-06]
   * [X] ~~*tum_to_bytes*~~ [2020-01-06]
   * [X] ~~*parse_tum_value*~~ [2020-01-06]
   * [X] ~~*to_json*~~ [2020-01-06]
   * [X] ~~*...*~~ [2020-01-06]

* types.utils.spec 25 passing 100%
   * [X] ~~*methods*~~ [2020-01-06]
   * [X] ~~*STArray*~~ [2020-01-06]
   * [X] ~~*STObject*~~ [2020-01-06]
   * [X] ~~*...*~~ [2020-01-06]
   
* utils.spec 87 passing 100%
   * [X] ~~*get_transaction_type*~~ [2020-01-06]
   * [X] ~~*get_transaction_result*~~ [2020-01-06]
   * [X] ~~*get_ledger_entry_type*~~ [2020-01-06]
   * [X] ~~*get_dec_from_hexchar*~~ [2020-01-06]
   * [X] ~~*hex_str_to_byte_array*~~ [2020-01-06]
   * [X] ~~*get_char_from_num*~~ [2020-01-06]
   

### 问题以及建议

1. 无

## swtc-transaction

> 描述： 提井通公链交易库, 支付/挂单/关系/合约

### 主要依赖

1. swtc-serializer
2. swtc-utils
3. swtc-wallet

### 测试情况

1. test passing 100%

* test_multisign 2 passing 100% (测试多重签名)
  * [X] ~~*multiSigning*~~ [2020-01-06]
  * [X] ~~*buildMultisignedTx*~~ [2020-01-06]

* test_transaction_additional 30 passing 100% (本地签名，挂单，取消挂单相关)
  * [X] ~~*setSequence*~~ [2020-01-06]
  * [X] ~~*signPromise*~~ [2020-01-06]
  * [X] ~~*sign with sequence set*~~ [2020-01-06]
  * [X] ~~*build offer create*~~ [2020-01-06]
  * [X] ~~*build offer cancel*~~ [2020-01-06]
  * [X] ~~*...*~~ [2020-01-06]

* test_transaction 43 passing 100% (交易过程中的相关函数，包含了挂单和签名)
  * [X] ~~*constructor*~~ [2020-01-06]
  * [X] ~~*parseJson*~~ [2020-01-06]
  * [X] ~~*getAccount*~~ [2020-01-06]
  * [X] ~~*getTransactionType*~~ [2020-01-06]
  * [X] ~~*...*~~ [2020-01-06]

### 问题以及建议

1. 编译问题，直接执行 tsc 命令报错，推断是跨平台的兼容性没有处理。需要手动执行 tsc 并把 local_sign.js 复制到 src目录下。建议在tssrc下面的文件都是ts，并且修改下package.json里面相关的命令。
2. 疑问：test/test_transaction_additional.js 文件78行、109行、等，交易和挂单方面的接口是否使用了 https://tapi.jingtum.com 的接口
3. 【属于 SWTC-LIB】在lib库的文档里面，本地签名的步骤如下：（可否不连接服务器，在本地直接进行签名，因为有些需求是需要断网进行签名。若有，建议在文档里面写出具体文档，本地签名单独的lib调用示例也建议在文档内标识出来。）
   1. remote = new Remote({server, issuer})
   2. remote.connectPromise
   3. remote.buildPaymentTx.signPromise
4. tssrc/transaction.ts 第1101行，链上的memo的最大长度等于1019个字节，需要先转换为buffer计算长度，中文算3个字节，这里是大于2048才会超出。请检查是否有误。相关的测试用例 test_transaction 第124行，也需要进行相应的修改。
5. 