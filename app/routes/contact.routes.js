const express = require("express");
const contacts = require("../controllers/contact.controller");

module.exports = ( app ) => {
    const router = express.Router();

    //Retrieve all contacts
    router.get("/", contacts.findAll);

    //Create a new contact
    router.post("/", contacts.create);

    //Delete all contacts
    router.delete("/", contacts.deleteAll);

    //Retrieve all favorite contacts
    router.get("/favorite", contacts.findAllFavorite);

    //Retrieve a single contact with id
    router.get("/:id", contacts.findOne);

    //update a contact with id
    router.put("/:id", contacts.update);

    //delete a contact with id
    router.delete("/:id", contacts.delete);

    app.use("/api/contacts", router);

};