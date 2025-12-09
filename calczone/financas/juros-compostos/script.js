document.addEventListener('DOMContentLoaded', function() {
    // Setup cálculo em tempo real
    setupRealTimeCalculation('input[type="number"], select', calcularJurosCompostos, 300);
    
    // Calcula na primeira vez
    calcularJurosCompostos();
});

function calcularJurosCompostos() {
    const capital = safeParseFloat(document.getElementById('capital').value);
    const taxa = safeParseFloat(document.getElementById('taxa').value);
    const tempo = safeParseFloat(document.getElementById('tempo').value);
    const frequencia = parseInt(document.getElementById('frequencia').value) || 12;

    // Se algum campo está vazio, esconde resultado
    if (capital === 0 || taxa === 0 || tempo === 0) {
        hideResult();
        return;
    }

    try {
        const taxaDecimal = taxa / 100;
        const periodos = frequencia * tempo;
        const taxaPeriodo = taxaDecimal / frequencia;
        
        const montante = capital * Math.pow(1 + taxaPeriodo, periodos);
        const jurosGanhos = montante - capital;

        const html = `
            <div class="result-item">
                <label>Montante Final</label>
                <value>${formatCurrency(montante)}</value>
            </div>
            <div class="result-item">
                <label>Juros Ganhos</label>
                <value>${formatCurrency(jurosGanhos)}</value>
            </div>
            <div class="result-item">
                <label>Capital Inicial</label>
                <value>${formatCurrency(capital)}</value>
            </div>
            <div class="result-item">
                <label>Taxa Período</label>
                <value>${formatNumber(taxaPeriodo * 100, 4)}%</value>
            </div>
            <div class="result-item">
                <label>Períodos Totais</label>
                <value>${Math.round(periodos)}</value>
            </div>
        `;

        showResult(html);
    } catch (e) {
        hideResult();
    }
}
    `;

    showResult(html);
    trackToolUsage('calculadora-juros-compostos');
}
