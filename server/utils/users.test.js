const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  var users;

  beforeEach(()=>{
    users = new Users();

    users.users=  [
      {
        id:'1',
        name: 'John',
        room: 'A'
      },
      {
        id:'2',
        name: 'Anna',
        room: 'A'
      },
      {
        id:'3',
        name: 'Tim',
        room: 'B'
      }
    ];
  });


  it('should add new user', () => {
    var user = {
      id:'123',
      name: 'John',
      room: 'RIP'
    };

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([
      {
        id:'1',
        name: 'John',
        room: 'A'
      },
      {
        id:'2',
        name: 'Anna',
        room: 'A'
      },
      {
        id:'3',
        name: 'Tim',
        room: 'B'
      },
      user
    ]);

  });

  it('should remove user by ID', () => {

    var user = {
      id:'123',
      name: 'John',
      room: 'RIP'
    };

    users.addUser(user.id, user.name, user.room);
    users.removeUser(user.id);

    expect(users.users.length).toEqual(3);

  });

  it('should remove user by ID', () => {

    let res = users.removeUser(444);

    expect(users.users.length).toEqual(3);
    expect(res).toBe(false);
  });

  it('should return user by ID', () => {
    var user = {
      id:'123',
      name: 'John',
      room: 'RIP'
    };

    users.addUser(user.id, user.name, user.room);
    let finedUser = users.getUser(user.id);

    expect(finedUser).toEqual(user);

  });

  it('should not find user', () => {

    var userId = '99';
    let finedUser = users.getUser(userId);
    expect(finedUser).toEqual(undefined);
  });


  it('should return user list  by A room', () => {
    var list = users.getUserList('A');
    expect(list).toEqual(['John', 'Anna']);
  });

  it('should return user list  by B room', () => {
    var list = users.getUserList('B');
    expect(list).toEqual(['Tim']);
  });

  it('should return user empty Array', () => {
    var list = users.getUserList('C');
    expect(list).toEqual([]);
  });

});
