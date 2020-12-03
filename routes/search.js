/*
    path: api/contacts
*/

const { Router } = require('express');
const { getSearch } = require('../controllers/search');
const router = Router();

router.get('/:search', getSearch)


module.exports = router;