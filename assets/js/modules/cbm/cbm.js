export function initCbmCalculator() {
    const inputs = ['cbmL', 'cbmW', 'cbmH', 'cbmQty'].map(id => document.getElementById(id));

    inputs.forEach(input => {
        if (input) input.addEventListener('input', calculate);
    });

    calculate();

    function calculate() {
        const [l, w, h, qty] = inputs.map(i => parseFloat(i?.value) || 0);

        const singleCBM = (l * w * h) / 1000000;
        const totalCBM = singleCBM * qty;

        document.getElementById('cbmResult').textContent = `${totalCBM.toFixed(3)} m³`;
        document.getElementById('cbmWeightResult').innerHTML = `
            <div>Volumetric Air Freight Weight: <strong>${(totalCBM * 167).toFixed(1)} kg</strong></div>
            <div>Volumetric Express Courier Weight: <strong>${(totalCBM * 200).toFixed(1)} kg</strong></div>
        `;
    }
}