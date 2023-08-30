const express = require("express");
const router = express();
const uuid = require("uuid");
const fs = require("fs");

router.use(express.json());

router.get('/api/notes', (req, res) => {
    const db = fs.readFileSync('./db/db.json', 'utf-8');
    res.json(JSON.parse(db));
});

router.post('/api/notes', (req, res) => {
    const dbPath = './db/db.json';
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    db = JSON.parse(db);
    res.json(db);

    const userNote = {
        id: uuid(),
        title: req.body.title,
        text: req.body.text,
    };

    db.push(userNote);
    fs.writeFileSync('/db/db.json', JSON.stringify(db));
    res.json(db);
});
