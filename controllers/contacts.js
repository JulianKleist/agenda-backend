const { response } = require('express');
const Contact = require('../models/contacts');



const getContacts = async(req, res) => {

    const [ contact, total ] = await Promise.all([
        Contact.find({}, 'name lastname phone address img _id'),
        Contact.countDocuments()
    ])

        res.json({
            ok: true,
            contact,
            total
        });

}

const createContacts = async(req, res = response) => {

    const { name, phone } = req.body; 

    try {

        const phoneExists = await Contact.findOne({ phone });

        if( phoneExists ) {
            return res.status(400).json({
                ok: false,
                msg: 'Phone number already exists'
            })
        }
        
        const contact = new Contact( req.body );
        await contact.save();

        res.json({
            ok: true,
            contact
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Unspected error'
        })
    }

}

const updateContacts = async (req, res = response) => {

    const _id = req.params.id;

    try {

        const contactDB = await Contact.findById({ _id });

        if ( !contactDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Contact does not match'
            })
        }

        // Update
        const { phone, ...inputs} = req.body;
        if ( contactDB.phone !== phone ) {

            const phoneExists = await Contact.findOne({ phone });
            if ( phoneExists ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Phone arleady exists'
                })
            }
        }

        inputs.phone = phone;

        const contactUpdated = await Contact.findByIdAndUpdate( _id, inputs, {new: true} );

        res.json({
            ok: true,
            contact: contactUpdated
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unspected error'
        })
    }

}

const deleteContacts = async(req, res = response) => {

    const _id = req.params.id;

    try {

        const contactDB = await Contact.findById({ _id });

        if ( !contactDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Contact does not match'
            })
        }

        await Contact.findByIdAndDelete( _id );

        res.json({
            ok: true,
            msg: 'Contact deleted'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unspected error'
        })
    }

}


module.exports = {
    getContacts,
    createContacts,
    updateContacts,
    deleteContacts
}