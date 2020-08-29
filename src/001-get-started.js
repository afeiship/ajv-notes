var Ajv = require('ajv');
var localize = require('ajv-i18n');

var schema = {
  type: 'object',
  required: ['username', 'email', 'password'],
  properties: {
    username: {
      type: 'string',
      minLength: 4
    },
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string',
      minLength: 6
    },
    age: {
      type: 'integer',
      minimum: 0
    },
    sex: {
      enum: ['boy', 'girl', 'secret'],
      default: 'secret'
    }
  }
};

var data = {
  username: 'abcd',
  email: 213,
  password: '12313'
};

var ajv = new Ajv();
var validate = ajv.compile(schema);

var valid = validate(data);

console.log('validate:::', validate);

if (!valid) {
  // ru for Russian
  localize.zh(validate.errors);
  // string with all errors and data paths
  console.log(ajv.errorsText(validate.errors, { separator: '\n' }));
}
