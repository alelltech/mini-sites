document.addEventListener('DOMContentLoaded', function() {
    // Carrega as taxas de crédito
    carregarTaxas();
    
    // Setup cálculo em tempo real
    setupRealTimeCalculation('input[type="number"]', calcularEmprestimo, 300);
    
    // Event listener para o select de taxas
    document.getElementById('taxaSelect').addEventListener('change', function() {
        if (this.value) {
            document.getElementById('taxa').value = this.value;
            calcularEmprestimo();
        }
    });
    
    // Calcula na primeira vez
    calcularEmprestimo();
});

async function carregarTaxas() {
    try {
        const response = await fetch('../../data/taxascredito.json');
        const data = await response.json();
        const items = [
            ...data['PF-TaxasDiarias'].map(item => {return {...item, pessoa: 'PF'}}), 
            ...data['PF-TaxasMensais'].map(item => {return {...item, pessoa: 'PF'}}),
            ...data['PJ-TaxasDiarias'].map(item => {return {...item, pessoa: 'PJ'}}),
        ];

        items.sort((a, b) => {
            return parseFloat(a.taxas_medias_a_m) - parseFloat(b.taxas_medias_a_m);
        });

        // Popula o select de taxas
        
        const selectElement = document.getElementById('taxaSelect');
        items.forEach(({taxas_medias_a_m, taxas_medias_a_a, pessoa, instituicao_financeira}) => {
            const option = document.createElement('option');
            option.value = taxas_medias_a_m.toFixed(2);
            option.textContent = `${pessoa} ${taxas_medias_a_m.toFixed(2)}%am ${taxas_medias_a_a.toFixed(2)}%aa - ${instituicao_financeira}`;
            selectElement.appendChild(option);
        });
    } catch (e) {
        console.error('Erro ao carregar taxas:', e);
    }
}

function calcularEmprestimo() {
    const valor = safeParseFloat(document.getElementById('valor').value);
    const taxa = safeParseFloat(document.getElementById('taxa').value);
    const meses = safeParseFloat(document.getElementById('meses').value);

    // Se algum campo está vazio, esconde resultado
    if (valor === 0 || taxa === 0 || meses === 0) {
        hideResult();
        return;
    }

    try {
        const taxaDecimal = taxa / 100;
        const prestacao = (valor * taxaDecimal * Math.pow(1 + taxaDecimal, meses)) / (Math.pow(1 + taxaDecimal, meses) - 1);
        const totalPagar = prestacao * meses;
        const totalJuros = totalPagar - valor;

        const html = `
            <div class="result-item">
                <label>Valor Emprestado (R$)</label>
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
