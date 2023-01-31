import diagnosesData from '../data/diagnoses.json';
import { Diagnose } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const diagnoses: Array<Diagnose> = diagnosesData;

const getEntries = (): Array<Diagnose> => {
    return diagnoses.map(({ code, name, latin }) => ({
        code,
        name,
        latin
    }));
};

const addEntry = () => {
    return diagnoses.map(({ code, name, latin }) => ({
        code,
        name,
        latin
}));
};

export default {
    getEntries,
    addEntry
};

