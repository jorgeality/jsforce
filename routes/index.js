var express = require('express');
var router = express.Router();
var jsforce = require('jsforce');

/* Send information to salesforce */
function createContact(lastName, email) {
  var conn = new jsforce.Connection({
      // you can change loginUrl to connect to sandbox or prerelease env.
      loginUrl: 'https://test.salesforce.com'
  });
  /*you need to put here your user and your password to do login */
  conn.login('cgarrett@myhomes.services.preprod', 'Oce@ns11', function (err, res) {
      if (err) { return console.error(err); }
      conn.sobject("Contact").create({ LastName: lastName, Email: email }, function (err, ret) {
          if (err || !ret.success) { return console.error(err, ret); }
          console.log(ret);
          // ...
      });
  });
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'HOME' });
  createContact('jorgeality@testDiacohome.co', 'jorgeality@testDiacohome.co')
});

module.exports = router;
