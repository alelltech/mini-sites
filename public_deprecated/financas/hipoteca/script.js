document.addEventListener('DOMContentLoaded', function() {
    // Setup cálculo em tempo real
    setupRealTimeCalculation('input[type="number"]', calcularHipoteca, 300);
    
    // Calcula na primeira vez
    calcularHipoteca();
});

function calcularHipoteca() {
    const valor = safeParseFloat(document.getElementById('valor').value);
    const taxa = safeParseFloat(document.getElementById('taxa').value);
    const anos = safeParseFloat(document.getElementById('anos').value);

    // Se algum campo está vazio, esconde resultado
    if (valor === 0 || taxa === 0 || anos === 0) {
        hideResult();
        return;
    }

    try {
        const taxaDecimal = taxa / 100 / 12; // taxa ao mês
        const meses = anos * 12;
        const prestacao = (valor * taxaDecimal * Math.pow(1 + taxaDecimal, meses)) / (Math.pow(1 + taxaDecimal, meses) - 1);
        const totalPagar = prestacao * meses;
        const totalJuros = totalPagar - valor;

        const html = `
            <div class="result-item">
                <label>Valor do Imóvel (R$)</label>
                <value>${formatCurrency(valor)}</value>
            </div>
            <div class="result-item">
                <label>Prestação Mensal (R$)</label>
                <value>${formatCurrency(prestacao)}</value>
            </div>
            <div class="result-item">
                <label>Total de Juros (R$)</label>
                <value>${formatCurrency(totalJuros)}</value>
            </div>
            <div class="result-item">
                <label>Total a Pagar (R$)</label>
                <value>${formatCurrency(totalPagar)}</value>
            </div>
        `;

        showResult(html);
    } catch (e) {
        hideResult();
    }
}
