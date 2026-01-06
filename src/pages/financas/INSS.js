import React, { useState, useEffect } from 'react';
import useUrlParams from '../../utils/useUrlParams.js';
import { formatCurrency, formatNumber, safeParseFloat } from '../../utils/globalFunctions.js';

export default function INSS() {
    const [salario, setSalario] = useState('');
    const [resultado, setResultado] = useState(null);

    // Ler parâmetros da URL
    useUrlParams({
        salario: setSalario
    });

    useEffect(() => {
        calcular();
    }, [salario]);

    function calcular() {
        const salarioVal = safeParseFloat(salario);

        if (salarioVal === 0) {
            setResultado(null);
            return;
        }

        try {
            // Alíquotas INSS 2024 (aproximadas)
            let aliquota = 0;
            if (salarioVal <= 1412) {
                aliquota = 0.075;
            } else if (salarioVal <= 2666.68) {
                aliquota = 0.09;
            } else if (salarioVal <= 4000.03) {
                aliquota = 0.12;
            } else if (salarioVal <= 7786.02) {
                aliquota = 0.14;
            } else {
                aliquota = 0.14; // máximo
            }

            const inss = salarioVal * aliquota;
            const salarioLiquido = salarioVal - inss;

            setResultado({
                aliquota: aliquota * 100,
                inss,
                salarioLiquido,
                salario: salarioVal
            });
        } catch (e) {
            setResultado(null);
        }
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
                        <i className="icon-briefcase" style={{ marginRight: '10px' }}></i>
                        Calculadora de INSS
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Calcule o desconto de INSS no seu salário</p>
                </div>

                <form style={{ marginBottom: '20px' }}>
                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="salario" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Salário Bruto (R$):</label>
                        <input
                            className="p-input p-form-text"
                            type="number"
                            id="salario"
                            placeholder="Ex: 3000"
                            min="0"
                            step="0.01"
                            value={salario}
                            onChange={(e) => setSalario(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        />
                    </div>
                </form>

                {resultado && (
                    <div className="p-card p-shadow-1" style={{ background: 'rgba(255,255,255,0.5)', borderRadius: '15px', padding: '20px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', marginBottom: '20px' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '15px', fontSize: '18px', fontWeight: '600', color: '#333' }}>Resultado</h3>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '14px', color: '#666' }}>Salário Bruto</td>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#333', textAlign: 'right' }}>{formatCurrency(resultado.salario)}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '14px', color: '#666' }}>Alíquota</td>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#333', textAlign: 'right' }}>{formatNumber(resultado.aliquota, 2)}%</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '14px', color: '#666' }}>INSS Descontado</td>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#dc3545', textAlign: 'right' }}>-{formatCurrency(resultado.inss)}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(40, 167, 69, 0.1)', borderRadius: '8px', fontSize: '14px', color: '#666', fontWeight: '600' }}>Salário Líquido</td>
                                    <td style={{ padding: '12px', background: 'rgba(40, 167, 69, 0.1)', borderRadius: '8px', fontSize: '20px', fontWeight: '700', color: '#28a745', textAlign: 'right' }}>{formatCurrency(resultado.salarioLiquido)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                <div style={{ marginTop: '30px', background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
                    <h3 style={{ marginTop: 0 }}>📋 Tabela de Alíquotas INSS 2024</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                            <tr>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>até R$ 1.412,00</td>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>7,5%</td>
                            </tr>
                            <tr style={{ background: '#f0f0f0' }}>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>R$ 1.412,01 a R$ 2.666,68</td>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>9%</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>R$ 2.666,69 a R$ 4.000,03</td>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>12%</td>
                            </tr>
                            <tr style={{ background: '#f0f0f0' }}>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>R$ 4.000,04 a R$ 7.786,02</td>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>14%</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>Acima de R$ 7.786,02</td>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>14% (máximo)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
