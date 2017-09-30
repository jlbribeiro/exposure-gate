var socket = io("http://localhost:8080");

socket.on("transaction", function(transaction){
  $(document).trigger('new-transaction', transaction);
});

