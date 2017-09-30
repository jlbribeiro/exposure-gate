var socket = io("http://localhost:8080");

let counter = 0;
let i = 0;

setInterval(()=>{
  counter = 0
}, 10000)

socket.on("transaction", function(transaction) {

  if(transaction['from']['wallet'] == undefined || transaction['to']['name'] == undefined) {
    return;
  }

  counter+=100;
  i++;

  console.log("" + transaction['from']['wallet'] + " -> " + transaction['to']['name'] + " : " + transaction['value'] + " EXP")

  let id = window.transactions.add({id: i, from: transaction['from']['wallet'].replace('0x','').replace('-',''), to: transaction['to']['name'].replace('0x','').replace('-',''), arrows:{to:{scaleFactor:2}}})
  window.transactions.flush()

  setTimeout(()=>{
    window.transactions.remove(id)
    window.transactions.flush()
  }, counter)
});

