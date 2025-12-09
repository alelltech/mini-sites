document.addEventListener('DOMContentLoaded', function() {
    // Setup cálculo em tempo real
    setupRealTimeCalculation('input[type="number"], select', calcularExtras, 300);
    
    // Calcula na primeira vez
    calcularExtras();
});

function calcularExtras() {
    const salario = safeParseFloat(document.getElementById('salario').value);
    const horas = safeParseFloat(document.getElementById('horas').value);
    const percentual = safeParseFloat(document.getElementById('percentual').value) || 50;

    // Se algum campo está vazio, esconde resultado
    if (salario === 0 || horas === 0) {
        hideResult();
        return;
    }

    try {
        const valorHora = salario / 160; // 160 horas/mês
        const valorExtra = valorHora * (1 + percentual / 100) * horas;

        const html = `
            <div class="result-item">
                <label>Valor da Hora Normal (R$)</label>
                <value>${formatCurrency(valorHora)}</value>
            </div>
            <div class="result-item">
                <label>Valor da Hora Extra com ${formatNumber(percentual, 0)}%</label>
                <value>${formatCurrency(valorHora * (1 + percentual / 100))}</value>
            </div>
            <div class="result-item">
                <label>Total de Horas Extras</label>
                <value>${formatCurrency(valorExtra)}</value>
            </div>
        `;

        showResult(html);
    } catch (e) {
        hideResult();
    }
}
