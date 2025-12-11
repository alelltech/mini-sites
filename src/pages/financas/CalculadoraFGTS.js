import React, { useState } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

export default function CalculadoraFGTS() {
    const [saldo, setSaldo] = useState('');
    const [aliquota, setAliquota] = useState('');
    const [resultado, setResultado] = useState(null);
    const [showResult, setShowResult] = useState(false);

    function calcular() {
        const saldoNum = parseFloat(saldo);
        const aliquotaNum = parseFloat(aliquota);

        if (!saldoNum || !aliquotaNum) {
            return;
        }

        const rendimento = (saldoNum * aliquotaNum) / 100;
        const totalComRendimento = saldoNum + rendimento;

        setResultado({
            saldo: saldoNum.toFixed(2),
            aliquota: aliquotaNum.toFixed(2),
            rendimento: rendimento.toFixed(2),
            total: totalComRendimento.toFixed(2)
        });
        setShowResult(true);
    }

    function limpar() {
        setSaldo('');
        setAliquota('');
        setResultado(null);
        setShowResult(false);
    }

    function copyResult() {
        const text = `Saldo em Conta: R$ ${resultado.saldo}\nAlíquota: ${resultado.aliquota}%\n\nRendimento: R$ ${resultado.rendimento}\nTotal com Rendimento: R$ ${resultado.total}`;
        copyToClipboard(text).then(() => {
            alert('Copiado!');
        });
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>🏦 Calculadora de FGTS</h1>
                <p className="description">Calcule saques e benefícios do FGTS</p>
            </div>
            <div className="tool-container">
                <div style={{ maxWidth: '600px' }}>
                    <div className="form-group">
                        <label htmlFor="saldo">Saldo em Conta (R$)</label>
                        <input
                            id="saldo"
                            type="number"
                            placeholder="5000"
                            min="0"
                            step="0.01"
                            value={saldo}
                            onChange={(e) => { setSaldo(e.target.value); calcular(); }}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="aliquota">Alíquota (% ao ano)</label>
                        <input
                            id="aliquota"
                            type="number"
                            placeholder="8"
                            min="0"
                            step="0.01"
                            value={aliquota}
                            onChange={(e) => { setAliquota(e.target.value); calcular(); }}
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
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Saldo Inicial</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                                            R$ {resultado.saldo}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Rendimento</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold', color: '#28a745' }}>
                                            R$ {resultado.rendimento}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Total com Rendimento</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                                            R$ {resultado.total}
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
