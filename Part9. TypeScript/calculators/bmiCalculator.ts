const calculateBmi = (height: number, weigth: number): string => {
    const bmi = weigth / (height / 100) ** 2;
    if (bmi < 18.5) return 'Underweight (unhealthy weight)';
    if (bmi < 25) return 'Normal (healthy weight)';
    if (bmi < 30) return 'Overweight (unhealthy weight)';
    return 'Obese (unhealthy weight)';
};

interface Values {
    height: number;
    weight: number;
}

const parseArguments = (args: Array<string>): Values => {
    if (args.length < 4) throw new Error("Not enough args");
    if (args.length > 4) throw new Error("Too many args");

    if (isNaN(Number(process.argv[2])) || isNaN(Number(process.argv[3]))) throw new Error("Provided values are not numbers");
    return {
        height: Number(process.argv[2]),
        weight: Number(process.argv[3])
    };
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something Bad Happened';
    if (error instanceof Error) {
        errorMessage += `Error: ${error.message}`;
    }
    console.log(errorMessage);
}

export { calculateBmi };