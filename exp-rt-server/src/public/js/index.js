var container = document.getElementById('root');
var users = new vis.DataSet();
var transactions = new vis.DataSet();
var data = {
  nodes: users,
  edges: transactions,
}
var options = {
  nodes: {
    shape: 'dot',
    scaling: {
      min: 1,
      max: 1000,
      customScalingFunction: function (min,max,total,value) {
        return value/total;
      },
    },
    color: "#11CC11",
    borderWidth: 0,
    font: {
      color: "#11CC11"
    }
  },
  interaction: {
    zoomView: false
  },
  physics: {
    solver: 'repulsion'
  },
  edges: {
    physics: false
  }
}
var network = new vis.Network(container, data, options);

for(var i = 0; i<100;) {
  users.add({id: ++i, value: 100, label: 100})
}

users.add({id: ++i, value: 1000, label: 1000, color: "#ffffff"})


network.stabilize()
network.fit()
network.redraw()

setTimeout(()=>{
  setInterval(()=>{
    var from, to
    from = Math.floor(Math.random() * i)
    do
      to = Math.floor(Math.random() * i)
    while(to == from)
    value = Math.floor(Math.random() * users.get(from).value)
    // users.get(from).value -= value
    users.update({id: from, value: users.get(from).value - value, label: users.get(from).value - value})
    new_edge = transactions.add({from: from, to: to, arrows: {to:{scaleFactor:2}}})
    setTimeout(()=>{
      transactions.remove(new_edge)
      // users.get(to).value += value
      users.update({id: to, value: users.get(to).value + value, label: users.get(to).value + value})
    }, 500)
  }, 1000)
}, 5000)

window.transaction_list = [];
$(document).on('new-transaction', function(transaction){
  console.log(transaction);
  window.transaction_list.push(transaction);
});
