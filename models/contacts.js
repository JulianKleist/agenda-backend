const { Schema, model } = require('mongoose');

const ContactSchema = Schema({

    name: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
    },
    phone: {
        type: String,
        require: true
    },
    address: {
        type: String,
    },
    img: {
        type: String
    }

});

ContactSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();
    return object;
})



module.exports = model( 'Contact', ContactSchema );
