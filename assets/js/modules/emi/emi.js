export function initEmiCalculator() {
    const amtInput = document.getElementById('emiAmount');
    const rateInput = document.getElementById('emiRate');
    const tenureInput = document.getElementById('emiTenure');

    if (!amtInput) return;

    let chartInstance = null;

    [amtInput, rateInput, tenureInput].forEach(inp => inp.addEventListener('input', calculate));
    calculate();

    function calculate() {
        const P = parseFloat(amtInput.value) || 0;
        const R = (parseFloat(rateInput.value) || 0) / 12 / 100;
        const N = (parseFloat(tenureInput.value) || 0) * 12;

        if (P <= 0 || R <= 0 || N <= 0) return;

        const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
        const totalPayable = emi * N;
        const totalInterest = totalPayable - P;

        document.getElementById('emiOutput').textContent = `$${emi.toFixed(0)}`;
        document.getElementById('emiPrincipalText').textContent = `$${P.toLocaleString()}`;
        document.getElementById('emiInterestText').textContent = `$${totalInterest.toLocaleString('en-US', {maximumFractionDigits: 0})}`;
        document.getElementById('emiTotalText').textContent = `$${totalPayable.toLocaleString('en-US', {maximumFractionDigits: 0})}`;

        updateChart(P, totalInterest);
    }

    function updateChart(principal, interest) {
        const ctx = document.getElementById('emiChart')?.getContext('2d');
        if (!ctx) return;

        if (chartInstance) chartInstance.destroy();

        chartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Principal', 'Interest'],
                datasets: [{
                    data: [principal, interest],
                    backgroundColor: ['#6366f1', '#ec4899'],
                    borderWidth: 0
                }]
            },
            options: {
                plugins: { legend: { display: false } },
                cutout: '75%',
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}