const {Router} = require('express');
const authControllers = require('../controllers/Auth.controller');
const router = Router();

router.post('/signUp', authControllers.signUp);
router.post('/signIn', authControllers.signIn);



module.exports = router;