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


app.get('/api/notes', (req, res) => {
    res.status(200).json(noteData);
});



app.post('/api/notes', function (req, res, ) {
    res.send(JSON.stringify(req.body));
  });




app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })