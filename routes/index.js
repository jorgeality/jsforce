var express = require('express');
var router = express.Router();
var jsforce = require('jsforce');

/* Send information to salesforce */
function createContact(lastName, email) {
  var res;
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
      res = ret;
      // ...
    });
  });
  return res;
}


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/*POST send information */
router.post('/contacts', function (req, res, next) {
  var resp = createContact(req.Email, req.Email);
  res.send(resp);
})


module.exports = router;
