module.exports = {
  'add':{
    'email':{
      'in':'body',
      'notEmpty':true,
      'isEmail': true,
      'errorMessage':'Invalid Email'
    },
    'name':{
      'in':'body',
      'notEmpty':true,
      'isLength': {
        'options':[{'min':3, 'max':30}]
      },
      'errorMessage':'Invalid Name'
    },
    'password': {
        'in':'body',
        'notEmpty':true,
        'isLength': {
        'options':[{'min':8, 'max':100}]
      },
    }
  }
}