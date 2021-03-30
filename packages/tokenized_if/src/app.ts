import express from 'express';
import apiRouter from './routes';

const port = parseInt(process.env.PORT) || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('App works'));
app.use('/api', apiRouter);

app.listen(port, () => console.log(`App listening on port ${port}`));
