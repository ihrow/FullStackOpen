type Operation = 'add' | 'subtract' | 'multiply' | 'divide' | 'remainder';

const calculate = (a: number, b: number, op: Operation): number => {
    switch (op) {
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'multiply':
            return a * b;
        case 'divide':
            return a / b;
        case 'remainder':
            return a % b;
        default:
            throw new Error('Invalid operation');
    }
};

export { calculate as calculator };