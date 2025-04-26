import express = require('express');
import cors = require('cors');
import bodyParser = require('body-parser');
import { configDotenv } from 'dotenv';
import usersTable from '../db/table/usersTable';
import moviesTable from '../db/table/moviesTable';
import commentsTable from '../db/table/commentsTable';



configDotenv();

const app = express();
const port = 3201;

app.use(cors())
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    const bestViewer = await usersTable.getBestViewer();

    res.json({ bestViewer: bestViewer[0] });
});


app.get('/never-watched', async (req, res) => {
    const neverWatched = await moviesTable.getNeverViewedMovies();

    res.json({ neverWatched });
});

app.get('/comments', async (req, res) => {
    const comments = await commentsTable.getAll();

    res.json({ comments });
});

app.post('/comment/update', async (req, res) => {
    const params = req.body;

    if (params.id && params.rating) {
        await commentsTable.updateRating(params.id, params.rating);
    }

    res.json({});
});

app.post('/comment/delete', async (req, res) => {
    const params = req.body;

    console.log(params);

    if (params.id) {
        await commentsTable.deleteComment(params.id);
    }

    res.json({});
});

app.listen(port, () => console.log(`Server ready on port ${port}.`));

module.exports = app;
