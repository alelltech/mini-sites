document.addEventListener('DOMContentLoaded', function() {
    // Setup cálculo em tempo real
    setupRealTimeCalculation('input[type="number"]', calcularINSS, 300);
    
    // Calcula na primeira vez
    calcularINSS();
});

function calcularINSS() {
    const salario = safeParseFloat(document.getElementById('salario').value);

    // Se o campo está vazio, esconde resultado
    if (salario === 0) {
        hideResult();
        return;
    }

    try {
        // Alíquotas INSS 2024 (aproximadas)
        let aliquota = 0;
        if (salario <= 1412) aliquota = 0.075;
        else if (salario <= 2666.68) aliquota = 0.09;
        else if (salario <= 4000.03) aliquota = 0.12;
        else if (salario <= 7786.02) aliquota = 0.14;
        else aliquota = 0.14; // máximo

        const inss = salario * aliquota;
        const salarioLiquido = salario - inss;

        const html = `
            <div class="result-item">
                <label>Alíquota</label>
                <value>${formatNumber(aliquota * 100, 2)}%</value>
            </div>
            <div class="result-item">
                <label>INSS Descontado (R$)</label>
                <value>${formatCurrency(inss)}</value>
            </div>
            <div class="result-item">
                <label>Salário Líquido (R$)</label>
                <value>${formatCurrency(salarioLiquido)}</value>
            </div>
        `;

        showResult(html);
    } catch (e) {
        hideResult();
    }
}
