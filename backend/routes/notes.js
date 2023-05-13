const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const { useState } = require("react");

//ROUTE 1 : GET LOGGED IN USER DETAILS using: GET"/api/notes/fetchallnotes"  require login

router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const note = await Note.find({ user: req.user.id });
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal Server error occured");
  }
});

//ROUTE 2 : ADD NOTES using: GET"/api/notes/addnote"  require login

router.post(
  "/addnote",
  fetchUser,
  [
    // name must be at least 5 chars long
    body("title", "ENTER A VALID TITLE").isLength({ min: 3 }),

    // password must be at least 5 chars long
    body("description", "DESCRIPTION IS TOO SHORT").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // if there are errors then return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal Server error occured");
    }
  }
);

//ROUTE 3 : UPDATE NOTES using: PUT"/api/notes/updatenote"  require login

router.put(
  "/updatenote/:id",fetchUser,async (req, res) => {
    
    try {
        //destructuring
    const { title, description, tag } = req.body;

    //create a newNote object
    const newNote ={};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};
    
    let note = await Note.findById(req.params.id); // find the note and retrieving the note id
    
    if(!note){return res.status(404).send("Note not found")}//if note not exists
    
    // checking is user updating only his notes by comparing id
    if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")} 
    
     // updating note after all the checks
     note = await Note.findByIdAndUpdate(req.params.id , {$set: newNote } ,{new:true});

     res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal Server error occured");
    }
  }
);

//ROUTE 4 : DELETE NOTES using: DELETE"/api/notes/deletenotE"  require login

router.delete(
    "/deletenote/:id",fetchUser,async (req, res) => {
      
      try {
         
      let note = await Note.findById(req.params.id); // find the note and retrieving the note id
      
      if(!note){return res.status(404).send("Note not found")}//if note not exists
      
      // checking is user updating only his notes by comparing id
      if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")} 
      
       // updating note after all the checks
       note = await Note.findByIdAndDelete(req.params.id);
  
       res.json({Success: "NOTE HAS BEEN DELETED"});
      } catch (error) {
          console.error(error.message);
          res.status(500).send("internal Server error occured");
      }
    }
  );

  //ROUTE 5 : TAG SEARCH using: GET"/api/notes/fetchallnotes"  require login

router.put("/searchtag", fetchUser,async (req, res) => {
  try {
    //destructuring
    const { tag } = req.body;
    //create a newNote object
    const newNote ={};
    if(tag){newNote.tag = tag};

    const note = await Note.find({user:req.user.id , tag:`${newNote.tag}`  });
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal Server error occured");
  }
});
module.exports = router;
