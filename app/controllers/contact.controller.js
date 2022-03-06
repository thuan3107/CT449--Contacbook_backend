const { BadRequestError } = require("../errors");
const mongoose = require("mongoose");
const handlePromise = require("../helpers/promise.helper");
const Contact = require("../models/Contact.model");

// exports.create = (req, res) => {
//     res.send({ message: "create handler" });
// };

//create and Save a new Contact
exports.create = async (req, res, next) => {
    // Validate request
    if (!req.body.name) {
        return next(new BadRequestError(400, "Name can not be empty"));
    }

    // Create a contact 
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        favorite: req.body.favorite === true,
    });

    // Save contact in the database
    const [error, document] = await handlePromise(contact.save());

    if (error) {
        return next (new BadRequestError(500, 
            "An error occurred while creating the contact"));
    }

    return res.send(document);
};

//retrieve all contacts of a user from the database
exports.findAll = async (req, res, next) => {
 //   res.send({ message: "findAll handler" });
    const condition = { };
    const { name } = req.query;
    if (name){
         condition.name = { $regex: new RegExp(name), $option: "i" };
    }
    const [error, documents] = await handlePromise(Contact.find(condition));

    if (error) {
         return next(new BadRequestError(500, 
            "An error occurred while retrieving contacts"));
    }
 return res.send(documents);
};



// Find a single contact with an id
exports.findOne = async (req, res, next) => {
    const { id } = req.params;
    const conditon = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
  //  res.send({ message: "findOne handler"});
    
    const [error, document] = await handlePromise(Contact.findOne(conditon));

    if (error){
        return next(new BadRequestError(500,
            `Error retrieving contact with id=${req.params.id}`));
    }
    if(!document){
        return next(new BadRequestError(404, "Contact not found"));
    }
    return res.send(document);

};




exports.update = async (req, res, next) => {
    // res.send({ message: "update handler" });
    if (Object.keys(req.body).length === 0){
        return next (new BadRequestError(400,
            "Data to update can not be empty"));
    }

    const { id } = req.params;
    const conditon = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
  
    const [error, document] = await handlePromise(
        Contact.findOneAndUpdate(conditon, req.body, {
            new: true,
        })
    );

    if (error){
        return next(new BadRequestError(500,
            `Error updating contact with id=${req.params.id}`));
    }

    if(!document){
        return next(new BadRequestError(404, "Contact not found"));
    }
    return res.send({ message: "Contact was updated successfully", });
};



// Delete a contact with the specified id in the request
exports.delete = async (req, res, next) => {
    const { id } = req.params;
    const conditon = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
        //res.send({ message: "delete handler" });    
    const [error, document] = await handlePromise(
        Contact.findOneAndDelete(conditon)
    );

    if (error){
        return next(new BadRequestError(500,
            `Error not delete contact with id=${req.params.id}`));
    }
    if(!document){
        return next(new BadRequestError(404, "Contact not found"));
    }
    return res.send({ message: "Contact was deleted successfully", });
};



exports.deleteAll = async (req, res, next ) => {
   // res.send({ message: "deleteAll handler" });
   const [error , data] = await handlePromise(
       Contact.deleteMany({ })
   );

   if (error){
       return next(new BadRequestError(500,
            "An error occurred while removing all contacts"));
   }
   
   return res.send({
       message: `${data.deletedCount} contact were deleted successfully`,
   });
};


//Find all favorite contacts of a user
exports.findAllFavorite = async (req, res, next) => {
   // res.send({ message: "findAllFavorite handler" });
   const [error, document] = await handlePromise(
        Contact.find({ favorite: true, })
    );

    if (error){
        return next(new BadRequestError(500,
            "An error occurred while retrieving favorite contacts"));
    }
    return res.send(document);
};



