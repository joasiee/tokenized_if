import express from 'express';

const port = parseInt(process.env.PORT) || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('App works'));

app.listen(port, () => console.log(`App listening on port ${port}`));
