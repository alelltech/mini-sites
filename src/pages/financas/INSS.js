import React, { useState, useEffect } from 'react';
import { formatCurrency, formatNumber, safeParseFloat } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

export default function INSS() {
    const [salario, setSalario] = useState('');
    const [resultado, setResultado] = useState(null);

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
        <section className="tool-section">
            <div className="tool-header">
                <h1>💼 Calculadora de INSS</h1>
                <p className="description">Calcule o desconto de INSS no seu salário</p>
            </div>
            <div className="tool-container">
                <form className="tool-form">
                    <div className="form-group">
                        <label htmlFor="salario">Salário Bruto (R$)</label>
                        <input
                            type="number"
                            id="salario"
                            placeholder="Ex: 3000"
                            min="0"
                            step="0.01"
                            value={salario}
                            onChange={(e) => setSalario(e.target.value)}
                        />
                    </div>
                </form>

                {resultado && (
                    <div className="result">
                        <h2>Resultado</h2>
                        <div className="result-content">
                            <div className="result-item">
                                <label>Salário Bruto</label>
                                <value>{formatCurrency(resultado.salario)}</value>
                            </div>
                            <div className="result-item">
                                <label>Alíquota</label>
                                <value>{formatNumber(resultado.aliquota, 2)}%</value>
                            </div>
                            <div className="result-item">
                                <label>INSS Descontado</label>
                                <value style={{ color: '#dc3545' }}>-{formatCurrency(resultado.inss)}</value>
                            </div>
                            <div className="result-item">
                                <label>Salário Líquido</label>
                                <value style={{ fontSize: '1.3rem', color: '#28a745' }}>
                                    {formatCurrency(resultado.salarioLiquido)}
                                </value>
                            </div>
                        </div>
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
        </section>
    );
}
