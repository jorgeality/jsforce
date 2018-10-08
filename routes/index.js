var express = require('express');
var router = express.Router();
var jsforce = require('jsforce');
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/*POST send information */
router.post('/api/contacts', function (req, res) {
  
  var conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl: 'https://test.salesforce.com'
  });
  /*you need to put here your user and your password to do login */
  conn.login('cgarrett@myhomes.services.preprod', 'Oce@ns11', function (err, res) {
    if (err) { return console.error(err); }
    conn.sobject("Contact").create({ LastName: req.body.email, Email: req.body.email }, function (err, ret) {
      if (err || !ret.success) { return console.error(err, ret); }
      res.send(ret);
    });
  });

  
});


module.exports = router;
