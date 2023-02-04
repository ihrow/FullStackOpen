import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculator } from './calculator';
import { exercisesCalculator } from './exerciseCalculator';
const app = express();

app.use(express.json());

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
    bmi,
  });
});

app.get('/calculator', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;
  if (!value1 || !value2 || !op) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
  if (isNaN(Number(value1)) || isNaN(Number(value2))) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(Number(value1), Number(value2), op);
  res.send(result);
});

app.post('/exercisesCalculator', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const daily_exercises: Array<number> = req.body.daily_exercises;
  console.log('%cindex.ts line:46 daily_exercises', 'color: #007acc;', daily_exercises);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const target = req.body.target;
  console.log('%cindex.ts line:49 target', 'color: #007acc;', target);
  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'parameters missing' });
  }
  if (isNaN(Number(target))) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = exercisesCalculator(daily_exercises, Number(target));
  res.send(result); 
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
