var socket = io("http://localhost:8080");

socket.on("transaction", transaction => {
  console.log(transaction);
});

