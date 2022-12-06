import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculator } from './calculator';
const app = express();

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
        res.status(400).send({ error: 'malformatted parameters' });
    }
    const bmi = calculateBmi(height, weight);
    res.send({
        weight,
        height,
        bmi
    });
});

app.post('/calculator', (req, res) => {
    const { value1, value2, op } = req.body;
    
    const result = calculator(value1, value2, op);
    res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});