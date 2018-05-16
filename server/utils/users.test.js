const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;
    
    beforeEach(() => {
       users = new Users();
       users.users = [{
           id: '1',
           name: 'Joey',
           room: 'Node Course'
       }, {
           id: '2',
           name: 'Jo',
           room: 'React Course'
       }, {
           id: '3',
           name: 'Joy',
           room: 'Node Course'
       }];
    });
    it('should add new user', () => {
       var users = new Users(); 
       var user = {
           id: '1',
           name:'joey',
           room: 'fans'
       };
       var resUser= users.addUser(user.id , user.name, user.room);

       expect(user.users).toEqual([user]);
    });
    it('Should remove user', () => {
        var userId = '1';
        var user = users.removeUser(userId);
        
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });
    it('Should  Not remove user', () => {
          var userId = '66';
          var user = users.removeUser(userId);

          expect(user.id).toNotExist();
          expect(users.users.length).toBe(3);
    });
    it('Should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });
    it('Should Not find user', () => {
        var userId = '33';
        var user = users.getUser(userId);

        expect(user.id).toNotExist();
    });

    it('should return names for node course',() =>{
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual( ['Joey','Joy'] );
    });
     it('should return names for React course', () => {
         var userList = users.getUserList('React Course');
         expect(userList).toEqual(['Jo']);
     });
});