document.addEventListener('DOMContentLoaded', function() {
    // Setup cálculo em tempo real
    setupRealTimeCalculation('input[type="number"]', calcularDesconto, 300);
    
    // Calcula na primeira vez
    calcularDesconto();
});

function calcularDesconto() {
    const preco = safeParseFloat(document.getElementById('preco').value);
    const desconto = safeParseFloat(document.getElementById('desconto').value);

    // Se algum campo está vazio, esconde resultado
    if (preco === 0) {
        hideResult();
        return;
    }

    try {
        // Valida desconto
        if (desconto > 100) {
            hideResult();
            return;
        }

        const valorDesconto = preco * (desconto / 100);
        const precoFinal = preco - valorDesconto;

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
    } catch (e) {
        hideResult();
    }
}
