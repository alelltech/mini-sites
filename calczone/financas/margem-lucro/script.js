document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('toolForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            calcularMargem();
        });
    }
});

function calcularMargem() {
    const custo = parseFloat(document.getElementById('custo').value);
    const preco = parseFloat(document.getElementById('preco').value);

    if (!isPositive(custo) || !isPositive(preco)) {
        showAlert('Por favor, preencha todos os campos com valores válidos', 'danger');
        hideResult();
        return;
    }

    if (preco < custo) {
        showAlert('O preço de venda deve ser maior que o custo!', 'warning');
    }

    const lucro = preco - custo;
    const margem = (lucro / preco) * 100;
    const markup = ((preco / custo) - 1) * 100;
    const percentualCusto = (custo / preco) * 100;

    const html = `
        <div class="result-item">
            <label>Lucro (R$)</label>
            <value>${formatCurrency(lucro)}</value>
        </div>
        <div class="result-item">
            <label>Margem de Lucro</label>
            <value>${formatNumber(margem, 2)}%</value>
        </div>
        <div class="result-item">
            <label>Markup</label>
            <value>${formatNumber(markup, 2)}%</value>
        </div>
        <div class="result-item">
            <label>% Custo</label>
            <value>${formatNumber(percentualCusto, 2)}%</value>
        </div>
    `;

    showResult(html);
    trackToolUsage('calculadora-margem-lucro');
}
