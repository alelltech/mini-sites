document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('toolForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            calcularJurosCompostos();
        });
    }
});

function calcularJurosCompostos() {
    const capital = parseFloat(document.getElementById('capital').value);
    const taxa = parseFloat(document.getElementById('taxa').value);
    const tempo = parseFloat(document.getElementById('tempo').value);
    const frequencia = parseInt(document.getElementById('frequencia').value);

    if (!isPositive(capital) || !isNonNegative(taxa) || !isPositive(tempo)) {
        showAlert('Por favor, preencha todos os campos com valores válidos', 'danger');
        hideResult();
        return;
    }

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
            <value>${periodos}</value>
        </div>
    `;

    showResult(html);
    trackToolUsage('calculadora-juros-compostos');
}
