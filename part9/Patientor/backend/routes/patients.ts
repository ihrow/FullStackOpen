import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils/toNewPatient';


const router = express.Router();

router.get('/', (_req, res) => {
    console.log('Fetching patients...');
    res.send(patientsService.getEntries());
});

router.post('/', (req, res) => {
    console.log('Adding patient...');
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientsService.addEntry(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ` Error: ${error.message}`;
        }
        res.status(400).send(errorMessage);
    }

});

export default router;