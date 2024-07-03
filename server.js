const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const historyModel = require('./models/history');

const app = express();
const port = 3000;

// เชื่อมต่อกับ MongoDB
// mongoose.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ให้บริการไฟล์ static
app.use(express.static(path.join(__dirname, 'public')));

app.post('/saveGame', async (req, res) => {
    const { moves, result } = req.body;

    const newGame = new historyModel({ moves, result });
    await newGame.save();

    res.send('Game saved successfully');
});

app.get('/games', async (req, res) => {
    const games = await historyModel.find();
    res.json(games);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});