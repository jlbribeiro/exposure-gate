$(document).ready(()=>{
  var container = document.getElementById('root');
  window.users = new vis.DataSet();
  window.transactions = new vis.DataSet();
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

  for(var i = 0; i < allUsers.length; i++) {
    if(allUsers[i]['wallet'] != '') {
      users.add({id: allUsers[i]['wallet'], color: "#11CC11"})
    }
  }

  for(var i = 0; i < allProjects.length; i++) {
    if(allProjects[i]['wallet'] != '') {
      users.add({id: allProjects[i]['wallet'], color: "#1111CC"})
    }
  }

  network.stabilize()
  network.fit()
  network.redraw()
});

$(document).on('new-transaction', function(event, transaction){
  console.log(transaction)
  window.transactions.add({from: transaction['from']['wallet'], to: transaction['to']['name']});

});
