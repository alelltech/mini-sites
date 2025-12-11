import React, { useState, useEffect } from 'react';
import '../../styles/conversor.css';

export default function Porcentagem() {
    const [total, setTotal] = useState('');
    const [percentual, setPercentual] = useState('');
    const [resultado, setResultado] = useState(null);

    useEffect(() => {
        calcular();
    }, [total, percentual]);

    function calcular() {
        const totalVal = parseFloat(total);
        const percentualVal = parseFloat(percentual);

        if (!totalVal || totalVal <= 0 || !percentualVal) {
            setResultado(null);
            return;
        }

        const valorPercentual = (totalVal * percentualVal) / 100;
        const valorFinal = totalVal + valorPercentual;

        setResultado({
            total: totalVal.toFixed(2),
            percentual: percentualVal,
            valorPercentual: valorPercentual.toFixed(2),
            valorFinal: valorFinal.toFixed(2)
        });
    }

    function limpar() {
        setTotal('');
        setPercentual('');
        setResultado(null);
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>📊 Calculadora de Porcentagem</h1>
                <p className="description">Calcule porcentagens de qualquer valor</p>
            </div>
            <div className="tool-container">
                <form className="tool-form">
                    <div className="form-group">
                        <label htmlFor="total">Valor Total:</label>
                        <input
                            type="number"
                            id="total"
                            placeholder="Ex: 200"
                            step="0.01"
                            value={total}
                            onChange={(e) => setTotal(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="percentual">Porcentagem (%):</label>
                        <input
                            type="number"
                            id="percentual"
                            placeholder="Ex: 15"
                            step="0.1"
                            value={percentual}
                            onChange={(e) => setPercentual(e.target.value)}
                        />
                    </div>
                </form>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
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

                {resultado && (
                    <div className="result">
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                        <strong>Valor Total</strong>
                                    </td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                        R$ {resultado.total}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                        <strong>Porcentagem</strong>
                                    </td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                        {resultado.percentual}%
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                        <strong>Valor da Porcentagem</strong>
                                    </td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', color: '#28a745', fontWeight: 'bold' }}>
                                        R$ {resultado.valorPercentual}
                                    </td>
                                </tr>
                                <tr style={{ background: '#f0f0f0' }}>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                        <strong>Valor Final (com %)</strong>
                                    </td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold', color: '#667eea' }}>
                                        R$ {resultado.valorFinal}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
}
