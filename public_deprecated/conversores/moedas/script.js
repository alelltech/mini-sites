document.addEventListener('DOMContentLoaded', function() {
    // Setup cálculo em tempo real
    setupRealTimeCalculation('input[type="number"], select', converter, 300);
    
    // Converte na primeira vez
    converter();
});

function converter() {
    const valor = safeParseFloat(document.getElementById('valor').value);
    const de = document.getElementById('de').value;
    const para = document.getElementById('para').value;

    // Se o campo está vazio, esconde resultado
    if (valor === 0) {
        hideResult();
        return;
    }

    try {
        const taxas = { 'BRL': 1, 'USD': 5.0, 'EUR': 5.5, 'GBP': 6.3 };
        const resultado = (valor * taxas[de]) / taxas[para];

        const html = `<div class="result-item"><label>${de} → ${para}</label><value>${formatNumber(resultado, 2)}</value></div>`;
        showResult(html);
    } catch (e) {
        hideResult();
    }
}
