const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { uptadeImages } = require('../helpers/update-image');


const fileUpload = ( req, res = response ) => {

    const type = req.params.type;
    const id = req.params.id;

    const verifyType = ['contacts'];
    if ( !verifyType ) {
        return res.status(400).json({
            ok: false,
            msg: 'Wrong path'
        });
    }

    if ( !req.files || Object.keys(req.files).length === 0 ) {
        return res.status(400).json({
            ok: false,
            msg: 'No file'
        });
    }

    const file = req.files.image;

    const splited = file.name.split('.');
    const fileLenght = splited[ splited.length - 1 ];


    const validExtension = ['png','jpg','jpeg','gif'];
    if ( !validExtension.includes( fileLenght ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No valid extension'
        });
    }

    // Generate name
    const fileName = `${uuidv4() }.${ fileLenght }`;

    const path = `./uploads/${ type }/${ fileName }`;

    //move file
    file.mv( path, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json ({
                ok: false,
                msg: 'Could not move the image'
            });
        }

        // Update DB
        uptadeImages(type, id, fileName);

        res.json({
            ok: true,
            msg: 'File Uploaded!',
            fileName
        });
    });

}


const getImg = ( req, res = response ) => {

    const type = req.params.type;
    const img = req.params.img;

    const pathImg = path.join( __dirname, `../uploads/${ type }/${ img }` );

    // default image
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg` );
        res.sendFile( pathImg );
    }

}


module.exports = {
    fileUpload,
    getImg
}