const registerUser = (app) => {
  describe('Users API', () => {
    describe('Home', () => {
      it('will get signup text', (done) => {
        app.get('/users').expect(200, {
          'message':'signup'
        }, done);
      });
    });
    // Add User
    describe('Add User', () => {
      describe('Empty Query', () => {
        it('will get error because query was empty.', (done)=>{
          app.post('/users/add').send({
            'email':'',
            'username':'',
            'name':'',
            'password':'',
            'repassword':''
          }).expect(400, done);
        });
      });
      describe('Name', () => {
        describe('Empty Name', () => {
          it('will get error because name was empty.', (done)=>{
            app.post('/users/add').send({
              'email':'example@example.com',
              'username':'user_name',
              'name':'',
              'password':'Password1',
              'repassword':'Password1'
            }).expect(400, done);
          });
        });
        describe('Invalid Name, Min 3 Character', () => {
          it('will get error because name was invalid, Should be more then 3 character.', (done)=>{
            app.post('/users/add').send({
              'email':'example@example.com',
              'username':'user_name',
              'name':'Na',
              'password':'Password1',
              'repassword':'Password1'
            }).expect(400, done);
          });
        });
        describe('Invalid Name, Max 3 Character', () => {
          it('will get error because name was invalid, Should be less then 31 character.', (done)=>{
            app.post('/users/add').send({
              'email':'example@example.com',
              'username':'user_name',
              'name':'Naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
              'password':'Password1',
              'repassword':'Password1'
            }).expect(400, done);
          });
        });
      });
      describe('Email', () => {
        describe('Empty Email', () => {
          it('will get error because email was empty.', (done)=>{
            app.post('/users/add').send({
              'email':'',
              'username':'user_name',
              'name':'example name',
              'password':'Password1',
              'repassword':'Password1'
            }).expect(400, done);
          });
        });
        describe('Invalid Email, Wrong Email Address', () => {
          it('will get error because email was invalid.', (done)=>{
            app.post('/users/add').send({
              'email':'example@example',
              'username':'user_name',
              'name':'example name',
              'password':'Password1',
              'repassword':'Password1'
            }).expect(400, done);
          });
        });
        describe('Well Done', () => {
          it('User Successfully Created.', (done)=>{
            app.post('/users/add').send({
              'email':'kadekgilangputra@gmail.com',
              'username':'user_name1',
              'name':'example name',
              'password':'Password1',
              'repassword':'Password1'
            }).expect(201, done);
          });
        });
        describe('Duplicated Email', () => {
          it('will get error because email was duplicated.', (done)=>{
            app.post('/users/add').send({
              'email':'kadekgilangputra@gmail.com',
              'username':'user_name2',
              'name':'example name',
              'password':'Password1',
              'repassword':'Password1'
            }).expect(400, done);
          });
        });
      });
      describe('User Name', () => {
        describe('Empty User Name', () => {
          it('will get error because user name was empty.', (done)=>{
            app.post('/users/add').send({
              'name':'example name',
              'username': '',
              'email':'example1@example.com',
              'password':'Password1',
              'repassword':'Password1'
            }).expect(400, done);
          });
        });
        describe('Invalid User Name, Wrong User Name', () => {
          it('will get error because user name only allows numeric, string, underscore, minimum 4 and maximum 30 character.', (done)=>{
            app.post('/users/add').send({
              'email':'example1@example.com',
              'username': 'df--',
              'name':'example name',
              'password':'Password1',
              'repassword':'Password1'
            }).expect(400, done);
          });
        });
        describe('Well Done', () => {
          it('User Successfully Created.', (done)=>{
            app.post('/users/add').send({
              'email':'example1@example.com',
              'username':'user_name',
              'name':'example name',
              'password':'Password1',
              'repassword':'Password1'
            }).expect(201, done);
          });
        });
        describe('Duplicated User Name', () => {
          it('will get error because email was duplicated.', (done)=>{
            app.post('/users/add').send({
              'email':'example2@example.com',
              'username':'user_name',
              'name':'example name',
              'password':'Password1',
              'repassword':'Password1'
            }).expect(400, done);
          });
        });
      });
      describe('Password', () => {
        describe('Empty Password', () => {
          it('will get error because password was empty.', (done)=>{
            app.post('/users/add').send({
              'email':'example@example.com',
              'username':'user_name',
              'name':'example name',
              'password':'',
              'repassword':''
            }).expect(400, done);
          });
        });
        describe('Invalid Password', () => {
          it('will get error because password has wrong format. Uppercase, Lowercase, Numeric.', (done)=>{
            app.post('/users/add').send({
              'email':'example@example.com',
              'username':'user_name',
              'name':'example name',
              'password':'asdfa123',
              'password':'asdfa123'
            }).expect(400, done);
          });
        });
      });
    });
  });
};

const listsUsers = (app, expect, should) => {
  describe('Lists Users', () => {
    describe('Public Lists Users',() => {
      it('will get public data lists users as json', (done)=>{
        app.get('/users/lists').end((err,res)=>{
          expect(res.status).to.equal(200);
          expect(res.type).to.equal('application/json');
          done();
        });
      });
    })
  });
};

exports.registerUser = registerUser;
exports.listsUsers = listsUsers;