document.addEventListener('DOMContentLoaded', function() {
    setupRealTimeCalculation('input[type="number"], select', converter, 300);
    converter();
});

function converter() {
    const valor = safeParseFloat(document.getElementById('valor').value);
    const de = document.getElementById('de').value;
    const para = document.getElementById('para').value;
    
    if (valor === 0) {
        hideResult();
        return;
    }

    try {
        let celsius = de === 'C' ? valor : de === 'F' ? (valor - 32) * 5/9 : valor - 273.15;
        let resultado = para === 'C' ? celsius : para === 'F' ? celsius * 9/5 + 32 : celsius + 273.15;
        showResult(`<div class="result-item"><label>${de} → ${para}</label><value>${formatNumber(resultado, 2)}°</value></div>`);
    } catch (e) {
        hideResult();
    }
}
