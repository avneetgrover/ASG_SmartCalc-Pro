export function initUnitConverter() {
    const valInput = document.getElementById('unitVal');
    const typeSelect = document.getElementById('unitType');

    if (!valInput || !typeSelect) return;

    valInput.addEventListener('input', calculate);
    typeSelect.addEventListener('change', calculate);

    calculate();

    function calculate() {
        const val = parseFloat(valInput.value) || 0;
        const type = typeSelect.value;
        const res = document.getElementById('unitResults');

        if (type === 'length') {
            res.innerHTML = `
                <div>• <strong>Meters:</strong> ${val.toFixed(2)} m</div>
                <div>• <strong>Feet:</strong> ${(val * 3.28084).toFixed(2)} ft</div>
                <div>• <strong>Inches:</strong> ${(val * 39.3701).toFixed(2)} in</div>
                <div>• <strong>Kilometers:</strong> ${(val / 1000).toFixed(4)} km</div>
                <div>• <strong>Miles:</strong> ${(val * 0.000621371).toFixed(4)} mi</div>
            `;
        } else {
            res.innerHTML = `
                <div>• <strong>Kilograms:</strong> ${val.toFixed(2)} kg</div>
                <div>• <strong>Pounds:</strong> ${(val * 2.20462).toFixed(2)} lbs</div>
                <div>• <strong>Grams:</strong> ${(val * 1000).toFixed(0)} g</div>
                <div>• <strong>Ounces:</strong> ${(val * 35.274).toFixed(2)} oz</div>
            `;
        }
    }
}