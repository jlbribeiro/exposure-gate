let Fs = require("fs");

const DEFAULT_AVATAR_URL = "";

class Projects {
  constructor() {
    let projects = JSON.parse(
      Fs.readFileSync("data/projects.json", "UTF-8", "r")
    );

    this.projectByWallet = {};
    for (let i = 0; i < projects.length; i++) {
      let project = projects[i];

      if (project.wallet === "") {
        continue;
      }

      let users = [];
      for (let j = 0; j < project.users.length; j++) {
        let user = project.users[j];
        console.log(user);
        users.push({
          username: user.user,
          avatar_url: user.avatar_url
        });
      }

      this.projectByWallet[project.wallet.toLowerCase()] = {
        name: project.name,
        avatar_url: project.image,
        users: users
      };
    }
  }

  getByAddress(address) {
    if (!this.projectByWallet[address]) {
      return null;
    }

    return this.projectByWallet[address];
  }
}

module.exports = Projects;
