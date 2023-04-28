const { createPersonal, updatePersonal, deletePersonal, getPersonal, getAllPersonal} = require('../controllers/personal');
const {validatePersonal, validate} = require("../middlewares/validator");

const router = require('express').Router();

router.post('/', validatePersonal, validate, createPersonal);

router.patch('/:personalId', validatePersonal, validate, updatePersonal);

router.delete('/:personalId', deletePersonal);

router.get('/:personalId', getPersonal);

router.get('/', getAllPersonal);

module.exports = router;