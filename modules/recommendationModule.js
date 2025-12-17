const recommendations = {
    Underweight: 'Loser! Eat more calories and improve nutrition.',
    Normal: 'Keep going',
    Overweight: 'More action',
    Obese: 'Consult a doctor'
};

function getRecommendation(category) {
    return recommendations[category] || '';
}

module.exports = { getRecommendation };