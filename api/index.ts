import { configDotenv } from 'dotenv';
import express from 'express';
import usersTable from '../db/table/usersTable';
import cors from 'cors';
import moviesTable from '../db/table/moviesTable';


configDotenv();

console.log("little test");

const app = express();
const port = 3001;

app.use(cors())

app.get('/', async (req, res) => {
    const bestViewer = await usersTable.getBestViewer();

    res.json({ bestViewer: bestViewer[0] });
});


app.get('/never-watched', async (req, res) => {
    const neverWatched = await moviesTable.getNeverViewedMovies();

    res.json({ neverWatched });
});

app.listen(port, () => console.log(`Server ready on port ${port}.`));

module.exports = app;
