import React, { useEffect, useState } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

export default function CalculadoraFGTS() {
    const [salario, setSalario] = useState('');
    const [aliquota, setAliquota] = useState('');
    const [resultado, setResultado] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const aliquotas = [
        { valor: 8, descricao: '8% - Trabalhadores em Geral CLT (alíquota padrão)' },
        { valor: 8 + 3.2, descricao: '11.2% - Empregado Doméstico Depósito (padrão + antecipação rescisória)' },
        { valor: 2, descricao: '2% - Jovem Aprendiz' }
    ];
    useEffect(() => {
        const timeOutId = setTimeout(() => calcular(), 100);
        return () => clearTimeout(timeOutId);
    }, [salario, aliquota]);

    function calcular() {
        const salarioNum = parseFloat(salario);
        const aliquotaNum = parseFloat(aliquota);

        if (!salarioNum || !aliquotaNum) {
            return;
        }

        const deposito = (salarioNum * aliquotaNum) / 100;
        const depositoAnual = deposito * 12;

        setResultado({
            salario: salarioNum.toFixed(2),
            aliquota: aliquotaNum.toFixed(2),
            depositoMensal: deposito.toFixed(2),
            depositoAnual: depositoAnual.toFixed(2)
        });
        setShowResult(true);
    }

    function limpar() {
        setSalario('');
        setAliquota('');
        setResultado(null);
        setShowResult(false);
    }

    function copyResult() {
        const text = `Salário: R$ ${resultado.salario}\nAlíquota: ${resultado.aliquota}%\n\nDepósito Mensal: R$ ${resultado.depositoMensal}\nDepósito Anual: R$ ${resultado.depositoAnual}`;
        copyToClipboard(text).then(() => {
            alert('Copiado!');
        });
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>🏦 Calculadora de Depósito FGTS</h1>
                <p className="description">Calcule o depósito mensal de FGTS que a empresa deve fazer</p>
            </div>
            <div className="tool-container">
                <div style={{ maxWidth: '600px' }}>
                    <div className="form-group">
                        <label htmlFor="salario">Salário Mensal (R$)</label>
                        <input
                            id="salario"
                            type="number"
                            placeholder="3000"
                            min="0"
                            step="0.01"
                            value={salario}
                            onChange={(e) => setSalario(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="aliquota">Alíquota FGTS</label>
                        <select
                            id="aliquota"
                            value={aliquota}
                            onChange={(e) => setAliquota(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                        >
                            <option value="">Selecione uma alíquota</option>
                            {aliquotas.map((item) => (
                                <option key={item.valor} value={item.valor}>
                                    {item.descricao}
                                </option>
                            ))}
                        </select>
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
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Salário</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                                            R$ {resultado.salario}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Alíquota</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                                            {resultado.aliquota}%
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Depósito Mensal</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold', color: '#28a745' }}>
                                            R$ {resultado.depositoMensal}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Depósito Anual</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold', color: '#007bff' }}>
                                            R$ {resultado.depositoAnual}
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
