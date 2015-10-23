/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    schema: true,
    attributes: {
        username: {
            type: 'string',
            required: true,
            unique: true,
            alphanumericdashed: true
        },
        password: {
            type: 'string'
        },
        email: {
            type: 'email',
            required: true,
            unique: true
        },
        isVerifiedSchool:{
          type: 'boolean',
          defaultsTo: false
        },

        toJSON: function () {
            var obj = this.toObject();
            delete obj.password;
            delete obj.socialProfiles;
            return obj;
        }
    },
    beforeUpdate: function (values, next) {
        CipherService.hashPassword(values);
        next();
    },
    beforeCreate: function (values, next) {
        CipherService.hashPassword(values);
        next();
    }
};
