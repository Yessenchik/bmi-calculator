function calculateBMI(weight, heightCm) {
    const heightM = heightCm / 100;
    return weight / (heightM * heightM);
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return { category: 'Underweight', color: 'blue' };
    if (bmi < 24.9) return { category: 'Normal', color: 'green' };
    if (bmi < 29.9) return { category: 'Overweight', color: 'orange' };
    return { category: 'Obese', color: 'red' };
}

module.exports = { calculateBMI, getBMICategory };