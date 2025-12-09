document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('toolForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            converter();
        });
    }
});

function converter() {
    const valor = parseFloat(document.getElementById('valor').value);
    const de = document.getElementById('de').value;
    const para = document.getElementById('para').value;

    if (!isPositive(valor)) {
        showAlert('Insira um valor válido', 'danger');
        return;
    }

    const taxas = { 'BRL': 1, 'USD': 5.0, 'EUR': 5.5, 'GBP': 6.3 };
    const resultado = (valor * taxas[de]) / taxas[para];

    const html = `<div class="result-item"><label>${de} → ${para}</label><value>${formatNumber(resultado, 2)}</value></div>`;
    showResult(html);
}
