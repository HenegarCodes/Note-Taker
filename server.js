const express = require('express');
const app = express();
const fs = require('fs');
const noteData = require('./db/db.json');
const path = require('path');
const PORT = 3000;




app.use(express.static('public'));

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});


app.get('/api/notes', (req, res) => res.json(noteData));








app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })