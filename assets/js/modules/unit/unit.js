// Units Definition & Ratios
const UNIT_DATA = {
    length: {
        m: { name: 'Meter (m)', ratio: 1, label: 'Meters' },
        ft: { name: 'Foot (ft)', ratio: 0.3048, label: 'Feet' },
        in: { name: 'Inch (in)', ratio: 0.0254, label: 'Inches' },
        km: { name: 'Kilometer (km)', ratio: 1000, label: 'Kilometers' },
        mi: { name: 'Mile (mi)', ratio: 1609.344, label: 'Miles' },
        cm: { name: 'Centimeter (cm)', ratio: 0.01, label: 'Centimeters' },
        mm: { name: 'Millimeter (mm)', ratio: 0.001, label: 'Millimeters' },
        yd: { name: 'Yard (yd)', ratio: 0.9144, label: 'Yards' }
    },
    weight: {
        kg: { name: 'Kilogram (kg)', ratio: 1, label: 'Kilograms' },
        lb: { name: 'Pound (lb)', ratio: 0.45359237, label: 'Pounds' },
        g: { name: 'Gram (g)', ratio: 0.001, label: 'Grams' },
        oz: { name: 'Ounce (oz)', ratio: 0.028349523125, label: 'Ounces' },
        mg: { name: 'Milligram (mg)', ratio: 0.000001, label: 'Milligrams' },
        t: { name: 'Metric Ton (t)', ratio: 1000, label: 'Metric Tons' }
    },
    area: {
        sqm: { name: 'Square Meter (m²)', ratio: 1, label: 'Square Meters' },
        sqft: { name: 'Square Foot (ft²)', ratio: 0.092903, label: 'Square Feet' },
        acre: { name: 'Acre (ac)', ratio: 4046.86, label: 'Acres' },
        ha: { name: 'Hectare (ha)', ratio: 10000, label: 'Hectares' },
        sqkm: { name: 'Square Km (km²)', ratio: 1000000, label: 'Square Kilometers' },
        sqmi: { name: 'Square Mile (mi²)', ratio: 2589988.11, label: 'Square Miles' }
    },
    volume: {
        l: { name: 'Liter (L)', ratio: 1, label: 'Liters' },
        ml: { name: 'Milliliter (mL)', ratio: 0.001, label: 'Milliliters' },
        gal: { name: 'Gallon (US)', ratio: 3.78541, label: 'Gallons' },
        c: { name: 'Cup (US)', ratio: 0.236588, label: 'Cups' },
        floz: { name: 'Fluid Ounce (fl oz)', ratio: 0.0295735, label: 'Fluid Ounces' },
        m3: { name: 'Cubic Meter (m³)', ratio: 1000, label: 'Cubic Meters' }
    },
    temperature: {
        c: { name: 'Celsius (°C)', label: 'Celsius' },
        f: { name: 'Fahrenheit (°F)', label: 'Fahrenheit' },
        k: { name: 'Kelvin (K)', label: 'Kelvin' }
    },
    speed: {
        kmh: { name: 'Km / Hour (km/h)', ratio: 1, label: 'Km/h' },
        mph: { name: 'Miles / Hour (mph)', ratio: 1.60934, label: 'mph' },
        ms: { name: 'Meter / Sec (m/s)', ratio: 3.6, label: 'm/s' },
        knot: { name: 'Knot (kn)', ratio: 1.852, label: 'Knots' }
    },
    storage: {
        mb: { name: 'Megabyte (MB)', ratio: 1, label: 'Megabytes' },
        kb: { name: 'Kilobyte (KB)', ratio: 0.001, label: 'Kilobytes' },
        gb: { name: 'Gigabyte (GB)', ratio: 1000, label: 'Gigabytes' },
        tb: { name: 'Terabyte (TB)', ratio: 1000000, label: 'Terabytes' },
        b: { name: 'Byte (B)', ratio: 0.000001, label: 'Bytes' }
    },
    time: {
        s: { name: 'Second (s)', ratio: 1, label: 'Seconds' },
        min: { name: 'Minute (min)', ratio: 60, label: 'Minutes' },
        h: { name: 'Hour (h)', ratio: 3600, label: 'Hours' },
        d: { name: 'Day (d)', ratio: 86400, label: 'Days' },
        wk: { name: 'Week (wk)', ratio: 604800, label: 'Weeks' },
        yr: { name: 'Year (yr)', ratio: 31536000, label: 'Years' }
    },
    pressure: {
        bar: { name: 'Bar', ratio: 1, label: 'Bars' },
        psi: { name: 'PSI (lb/in²)', ratio: 0.0689476, label: 'PSI' },
        pa: { name: 'Pascal (Pa)', ratio: 0.00001, label: 'Pascals' },
        atm: { name: 'Atmosphere (atm)', ratio: 1.01325, label: 'Atmospheres' }
    },
    power: {
        kw: { name: 'Kilowatt (kW)', ratio: 1, label: 'Kilowatts' },
        w: { name: 'Watt (W)', ratio: 0.001, label: 'Watts' },
        hp: { name: 'Horsepower (hp)', ratio: 0.7457, label: 'Horsepower' }
    }
};

