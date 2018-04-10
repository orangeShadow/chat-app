class Users {

  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
  }

  removeUser(id) {

    let index = this.users.findIndex((item)=>{
      return item.id===id;
    });

    if(index >= 0) {
      this.users.splice(index, 1);
      return true;
    }

    return false;
  }

  getUser(id){
    return  this.users.find(item => item.id===id);
  }

  getUserList(room){
    return  this.users.filter(item => item.room===room).map(item => item.name);
  }

}

module.exports = {Users};

//AddUser(id,name,room)
//remvoeUser(id)
//getUser(id)
//getUserList
