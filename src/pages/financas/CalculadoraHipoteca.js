import React, { useState } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

function calcularPrestacao(valor, taxaAnual, anos) {
    const taxa = (taxaAnual / 100) / 12;
    const meses = anos * 12;
    const numerador = valor * taxa * Math.pow(1 + taxa, meses);
    const denominador = Math.pow(1 + taxa, meses) - 1;
    return numerador / denominador;
}

export default function CalculadoraHipoteca() {
    const [valor, setValor] = useState('');
    const [taxa, setTaxa] = useState('');
    const [anos, setAnos] = useState('');
    const [resultado, setResultado] = useState(null);
    const [showResult, setShowResult] = useState(false);

    function calcular() {
        const valorNum = parseFloat(valor);
        const taxaNum = parseFloat(taxa);
        const anosNum = parseInt(anos);

        if (!valorNum || !taxaNum || !anosNum) {
            alert('Preencha todos os campos');
            return;
        }

        const prestacao = calcularPrestacao(valorNum, taxaNum, anosNum);
        const totalMeses = anosNum * 12;
        const totalPago = prestacao * totalMeses;
        const totalJuros = totalPago - valorNum;

        setResultado({
            prestacao: prestacao.toFixed(2),
            totalMeses: totalMeses,
            totalPago: totalPago.toFixed(2),
            totalJuros: totalJuros.toFixed(2),
            valor: valorNum.toFixed(2),
            taxa: taxaNum.toFixed(2),
            anos: anosNum
        });
        setShowResult(true);
    }

    function limpar() {
        setValor('');
        setTaxa('');
        setAnos('');
        setResultado(null);
        setShowResult(false);
    }

    function copyResult() {
        const text = `Valor do Imóvel: R$ ${resultado.valor}\nTaxa de Juros: ${resultado.taxa}% ao ano\nPrazo: ${resultado.anos} anos\n\nPrestação Mensal: R$ ${resultado.prestacao}\nTotal Meses: ${resultado.totalMeses}\nTotal a Pagar: R$ ${resultado.totalPago}\nTotal de Juros: R$ ${resultado.totalJuros}`;
        copyToClipboard(text).then(() => {
            alert('Copiado!');
        });
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>🏠 Calculadora de Hipoteca</h1>
                <p className="description">Simule pagamentos de hipoteca e financiamento imobiliário</p>
            </div>
            <div className="tool-container">
                <div style={{ maxWidth: '600px' }}>
                    <div className="form-group">
                        <label htmlFor="valor">Valor do Imóvel (R$)</label>
                        <input
                            id="valor"
                            type="number"
                            placeholder="300000"
                            min="0"
                            step="0.01"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="taxa">Taxa de Juros (% ao ano)</label>
                        <input
                            id="taxa"
                            type="number"
                            placeholder="5.5"
                            min="0"
                            step="0.01"
                            value={taxa}
                            onChange={(e) => setTaxa(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="anos">Prazo (anos)</label>
                        <input
                            id="anos"
                            type="number"
                            placeholder="30"
                            min="1"
                            step="1"
                            value={anos}
                            onChange={(e) => setAnos(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={calcular}
                            style={{
                                padding: '10px 20px',
                                background: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Calcular
                        </button>
                        <button
                            onClick={limpar}
                            style={{
                                padding: '10px 20px',
                                background: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Limpar
                        </button>
                    </div>

                    {showResult && resultado && (
                        <div className="result">
                            <h3>Resultado</h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Prestação Mensal</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                                            R$ {resultado.prestacao}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Total de Meses</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                            {resultado.totalMeses}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Total a Pagar</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                                            R$ {resultado.totalPago}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Total de Juros</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold', color: '#dc3545' }}>
                                            R$ {resultado.totalJuros}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button
                                onClick={copyResult}
                                style={{
                                    padding: '8px 16px',
                                    marginTop: '15px',
                                    background: '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Copiar Resultado
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
