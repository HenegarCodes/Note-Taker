const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const api = require('./Develop/public/assets/js/index.js');



app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

//sending notes submitted if user accesses the api
app.get('*', (req, res) => 
    fs.readFile(path.join(__dirname, './Develop/db/db.json')

));





//takes inputted note to the back
app.post('/api/notes', (req, res,) => {
    //new note from user input via save
    const newNote = req.body;
    //gets note data from the note data variable file
    //saves new not with personal id that wont repeat
    fs.readFile(path.join(__dirname, './Develop/db/db.json'), "utf8", (error, note) => {
        if (error) {
            return console.log(error)
        }
        note = JSON.paarse(note);
        //will do an i statement for array so it gets assigned to 11 or something random
        if (note.length > 0) {
            let finalID = note[note.length - 1].identifier
            var identifier = parseInt(finalID) + 1
        }
        else {
            var identifier = 69;
        }
        //creates object for current note that user is on
        let currentNote = {
            title: newNote.title,
            text: newNote.text,
            identifier: identifier
        }
        //note just submitted gets added to the notes array with the title, text adn idenmtifier
        var currentNoteArray = note.concat(currentNote)
        fs.writeFile(path.join(__dirname, './Develop/db/db.json'), JSON.stringify(currentNoteArray), (error, data) => {
            if (error) {
                return error
            }
            console.log(currentNoteArray)
            res.json(currentNoteArray);
        })
    });

});



app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})