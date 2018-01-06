module.exports = {
  addUser:{
    email:{
      in:'body',
      notEmpty:{
        errorMessage: 'Empty Email.'
      },
      isEmail: {
        errorMessage:'Invalid Email Address.'
      }
    },
    name:{
      in:'body',
      notEmpty: {
        errorMessage:'Empty Name.'
      },
      isLength: {
        options:[{min:3, max:30}],
        errorMessage:'Invalid Name, Name at least 3 character.'
      }
    },
    password: { 
      in:'body',
      notEmpty: {
        errorMessage:'Empty Password.'
      },
      isLength: {
        options:[{min:8, max:30}]
      },
      matches: {
        options: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        errorMessage:'Invalid Password, Password should be contains at least one uppercase , one lowercase, one numeric, and min 8 character.'
      },
    },
    repassword: {
      in: 'body',
      equals: this.password,
      errorMessage: 'Invalid Repassword, Repassword does not matches.'
    }
  }
}