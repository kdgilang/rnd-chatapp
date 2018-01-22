module.exports = {
  sendActivation:{
    email:{
      notEmpty:{
        errorMessage: 'Email is required.'
      },
      isEmail: {
        errorMessage:'Invalid Email Address.'
      }
    }
  }
}