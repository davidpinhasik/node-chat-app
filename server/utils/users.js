class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    // return user that was removed
    var foundUsers = this.users.filter((user) => user.id === id);
    var newUsers = this.users.filter((user) => user.id !== id);
    if (newUsers.length != this.users.length) {
      this.users = newUsers;
      return foundUsers[0];
    } else {
      return null;
    }
  }
  getUser (id) {
    var foundUsers = this.users.filter((user) => user.id === id);
    if (foundUsers.length == 1) {
      return foundUsers[0];
    }
  }
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);
    return namesArray;
  }

}

module.exports = {Users};

// addUser(id, name, room
// removeUser(id)
// getUser(id)
// getUserList(room)

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s)  old.`;
//   }
// }
//
// var me = new Person('David', 55);
// console.log('this.name: ', me.name);
// console.log('this.age: ', me.age);
// var description = me.getUserDescription();
// console.log(description);
