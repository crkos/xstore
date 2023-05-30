const { createPersonal, updatePersonal, deletePersonal, getPersonal, getAllPersonal, loginPersonal} = require('../controllers/personal');
const {validatePersonal, validate} = require("../middlewares/validator");
const {isAuth, isAuthorized} = require("../middlewares/auth");

const router = require('express').Router();

router.post('/',isAuth, isAuthorized, validatePersonal, validate, createPersonal);

router.patch('/:personalId' ,isAuth, isAuthorized, validatePersonal, validate, updatePersonal);

router.delete('/:personalId',isAuth, isAuthorized, deletePersonal);

router.get('/:personalId',isAuth, isAuthorized, getPersonal);

router.get('/',isAuth, isAuthorized, getAllPersonal);

router.post('/login', loginPersonal);

module.exports = router;