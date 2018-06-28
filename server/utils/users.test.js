const expect = require('expect');

// imprt isRealString
var {Users} = require('./users');

// isRealString
  // should reject non string values
  // should reject strings with only spaces
  // should allow strings with non space characters




  describe('Users', () => {
    var users;
    beforeEach(() => {
      users = new Users();
      users.users = [{
        id: '1',
        name: 'Mike',
        room: 'Node Course'
      }, {
        id: '2',
        name: 'Jen',
        room: 'React Course'
      }, {
        id: '3',
        name: 'Julie',
        room: 'Node Course'
      }]


    });

    it('should add new user', () => {
      var users = new Users();
      var user = {
        id: '123',
        name: 'David',
        room: 'Some Room Name'
      };
      var resUser = users.addUser(user.id, user.name, user.room);
      expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
      var removedUser = users.removeUser('1');

      expect(removedUser).toEqual({
        id: '1',
        name: 'Mike',
        room: 'Node Course'
      });
      expect(users.users.length == 2);
    });

    it('should not remove a user', () => {
      var removedUser = users.removeUser('4');

      expect(removedUser).toBeNull();
      expect(users.users.length == 3);
    });

    it('should find user', () => {
      var foundUser = users.getUser('1');

      expect(foundUser === {
        id: '1',
        name: 'Mike',
        room: 'Node Course'
      });
    });

    it('should not find user', () => {
      var foundUser = users.getUser('4');

      expect(foundUser).toBeUndefined();
    });

    it('should return names for node course', () => {
      var userList = users.getUserList('Node Course');

      expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for react course', () => {
      var userList = users.getUserList('React Course');

      expect(userList).toEqual(['Jen']);
    });


  });
