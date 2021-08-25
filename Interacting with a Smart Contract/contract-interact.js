const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
require('dotenv').config();

// For Truffle
const contract = require("../Hello World Smart Contract/truffle/build/contracts/HelloWorld.json"); 

const { API_URL, PUBLIC_KEY, PRIVATE_KEY } = process.env
const web3 = createAlchemyWeb3(API_URL);

const contractAddress = "0x051870a19066b55Dacebc72394006Ce7F16a81aa";
const helloWorldContract = new web3.eth.Contract(contract.abi, contractAddress);

async function updateMessage(newMessage) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); // get latest nonce
  const gasEstimate = await helloWorldContract.methods.update(newMessage).estimateGas(); // estimate gas

  // Create the transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': gasEstimate, 
    'maxFeePerGas': 1000000108,
    'data': helloWorldContract.methods.update(newMessage).encodeABI()
  };

  // Sign the transaction, and send rawTransaction
  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise.then((signedTx) => {
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
      } else {
        console.log("Something went wrong when submitting your transaction:", err)
      }
    });
  }).catch((err) => {
    console.log("Promise failed:", err);
  });
}

async function main() {
  const message = await helloWorldContract.methods.message().call();
  console.log("The message is: " + message);
  // await updateMessage("Hello Drupe!");
}
main();