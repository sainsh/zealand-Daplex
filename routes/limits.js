var express = require('express');
var router = express.Router();

/* GET Limit-UI page. */
router.get('/', function(req, res, next) {
  res.render('limitsFrontpage');
});

/**router.get('/helpdesk', function(req, res, next){

}); */

module.exports = router;