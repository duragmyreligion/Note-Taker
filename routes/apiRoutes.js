const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const fs = require("fs");

router.use(express.json());

router.get('/api/notes', (req, res) => {
    try {
        const db = fs.readFileSync('./db/db.json');
        res.json(JSON.parse(db));
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching notes.' });
    }
});

router.post('/api/notes', (req, res) => {
    try {
        console.log('Received POST request with body:', req.body);

    const dbPath = './db/db.json';
    let db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const userNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text,
    };

    db.push(userNote);
    fs.writeFileSync(dbPath, JSON.stringify(db));

    res.json(db); // Send the updated db object as a JSON response
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'An error occurred while fetching notes.' });
    } 
});;

module.exports = router;