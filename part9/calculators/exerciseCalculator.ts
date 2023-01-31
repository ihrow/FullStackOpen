interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface ExerciseValues {
    daily_exercises: Array<number>;
    target: number;
}

const calculateExercises = (daily_exercises: Array<number>, target: number): Result => {
    const periodLength = daily_exercises.length;
    const trainingDays = daily_exercises.filter(day => day != 0).length;
    const average = daily_exercises.reduce((a, b) => a + b, 0) / periodLength;
    const success = average >= target;
    const rating = success ? 3 : average >= target / 2 ? 2 : 1;
    const ratingDescription = rating === 3 ? 'Great job!' : rating === 2 ? 'Not too bad but could be better' : 'You should try harder';

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};


const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
    if (args.length < 4) throw new Error("Not enough args");
    if (isNaN(Number(args[2]))) throw new Error("Provided values are not numbers");
    if (isNaN(Number(process.argv[2])) || isNaN(Number(process.argv[3]))) throw new Error("Provided values are not numbers");
    return {
        daily_exercises: process.argv.slice(3).map(Number),
        target: Number(process.argv[2])
    };
};

try {
    const { daily_exercises, target } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(daily_exercises, target));
} catch (error: unknown) {
    let errorMessage = 'Something Bad Happened';
    if (error instanceof Error) {
        errorMessage += `Error: ${error.message}`;
    }
    console.log(errorMessage);
}

export { calculateExercises as exercisesCalculator };