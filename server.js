const express = require('express');
const app = express();
const fs = require('fs');
const noteData = require('./Develop/db/db.json');
const path = require('path');
const PORT = 3000;




app.use(express.static(__dirname + 'public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

//sending notes submitted if user accesses the api
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, noteData), "utf8", (error,note) => {
        if(error) {
            return console.log(error)
        }
        res.status(200).json(note)
        })
    });

    



//takes inputted note to the back
app.post('/api/notes', (req, res,) => {
    //new note from user input via save
    const newNote = req.body;
    //gets note data from the note data variable file
    //saves new not with personal id that wont repeat
    fs.readFile(path.join(__dirname, noteData), "utf8", (error,note) => {
        if(error) {
            return console.log(error)
        }
        note = JSON.paarse(note);
    })

    //res.send(JSON.stringify(req.body));
  });




app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })