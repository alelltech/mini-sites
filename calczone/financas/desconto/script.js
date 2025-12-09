document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('toolForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            calcularDesconto();
        });
    }
});

function calcularDesconto() {
    const preco = parseFloat(document.getElementById('preco').value);
    const desconto = parseFloat(document.getElementById('desconto').value);

    if (!isPositive(preco) || !isNonNegative(desconto) || desconto > 100) {
        showAlert('Por favor, insira valores válidos', 'danger');
        hideResult();
        return;
    }

    const valorDesconto = preco * (desconto / 100);
    const precoFinal = preco - valorDesconto;
    const economiaPercento = desconto;

    const html = `
        <div class="result-item">
            <label>Preço Original (R$)</label>
            <value>${formatCurrency(preco)}</value>
        </div>
        <div class="result-item">
            <label>Valor do Desconto (R$)</label>
            <value class="text-success">-${formatCurrency(valorDesconto)}</value>
        </div>
        <div class="result-item">
            <label>Preço Final (R$)</label>
            <value>${formatCurrency(precoFinal)}</value>
        </div>
    `;

    showResult(html);
    trackToolUsage('calculadora-desconto');
}
