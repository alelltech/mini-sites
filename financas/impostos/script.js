document.addEventListener('DOMContentLoaded', function() {
    // Setup cálculo em tempo real
    setupRealTimeCalculation('input[type="number"], input[type="checkbox"]', calcularImposto, 300);
    
    // Calcula na primeira vez
    calcularImposto();
});

function calcularImposto() {
    const valor = safeParseFloat(document.getElementById('valor').value);
    const checkboxes = document.querySelectorAll('input[name="imposto"]:checked');

    // Se o campo está vazio ou nenhum checkbox selecionado, esconde resultado
    if (valor === 0 || checkboxes.length === 0) {
        hideResult();
        return;
    }

    try {
        const aliquotas = {
            'icms': 0.18,
            'ipi': 0.10,
            'iss': 0.05,
            'pis': 0.0165,
            'cofins': 0.076
        };

        const nomes = {
            'icms': 'ICMS',
            'ipi': 'IPI',
            'iss': 'ISS',
            'pis': 'PIS',
            'cofins': 'COFINS'
        };

        let totalImposto = 0;
        let resultItems = `
            <div class="result-item">
                <label>Valor Base (R$)</label>
                <value>${formatCurrency(valor)}</value>
            </div>
        `;

        // Calcular cada imposto selecionado
        checkboxes.forEach(checkbox => {
            const tipo = checkbox.value;
            const aliquota = aliquotas[tipo];
            const imposto = valor * aliquota;
            totalImposto += imposto;

            resultItems += `
                <div class="result-item">
                    <label>${nomes[tipo]} (${formatNumber(aliquota * 100, 2)}%)</label>
                    <value>${formatCurrency(imposto)}</value>
                </div>
            `;
        });

        const total = valor + totalImposto;

        resultItems += `
            <div class="result-item" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(99, 102, 241, 0.05)); border-left-color: #6366f1;">
                <label><strong>Total de Impostos</strong></label>
                <value style="font-size: 18px;"><strong>${formatCurrency(totalImposto)}</strong></value>
            </div>
            <div class="result-item" style="background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05)); border-left-color: #4CAF50;">
                <label><strong>Total com Impostos</strong></label>
                <value style="font-size: 18px; color: #4CAF50;"><strong>${formatCurrency(total)}</strong></value>
            </div>
        `;

        document.getElementById('resultContent').innerHTML = resultItems;
        document.getElementById('result').classList.remove('hidden');
    } catch (e) {
        hideResult();
    }
}

function hideResult() {
    const resultDiv = document.getElementById('result');
    if (resultDiv) resultDiv.classList.add('hidden');
}
