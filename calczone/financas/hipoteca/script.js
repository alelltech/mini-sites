document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('toolForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            calcularHipoteca();
        });
    }
});

function calcularHipoteca() {
    const valor = parseFloat(document.getElementById('valor').value);
    const taxa = parseFloat(document.getElementById('taxa').value);
    const anos = parseInt(document.getElementById('anos').value);

    if (!isPositive(valor) || !isPositive(taxa) || anos < 1) {
        showAlert('Por favor, insira valores válidos', 'danger');
        hideResult();
        return;
    }

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
    trackToolUsage('calculadora-hipoteca');
}
