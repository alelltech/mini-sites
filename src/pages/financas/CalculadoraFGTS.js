import React, { useEffect, useState } from 'react';
import useUrlParams from '../../utils/useUrlParams.js';
import { copyToClipboard } from '../../utils/globalFunctions.js';

export default function CalculadoraFGTS() {
    const [salario, setSalario] = useState('');
    const [aliquota, setAliquota] = useState('');
    const [resultado, setResultado] = useState(null);
    const [showResult, setShowResult] = useState(false);

    // Ler parâmetros da URL
    useUrlParams({
        salario: setSalario,
        meses: () => {} // Ignorar por enquanto
    });

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
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div className="p-card p-shadow-2" style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '30px'
            }}>
                <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
                        <i className="icon-wallet" style={{ marginRight: '10px' }}></i>
                        Calculadora de Depósito FGTS
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Calcule o depósito mensal de FGTS que a empresa deve fazer</p>
                </div>

                <form style={{ marginBottom: '20px' }}>
                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="salario" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Salário Mensal (R$):</label>
                        <input
                            className="p-input p-form-text"
                            id="salario"
                            type="number"
                            placeholder="3000"
                            min="0"
                            step="0.01"
                            value={salario}
                            onChange={(e) => setSalario(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        />
                    </div>

                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="aliquota" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Alíquota FGTS:</label>
                        <select
                            className="p-select p-form-select"
                            id="aliquota"
                            value={aliquota}
                            onChange={(e) => setAliquota(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        >
                            <option value="">Selecione uma alíquota</option>
                            {aliquotas.map((item) => (
                                <option key={item.valor} value={item.valor}>
                                    {item.descricao}
                                </option>
                            ))}
                        </select>
                    </div>

                </form>

                {showResult && resultado && (
                    <div className="p-card p-shadow-1" style={{ background: 'rgba(255,255,255,0.5)', borderRadius: '15px', padding: '20px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '15px', fontSize: '18px', fontWeight: '600', color: '#333' }}>Resultado</h3>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '14px', color: '#666' }}>Salário</td>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#333', textAlign: 'right' }}>R$ {resultado.salario}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '14px', color: '#666' }}>Alíquota</td>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#333', textAlign: 'right' }}>{resultado.aliquota}%</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(40, 167, 69, 0.1)', borderRadius: '8px', fontSize: '14px', color: '#666', fontWeight: '600' }}>Depósito Mensal</td>
                                    <td style={{ padding: '12px', background: 'rgba(40, 167, 69, 0.1)', borderRadius: '8px', fontSize: '18px', fontWeight: '700', color: '#28a745', textAlign: 'right' }}>R$ {resultado.depositoMensal}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '8px', fontSize: '14px', color: '#666', fontWeight: '600' }}>Depósito Anual</td>
                                    <td style={{ padding: '12px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '8px', fontSize: '18px', fontWeight: '700', color: '#667eea', textAlign: 'right' }}>R$ {resultado.depositoAnual}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            onClick={copyResult}
                            className="p-btn"
                            style={{
                                width: '100%',
                                padding: '12px',
                                marginTop: '15px',
                                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '600',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Copiar Resultado
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