// Temperature custom conversion
function convertTemp(val, fromKey, toKey) {
    let baseInC = val;
    if (fromKey === 'f') baseInC = (val - 32) * (5 / 9);
    else if (fromKey === 'k') baseInC = val - 273.15;

    if (toKey === 'c') return baseInC;
    if (toKey === 'f') return (baseInC * 9 / 5) + 32;
    if (toKey === 'k') return baseInC + 273.15;
    return baseInC;
}

export function initUnitConverter() {
    const categoryEl = document.getElementById('unitCategory');
    const fromValEl = document.getElementById('unitFromVal');
    const toValEl = document.getElementById('unitToVal');
    const fromSelectEl = document.getElementById('unitFromSelect');
    const toSelectEl = document.getElementById('unitToSelect');
    const swapBtn = document.getElementById('unitSwapBtn');

    if (!categoryEl || !fromValEl) return;

    function populateSelects(category) {
        const units = UNIT_DATA[category] || UNIT_DATA.length;
        const keys = Object.keys(units);

        fromSelectEl.innerHTML = keys.map(k => `<option value="${k}">${units[k].name}</option>`).join('');
        toSelectEl.innerHTML = keys.map(k => `<option value="${k}">${units[k].name}</option>`).join('');

        if (keys.length > 1) toSelectEl.selectedIndex = 1;
    }

    function updateBreakdown(category, currentVal, currentFromKey) {
        const breakdownEl = document.getElementById('unitResults');
        const units = UNIT_DATA[category];
        if (!breakdownEl || !units) return;

        let html = '';
        for (const key in units) {
            const u = units[key];
            let val = 0;

            if (category === 'temperature') {
                val = convertTemp(currentVal, currentFromKey, key);
            } else {
                const baseVal = currentVal * units[currentFromKey].ratio;
                val = baseVal / u.ratio;
            }

            const formattedVal = Math.abs(val) < 0.01 && val !== 0 ? val.toFixed(6) : val.toFixed(2);
            html += `<div class="flex justify-between items-center border-b border-purple-100/60 dark:border-purple-900/30 pb-1.5 last:border-none">
                <span class="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">${u.label}:</span>
                <span class="font-mono text-slate-900 dark:text-slate-100 font-bold">${formattedVal} ${key}</span>
            </div>`;
        }
        breakdownEl.innerHTML = html;
    }

    function convert(direction = 'from') {
        const category = categoryEl.value;
        const fromKey = fromSelectEl.value;
        const toKey = toSelectEl.value;
        const units = UNIT_DATA[category];

        if (!units || !units[fromKey] || !units[toKey]) return;

        let fromVal = parseFloat(fromValEl.value) || 0;
        let toVal = parseFloat(toValEl.value) || 0;

        if (category === 'temperature') {
            if (direction === 'from') {
                const result = convertTemp(fromVal, fromKey, toKey);
                toValEl.value = Number(result.toFixed(2));
            } else {
                const result = convertTemp(toVal, toKey, fromKey);
                fromValEl.value = Number(result.toFixed(2));
            }
            const formulaEl = document.getElementById('unitFormula');
            if (formulaEl) formulaEl.textContent = `${fromVal} ${units[fromKey].label} = ${toValEl.value} ${units[toKey].label}`;
            updateBreakdown(category, parseFloat(fromValEl.value) || 0, fromKey);
            return;
        }

        if (direction === 'from') {
            const baseVal = fromVal * units[fromKey].ratio;
            const result = baseVal / units[toKey].ratio;
            toValEl.value = Number(result.toFixed(6));
        } else {
            const baseVal = toVal * units[toKey].ratio;
            const result = baseVal / units[fromKey].ratio;
            fromValEl.value = Number(result.toFixed(6));
        }

        // Active Formula
        const ratio = units[fromKey].ratio / units[toKey].ratio;
        const formulaEl = document.getElementById('unitFormula');
        if (formulaEl) {
            formulaEl.textContent = `1 ${units[fromKey].label.slice(0, -1)} = ${ratio.toFixed(6)} ${units[toKey].label}`;
        }

        updateBreakdown(category, parseFloat(fromValEl.value) || 0, fromKey);
    }

    // Attach Event Listeners
    categoryEl.addEventListener('change', (e) => {
        populateSelects(e.target.value);
        convert('from');
    });

    fromValEl.addEventListener('input', () => convert('from'));
    toValEl.addEventListener('input', () => convert('to'));
    fromSelectEl.addEventListener('change', () => convert('from'));
    toSelectEl.addEventListener('change', () => convert('from'));

    swapBtn?.addEventListener('click', () => {
        const temp = fromSelectEl.value;
        fromSelectEl.value = toSelectEl.value;
        toSelectEl.value = temp;
        convert('from');
    });

    // Initialize
    populateSelects(categoryEl.value);
    convert('from');
}
