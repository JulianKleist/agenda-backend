/*
    path: api/upload
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload, getImg } = require('../controllers/uploads');
const router = Router();

router.use( expressFileUpload() );

router.put( '/:type/:id', fileUpload );

router.get( '/:type/:img', getImg );


module.exports = router;