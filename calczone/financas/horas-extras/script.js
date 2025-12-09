document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('toolForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            calcularExtras();
        });
    }
});

function calcularExtras() {
    const salario = parseFloat(document.getElementById('salario').value);
    const horas = parseFloat(document.getElementById('horas').value);
    const percentual = parseInt(document.getElementById('percentual').value);

    if (!isPositive(salario) || !isPositive(horas)) {
        showAlert('Por favor, preencha todos os campos com valores válidos', 'danger');
        hideResult();
        return;
    }

    const valorHora = salario / 160; // 160 horas/mês
    const valorExtra = valorHora * (1 + percentual / 100) * horas;

    const html = `
        <div class="result-item">
            <label>Valor da Hora Normal (R$)</label>
            <value>${formatCurrency(valorHora)}</value>
        </div>
        <div class="result-item">
            <label>Valor da Hora Extra com ${percentual}%</label>
            <value>${formatCurrency(valorHora * (1 + percentual / 100))}</value>
        </div>
        <div class="result-item">
            <label>Total de Horas Extras</label>
            <value>${formatCurrency(valorExtra)}</value>
        </div>
    `;

    showResult(html);
    trackToolUsage('calculadora-horas-extras');
}
