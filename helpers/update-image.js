const fs = require('fs');
const Contact = require('../models/contacts');

const deleteImages = ( path ) => {
        if ( fs.existsSync( path ) ) {
            fs.unlinkSync( path );
        }
}

const uptadeImages = async( type, id, fileName ) => {

    if ( type === 'contacts' ) {
        const contact = await Contact.findById(id);
        if ( !contact ) {
            console.log('Not found');
            return false;
        }

        const oldPath = `./uploads/contacts/${ contact.img }`;
        deleteImages( oldPath );

        contact.img = fileName;
        await contact.save();
        return true;
    }

}

module.exports = {
    uptadeImages
}