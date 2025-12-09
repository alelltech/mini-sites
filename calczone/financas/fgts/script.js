document.addEventListener('DOMContentLoaded', function() {
    // Setup cálculo em tempo real
    setupRealTimeCalculation('input[type="number"]', calcularFGTS, 300);
    
    // Calcula na primeira vez
    calcularFGTS();
});

function calcularFGTS() {
    const saldo = safeParseFloat(document.getElementById('saldo').value);
    const aliquota = safeParseFloat(document.getElementById('aliquota').value);

    // Se algum campo está vazio, esconde resultado
    if (saldo === 0) {
        hideResult();
        return;
    }

    try {
        const aliquotaDecimal = aliquota / 100;
        const rendimento = saldo * aliquotaDecimal;
        const saldoAtualizado = saldo + rendimento;

        const html = `
            <div class="result-item">
                <label>Saldo Inicial (R$)</label>
                <value>${formatCurrency(saldo)}</value>
            </div>
            <div class="result-item">
                <label>Rendimento (${formatNumber(aliquota, 2)}%)</label>
                <value>${formatCurrency(rendimento)}</value>
            </div>
            <div class="result-item">
                <label>Saldo Atualizado (R$)</label>
                <value>${formatCurrency(saldoAtualizado)}</value>
            </div>
        `;

        showResult(html);
    } catch (e) {
        hideResult();
    }
}
