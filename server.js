const express = require('express');
const path = require('path');

// modules
const { calculateBMI, getBMICategory } = require('./modules/bmiModule');
const { getRecommendation } = require('./modules/recommendationModule');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

//  /assets/styles.css
app.use('/assets', express.static(path.join(__dirname, 'frontend', 'assets')));

// main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'pages', 'main.html'));
});

// result page
app.get('/result', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'pages', 'result.html'));
});

// calculating BMI
app.post('/calculate-bmi', (req, res) => {
    const weight = Number(req.body.weight);
    const heightCm = Number(req.body.height);

    // optional fields
    const fatDensity = Number(req.body.fatDensity) || 0;
    const muscleIndex = Number(req.body.muscleIndex) || 0;

    const bmi = calculateBMI(weight, heightCm);
    const { category, color } = getBMICategory(bmi);

    // My own formulas
    const heightM = heightCm / 100;
    const fatIndex = fatDensity > 0 ? (bmi * fatDensity).toFixed(2) : 'N/A';
    const musclePower = muscleIndex > 0 ? (muscleIndex * heightM).toFixed(2) : 'N/A';

    const rec = getRecommendation(category);

    // redirect to result page
    res.redirect(
        `/result?bmi=${bmi.toFixed(2)}&category=${encodeURIComponent(category)}&color=${encodeURIComponent(color)}` +
        `&fat=${encodeURIComponent(fatIndex)}&muscle=${encodeURIComponent(musclePower)}` +
        `&rec=${encodeURIComponent(rec)}`
    );
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});