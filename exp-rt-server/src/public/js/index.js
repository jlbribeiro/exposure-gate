$(document).ready(()=>{
  var container = document.getElementById('root');
  window.users = new vis.DataSet();
  window.transactions = new vis.DataSet([], {queue: {delay: 50}});
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
    /*physics: {
      solver: 'repulsion'
    },*/
    /*edges: {
      physics: false
    }*/
  }
  window.network = new vis.Network(container, data, options);

  for(var i = 0; i < allUsers.length; i++) {
    if(allUsers[i]['wallet'] != undefined && allUsers[i]['wallet'] != '') {
      users.update({id: allUsers[i]['wallet'].replace('0x','').replace('-',''), color: "#11CC11", label: allUsers[i]['name'], title: allUsers[i]['name']})
    }
  }

  for(var i = 0; i < allProjects.length; i++) {
    if(allProjects[i]['wallet'] != undefined && allProjects[i]['wallet'] != '') {
      users.update({id: allProjects[i]['wallet'].replace('0x','').replace('-',''), color: "#1111CC", label: allProjects[i]['name'], title: allProjects[i]['name']})
    }
  }

  network.stabilize()
  network.fit()
  network.redraw()
});

