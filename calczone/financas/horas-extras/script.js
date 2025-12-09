document.addEventListener('DOMContentLoaded', function() {
    // Setup eventos do formulário
    document.getElementById('periodoForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        calcularPeriodo();
    });

    // Cálculo em tempo real
    setupRealTimeCalculation('#periodoForm input[type="number"]', calcularPeriodo, 300);
});

// ============= CÁLCULO: PERÍODO COMPLETO =============
function calcularPeriodo() {
    const salario = safeParseFloat(document.getElementById('salarioPeriodo').value);
    const horasNormais = safeParseFloat(document.getElementById('horasNormaisPeriodo').value);
    const horas50 = safeParseFloat(document.getElementById('horas50Periodo').value);
    const horas100 = safeParseFloat(document.getElementById('horas100Periodo').value);

    if (salario === 0) {
        document.getElementById('resultPeriodo').classList.add('hidden');
        return;
    }

    try {
        // Calcular valor da hora (160 horas/mês)
        const valorHora = salario / 160;

        // Calcular os totais
        const valorNormais = valorHora * horasNormais;
        const valor50 = valorHora * (1 + 0.5) * horas50;
        const valor100 = valorHora * (1 + 1) * horas100;
        const totalExtras = valor50 + valor100;
        const totalGeral = valorNormais + totalExtras;

        const html = `
            <div class="result-summary">
                <div class="summary-card">
                    <label>Valor da Hora</label>
                    <value>${formatCurrency(valorHora)}</value>
                </div>
                <div class="summary-card">
                    <label>Total Horas Normais</label>
                    <value>${formatCurrency(valorNormais)}</value>
                </div>
                <div class="summary-card">
                    <label>Total a 50%</label>
                    <value>${formatCurrency(valor50)}</value>
                </div>
                <div class="summary-card">
                    <label>Total a 100%</label>
                    <value>${formatCurrency(valor100)}</value>
                </div>
                <div class="summary-card" style="grid-column: 1/-1;">
                    <label>TOTAL A RECEBER</label>
                    <value style="font-size: 24px;">${formatCurrency(totalGeral)}</value>
                </div>
            </div>

            <div class="result-item">
                <label>Horas Normais Trabalhadas</label>
                <value>${formatNumber(horasNormais, 1)}</value>
            </div>
            <div class="result-item">
                <label>Horas Extras a 50%</label>
                <value>${formatNumber(horas50, 1)}</value>
            </div>
            <div class="result-item">
                <label>Horas Extras a 100%</label>
                <value>${formatNumber(horas100, 1)}</value>
            </div>
        `;

        document.getElementById('resultPeriodoContent').innerHTML = html;
        document.getElementById('resultPeriodo').classList.remove('hidden');
    } catch (e) {
        document.getElementById('resultPeriodo').classList.add('hidden');
    }
}
