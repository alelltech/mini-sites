document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('toolForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            calcularImposto();
        });
    }
});

function calcularImposto() {
    const valor = parseFloat(document.getElementById('valor').value);
    const tipo = document.getElementById('tipo').value;

    if (!isPositive(valor)) {
        showAlert('Por favor, insira um valor válido', 'danger');
        hideResult();
        return;
    }

    const aliquotas = {
        'icms': 0.18,
        'ipi': 0.10,
        'iss': 0.05,
        'pis': 0.0165,
        'cofins': 0.076
    };

    const nomes = {
        'icms': 'ICMS',
        'ipi': 'IPI',
        'iss': 'ISS',
        'pis': 'PIS',
        'cofins': 'COFINS'
    };

    const aliquota = aliquotas[tipo];
    const imposto = valor * aliquota;
    const total = valor + imposto;

    const html = `
        <div class="result-item">
            <label>Valor Base (R$)</label>
            <value>${formatCurrency(valor)}</value>
        </div>
        <div class="result-item">
            <label>${nomes[tipo]} (${formatNumber(aliquota * 100, 2)}%)</label>
            <value>${formatCurrency(imposto)}</value>
        </div>
        <div class="result-item">
            <label>Total com Imposto (R$)</label>
            <value>${formatCurrency(total)}</value>
        </div>
    `;

    showResult(html);
    trackToolUsage('calculadora-impostos');
}
