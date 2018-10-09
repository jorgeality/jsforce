var express = require('express');
var router = express.Router();
var jsforce = require('jsforce');
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:" + (process.env.PORT || '3000'));
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/* GET home page. */
router.get('/home', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/*POST send information */
router.post('/api/sobject', function (req, res) {

  var conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl: 'https://test.salesforce.com'
  });
  /*you need to put here your user and your password to do login */
  conn.login('user@mail.co', 'password', function (err, res) {
    if (err) { return console.error(err); }
    conn.sobject("Contact").create({ LastName: req.body.email, Email: req.body.email }, function (err, ret) {
      if (err || !ret.success) { return console.error(err, ret); }
    });
  });
  res.send('record created');

});
/*POST send information */
router.post('/api/sobject__c', function (req, res) {

  var conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl: 'https://test.salesforce.com'
  });
  /*you need to put here your user and your password to do login */
  conn.login('user@mail.co', 'password', function (err, res) {
    if (err) { return console.error(err); }
    conn.sobject("review__c").create({
      firstName__c: req.body.firstName,
      lastName__c: req.body.lastName,
      phone__c: req.body.phone,
      city__c: req.body.city,
      rateUs__c: req.body.rateUs,
      email__c: req.body.email,
      description__c: req.body.description
    }, function (err, ret) {
      if (err || !ret.success) { return console.error(err, ret); }
    });
  });
  res.send('record created');

});


module.exports = router;
