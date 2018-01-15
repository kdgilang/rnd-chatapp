module.exports = {
  addUser:{
    name:{
      in:'body',
      notEmpty: {
        errorMessage:'Name is required.'
      },
      isLength: {
        options:[{min:3, max:30}],
        errorMessage:'Invalid Name, Name at least 3 character.'
      }
    },
    email:{
      in:'body',
      notEmpty:{
        errorMessage: 'Email is required.'
      },
      isEmail: {
        errorMessage:'Invalid Email Address.'
      }
    },
    password: {
      in:'body',
      notEmpty: {
        errorMessage:'Password is required.'
      },
      isLength: {
        options:[{min:8, max:30}]
      },
      matches: {
        options: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
      },
      errorMessage:'Invalid Password, Password should be contains at least one uppercase , one lowercase, one numeric, and min 8 character.'
    }
  },
  authUser:{
    email:{
      notEmpty:{
        errorMessage: 'Email is required.'
      },
      isEmail: {
        errorMessage:'Invalid Email Address.'
      }
    },
    password: {
      notEmpty: {
        errorMessage:'Password is required.'
      }
    }
  }
}