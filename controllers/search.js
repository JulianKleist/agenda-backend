const { response } = require("express");
const Contact = require('../models/contacts')


const getSearch = async(req, res = response) => {

    const search = req.params.search;
    const regex = new RegExp( search, 'i' )

    const contact = await Contact.find({ name: regex });

    res.json({
        ok: true,
        contact
    })

}

module.exports = {
    getSearch,
}