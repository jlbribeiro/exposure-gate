let Http = require("http");
let Fs = require("fs");

let Express = require("express");
let Io = require("socket.io");
let Web3 = require("web3");

const PORT = process.env.PORT || 8080;

const EXP_CONTRACT_ADDRESS = "0x0ce335bb2d04595c84e3d444675360f64de386e8";
const EXP_CONTRACT_ABI = JSON.parse(
  Fs.readFileSync("exp_contract.json", "UTF-8", "r")
);

function main() {
  let app = Express();
  let server = Http.Server(app);
  let io = Io(server);

  let web3 = new Web3(
    new Web3.providers.HttpProvider("http://moon.pixels.camp:8545")
  );

  let ExpContract = web3.eth.contract(EXP_CONTRACT_ABI);
  let expContract = ExpContract.at(EXP_CONTRACT_ADDRESS);

  expContract.Transfer(
    {},
    {
      fromBlock: 0,
      toBlock: "latest"
    },
    (err, result) => {
      let blockID = result.blockNumber;
      let transactionID = result.transactionIndex;
      let from = result.args._from;
      let to = result.args._to;
      let value = result.args._value.c[0];

      let transaction = {
        block_id: blockID,
        transaction_id: transactionID,
        from: from,
        to: to,
        value: value
      };

      console.log("[+] A transaction occurred.");
      io.emit("transaction", transaction);
    }
  );

  app.use(Express.static(__dirname + "/public"));

  server.listen(PORT);
}

main();
