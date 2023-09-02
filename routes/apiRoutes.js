const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

router.use(express.json());

router.get('/api/notes', (req, res) => {
    try {
        const dbPath = path.join(__dirname, './db/db.json');
        const db = fs.readFileSync(dbPath, 'utf-8');
        res.json(JSON.parse(db));
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching notes.' });
    }
});

router.post('/api/notes', (req, res) => {
    try {
        console.log('Received POST request with body:', req.body);

        const dbPath = path.join(__dirname, './db/db.json'); 
        let db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

        const userNote = {
            id: uuid.v4(),
            title: req.body.title,
            text: req.body.text,
        };

        db.push(userNote);
        fs.writeFileSync(dbPath, JSON.stringify(db));

        res.json(db); 
    } catch (error) {
        console.error('Error in POST request:', error);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
        response.text().then(text => console.log(text));
    }
});

module.exports = router;