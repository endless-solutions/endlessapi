var INSTAKEY = process.env.INSTAKEY || '';
var INSTATOKEN = process.env.INSTATOKEN || '';
var INSTASALT = process.env.INSTASALT || '';

module.exports.instaData = {
  key: INSTAKEY,
  token: INSTATOKEN,
  salt: INSTASALT
};
