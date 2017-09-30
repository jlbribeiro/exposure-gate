var socket = io("http://localhost:8080");

window.transactions = [];

socket.on("transaction", function(transaction){
  window.transactions.push(transaction);
  $(document).trigger('new-transaction', transaction);
});

