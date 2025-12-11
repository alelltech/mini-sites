import React, { useState } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

const IMPOSTOS = {
    icms: 18,
    ipi: 10,
    iss: 5,
    pis: 1.65,
    cofins: 7.6
};

export default function CalculadoraImpostos() {
    const [valor, setValor] = useState('');
    const [impostosSelecionados, setImpostosSelecionados] = useState({});
    const [resultado, setResultado] = useState(null);
    const [showResult, setShowResult] = useState(false);

    function handleCheckboxChange(imposto) {
        setImpostosSelecionados(prev => ({
            ...prev,
            [imposto]: !prev[imposto]
        }));
    }

    function calcular() {
        const valorNum = parseFloat(valor);
        if (!valorNum || Object.values(impostosSelecionados).every(v => !v)) {
            alert('Preencha o valor e selecione pelo menos um imposto');
            return;
        }

        const impostos = {};
        let totalImpostos = 0;

        Object.entries(impostosSelecionados).forEach(([key, selecionado]) => {
            if (selecionado) {
                const aliquota = IMPOSTOS[key];
                const valor_imposto = (valorNum * aliquota) / 100;
                impostos[key] = {
                    aliquota,
                    valor: valor_imposto.toFixed(2)
                };
                totalImpostos += valor_imposto;
            }
        });

        setResultado({
            valor: valorNum.toFixed(2),
            impostos,
            totalImpostos: totalImpostos.toFixed(2),
            valorFinal: (valorNum + totalImpostos).toFixed(2)
        });
        setShowResult(true);
    }

    function limpar() {
        setValor('');
        setImpostosSelecionados({});
        setResultado(null);
        setShowResult(false);
    }

    function copyResult() {
        let text = `Valor Base: R$ ${resultado.valor}\n\nImpostos:\n`;
        Object.entries(resultado.impostos).forEach(([key, data]) => {
            text += `${key.toUpperCase()} (${data.aliquota}%): R$ ${data.valor}\n`;
        });
        text += `\nTotal de Impostos: R$ ${resultado.totalImpostos}\nValor Final: R$ ${resultado.valorFinal}`;
        copyToClipboard(text).then(() => {
            alert('Copiado!');
        });
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>📋 Calculadora de Impostos</h1>
                <p className="description">Calcule ICMS, IPI, ISS, PIS, COFINS e outros impostos brasileiros</p>
            </div>
            <div className="tool-container">
                <div style={{ maxWidth: '600px' }}>
                    <div className="form-group">
                        <label htmlFor="valor">Valor Base (R$)</label>
                        <input
                            id="valor"
                            type="number"
                            placeholder="1000"
                            min="0"
                            step="0.01"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Selecione os Impostos</label>
                        <div style={{ marginBottom: '15px' }}>
                            {Object.entries(IMPOSTOS).map(([key, aliquota]) => (
                                <div key={key} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type="checkbox"
                                        id={key}
                                        checked={impostosSelecionados[key] || false}
                                        onChange={() => handleCheckboxChange(key)}
                                        style={{ marginRight: '10px', cursor: 'pointer' }}
                                    />
                                    <label htmlFor={key} style={{ cursor: 'pointer' }}>
                                        {key.toUpperCase()} ({aliquota}%)
                                    </label>
                                </div>
                            ))}
                        </div>
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
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Valor Base</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                                            R$ {resultado.valor}
                                        </td>
                                    </tr>
                                    {Object.entries(resultado.impostos).map(([key, data]) => (
                                        <tr key={key}>
                                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                                {key.toUpperCase()} ({data.aliquota}%)
                                            </td>
                                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                                R$ {data.valor}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                                            Total de Impostos
                                        </td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold', color: '#dc3545' }}>
                                            R$ {resultado.totalImpostos}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                                            Valor Final
                                        </td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                                            R$ {resultado.valorFinal}
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
