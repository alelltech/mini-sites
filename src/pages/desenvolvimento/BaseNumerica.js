import React, { useState, useEffect } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

export default function BaseNumerica() {
    const [decimal, setDecimal] = useState('');
    const [binary, setBinary] = useState('');
    const [octal, setOctal] = useState('');
    const [hexadecimal, setHexadecimal] = useState('');

    useEffect(() => {
        if (decimal === '') {
            setBinary('');
            setOctal('');
            setHexadecimal('');
            return;
        }
        
        const dec = parseInt(decimal);
        if (!isNaN(dec)) {
            setBinary(dec.toString(2));
            setOctal(dec.toString(8));
            setHexadecimal(dec.toString(16).toUpperCase());
        }
    }, [decimal]);

    function copyAll() {
        const text = `Decimal: ${decimal}\nBinário: ${binary}\nOctal: ${octal}\nHexadecimal: ${hexadecimal}`;
        copyToClipboard(text).then(() => {
            alert('Copiado!');
        });
    }

    function clear() {
        setDecimal('');
        setBinary('');
        setOctal('');
        setHexadecimal('');
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>🔢 Conversor de Base Numérica</h1>
                <p className="description">Converta entre bases numéricas: binário, octal, hexadecimal e decimal</p>
            </div>
            <div className="tool-container">
                <div className="form-group">
                    <label htmlFor="decimal">Número Decimal:</label>
                    <input
                        id="decimal"
                        type="number"
                        placeholder="Digite um número decimal..."
                        value={decimal}
                        onChange={(e) => setDecimal(e.target.value)}
                        style={{ width: '100%', padding: '10px', fontFamily: 'monospace', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button
                        onClick={clear}
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

                {decimal && (
                    <div className="result">
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                        <strong>Decimal</strong>
                                    </td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{decimal}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                        <strong>Binário</strong>
                                    </td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{binary}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                        <strong>Octal</strong>
                                    </td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{octal}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                        <strong>Hexadecimal</strong>
                                    </td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{hexadecimal}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            onClick={copyAll}
                            style={{
                                padding: '8px 16px',
                                marginTop: '10px',
                                background: '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                            }}
                        >
                            Copiar Tudo
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
