/*
    Path: /api/contacts
*/

const { Router } = require('express');
const { getContacts, createContacts, updateContacts, deleteContacts } = require('../controllers/contacts');
const { check } = require('express-validator');
const { validateInputs } = require('../middlewares/validate-inputs');

const router = Router();

// Rutas
router.get( '/', getContacts);

router.post( '/', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('phone', 'Phone number is required').not().isEmpty(),
        validateInputs
    ],
    createContacts);

router.put( '/:id', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('phone', 'Phone number is required').not().isEmpty(),
        validateInputs
    ],
    updateContacts);

router.delete( '/:id', deleteContacts);



module.exports = router;