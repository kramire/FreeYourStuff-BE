const router = require('koa-router')();
const stuffControllers = require('./controllers/stuffControllers');

router.get('/getStuff', stuffControllers.getAll)
  .post('/create', stuffControllers.create)
  .put('/update/:id', stuffControllers.update)
  .delete('/delete/:id', stuffControllers.delete);

module.exports = router;
