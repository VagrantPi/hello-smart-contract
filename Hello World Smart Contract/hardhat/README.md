contract: https://ropsten.etherscan.io/address/0x84f6b7146f3e030cdd3555d387b6c47ef9b85e46

## folder

```
.
├── artifacts     // build 完的檔案，包含 compiled contract (並非所有 .sol 檔案)，還有完整 solc input and output 的 debug 資訊
├── cache
├── contracts     // 合約位置
├── node_modules
└── scripts       // 部屬腳本，合約互動的腳本存放位置
```

## Plugins and dependencies

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Ethers.js 簡單為 hardhat 套件，簡單的封裝 ETH-RPC 可以安全又方便使用

