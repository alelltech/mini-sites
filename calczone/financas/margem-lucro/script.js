document.addEventListener('DOMContentLoaded', function() {
    // Setup cálculo em tempo real
    setupRealTimeCalculation('input[type="number"]', calcularMargem, 300);
    
    // Calcula na primeira vez
    calcularMargem();
});

function calcularMargem() {
    const custo = safeParseFloat(document.getElementById('custo').value);
    const preco = safeParseFloat(document.getElementById('preco').value);

    // Se algum campo está vazio, esconde resultado
    if (custo === 0 || preco === 0) {
        hideResult();
        return;
    }

    try {
        const lucro = preco - custo;
        const margem = (lucro / preco) * 100;
        const markup = ((preco / custo) - 1) * 100;
        const percentualCusto = (custo / preco) * 100;

        // Aviso visual se preço < custo
        let avisoHtml = '';
        if (preco < custo) {
            avisoHtml = '<div class="alert alert-danger" style="margin-bottom: 15px;">⚠️ Preço de venda menor que o custo!</div>';
        }

        const html = `
            ${avisoHtml}
            <div class="result-item">
                <label>Lucro (R$)</label>
                <value style="color: ${lucro >= 0 ? '#28a745' : '#dc3545'}">${formatCurrency(lucro)}</value>
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
    } catch (e) {
        hideResult();
    }
}

}
