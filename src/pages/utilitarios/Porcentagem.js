import React, { useState, useEffect } from 'react';

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
        <div style={{ 
            padding: '20px',
            maxWidth: '800px',
            margin: '0 auto'
        }}>
            <div className="p-card p-shadow-2" style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '30px'
            }}>
                <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                    <h1 style={{ 
                        fontSize: '28px', 
                        fontWeight: '600',
                        marginBottom: '10px',
                        color: '#333'
                    }}>
                        <i className="icon-calculator" style={{ marginRight: '10px' }}></i>
                        Calculadora de Porcentagem
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Calcule porcentagens de qualquer valor</p>
                </div>

                <form style={{ marginBottom: '20px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="total" style={{ 
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#333'
                        }}>
                            Valor Total (R$):
                        </label>
                        <input
                            className="p-input"
                            type="number"
                            id="total"
                            placeholder="Ex: 200"
                            step="0.01"
                            value={total}
                            onChange={(e) => setTotal(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                fontSize: '16px',
                                border: '1px solid rgba(0,0,0,0.1)',
                                borderRadius: '10px',
                                background: 'rgba(255,255,255,0.9)',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="percentual" style={{ 
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#333'
                        }}>
                            Porcentagem (%):
                        </label>
                        <input
                            className="p-input"
                            type="number"
                            id="percentual"
                            placeholder="Ex: 15"
                            step="0.1"
                            value={percentual}
                            onChange={(e) => setPercentual(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                fontSize: '16px',
                                border: '1px solid rgba(0,0,0,0.1)',
                                borderRadius: '10px',
                                background: 'rgba(255,255,255,0.9)',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    </div>
                </form>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button
                        className="p-btn p-shadow-1"
                        onClick={limpar}
                        style={{
                            padding: '12px 24px',
                            background: 'linear-gradient(145deg, rgba(108, 117, 125, 0.9), rgba(108, 117, 125, 0.7))',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                    >
                        Limpar
                    </button>
                </div>

                {resultado && (
                    <div className="p-card p-shadow-1" style={{
                        background: 'rgba(255,255,255,0.5)',
                        borderRadius: '15px',
                        padding: '20px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.3)'
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ 
                                        padding: '12px 16px',
                                        background: 'rgba(255,255,255,0.7)',
                                        borderRadius: '8px 0 0 8px',
                                        fontWeight: '500',
                                        color: '#333'
                                    }}>
                                        Valor Total
                                    </td>
                                    <td style={{ 
                                        padding: '12px 16px',
                                        background: 'rgba(255,255,255,0.7)',
                                        borderRadius: '0 8px 8px 0',
                                        textAlign: 'right',
                                        color: '#333'
                                    }}>
                                        R$ {resultado.total}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ 
                                        padding: '12px 16px',
                                        background: 'rgba(255,255,255,0.7)',
                                        borderRadius: '8px 0 0 8px',
                                        fontWeight: '500',
                                        color: '#333'
                                    }}>
                                        Porcentagem
                                    </td>
                                    <td style={{ 
                                        padding: '12px 16px',
                                        background: 'rgba(255,255,255,0.7)',
                                        borderRadius: '0 8px 8px 0',
                                        textAlign: 'right',
                                        color: '#333'
                                    }}>
                                        {resultado.percentual}%
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ 
                                        padding: '12px 16px',
                                        background: 'rgba(40, 167, 69, 0.1)',
                                        borderRadius: '8px 0 0 8px',
                                        fontWeight: '500',
                                        color: '#333'
                                    }}>
                                        Valor da Porcentagem
                                    </td>
                                    <td style={{ 
                                        padding: '12px 16px',
                                        background: 'rgba(40, 167, 69, 0.1)',
                                        borderRadius: '0 8px 8px 0',
                                        textAlign: 'right',
                                        color: '#28a745',
                                        fontWeight: 'bold'
                                    }}>
                                        R$ {resultado.valorPercentual}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ 
                                        padding: '12px 16px',
                                        background: 'rgba(102, 126, 234, 0.1)',
                                        borderRadius: '8px 0 0 8px',
                                        fontWeight: '500',
                                        color: '#333'
                                    }}>
                                        Valor Final (com %)
                                    </td>
                                    <td style={{ 
                                        padding: '12px 16px',
                                        background: 'rgba(102, 126, 234, 0.1)',
                                        borderRadius: '0 8px 8px 0',
                                        textAlign: 'right',
                                        fontWeight: 'bold',
                                        color: '#667eea'
                                    }}>
                                        R$ {resultado.valorFinal}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
