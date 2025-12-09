document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('toolForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            calcularFGTS();
        });
    }
});

function calcularFGTS() {
    const saldo = parseFloat(document.getElementById('saldo').value);
    const aliquota = parseFloat(document.getElementById('aliquota').value);

    if (!isPositive(saldo) || !isNonNegative(aliquota)) {
        showAlert('Por favor, insira valores válidos', 'danger');
        hideResult();
        return;
    }

    const aliquotaDecimal = aliquota / 100;
    const rendimento = saldo * aliquotaDecimal;
    const saldoAtualizado = saldo + rendimento;

    const html = `
        <div class="result-item">
            <label>Saldo Inicial (R$)</label>
            <value>${formatCurrency(saldo)}</value>
        </div>
        <div class="result-item">
            <label>Rendimento (R$)</label>
            <value>${formatCurrency(rendimento)}</value>
        </div>
        <div class="result-item">
            <label>Saldo Atualizado (R$)</label>
            <value>${formatCurrency(saldoAtualizado)}</value>
        </div>
    `;

    showResult(html);
    trackToolUsage('calculadora-fgts');
}
