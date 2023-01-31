import { Patient } from "../types";

const parseName = (name: unknown): string => {
    if (!name || (typeof name !== 'string')) {
        throw new Error(`Incorrect or missing name: ${name}`);
    }
    return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || (typeof dateOfBirth !== 'string')) {
        throw new Error(`Incorrect or missing dateOfBirth: ${dateOfBirth}`);
    }
    return dateOfBirth;
};

const parseGender = (gender: unknown): string => {
    if (!gender || (typeof gender !== 'string')) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || (typeof occupation !== 'string')) {
        throw new Error(`Incorrect or missing occupation: ${occupation}`);
    }
    return occupation;
};

type Fields = { name: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, gender, occupation }: Fields): Patient => {
    const newPatientEntry: Patient = {
      id: Math.random().toString(36).substring(7),  
      name: parseName(name),
      dateOfBirth: parseDateOfBirth(dateOfBirth),
      gender: parseGender(gender),
      occupation: parseOccupation(occupation)
    };

    return newPatientEntry;
  };

export default toNewPatientEntry;