/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var https = require('https');

module.exports = {
  schoolrecieve: function(req,res){
    if(req.param("status") == "success"){
      var options = {
        host : 'www.instamojo.com',
        path : '/api/1.1/payments/'+req.param("payment_id")+'/',
        headers : {'X-Auth-Token':sails.config.instaData.token,'X-Api-Key':sails.config.instaData.key},
        method : 'GET'
      };
      var getReq = https.request(options,function(ret){
        //console.log("statusCode: ", ret.statusCode);
        //console.log("headers: ",ret.headers);
        ret.on('data',function(d){
          res.send(d);
        });
      });
      getReq.end();
      getReq.on('error', function(e) {
        res.send(e);
      });
    }
  }
};
