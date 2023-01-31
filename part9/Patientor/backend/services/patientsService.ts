import patientsData from '../data/patients.json';
import { Patient } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const patients: Array<Patient> = patientsData;

const getEntries = (): Array<Patient> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender, 
        occupation
    }));
};

const addEntry = ( entry: Patient ): Patient => {
    const newPatientEntry = {
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    addEntry
};
