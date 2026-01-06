import React, { useState, useEffect } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';

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
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="p-card p-shadow-2" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)', backdropFilter: 'blur(40px) saturate(150%)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '30px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 10px 0' }}>
                    <i className="icon-shuffle"></i> Conversor de Base Numérica
                </h1>
                <p style={{ color: '#999', marginBottom: '25px' }}>Converta entre bases numéricas: binário, octal, hexadecimal e decimal</p>
                
                <div className="p-form-group" style={{ marginBottom: '20px' }}>
                    <label htmlFor="decimal" className="p-form-label">Número Decimal:</label>
                    <input
                        id="decimal"
                        className="p-input p-form-text"
                        type="number"
                        placeholder="Digite um número decimal..."
                        value={decimal}
                        onChange={(e) => setDecimal(e.target.value)}
                        style={{ width: '100%', padding: '10px', fontFamily: 'monospace', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px', marginBottom: '20px' }}>
                    <button
                        onClick={clear}
                        className="p-btn"
                        style={{
                            padding: '10px 20px',
                            background: 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Limpar
                    </button>
                    <button
                        onClick={copyAll}
                        className="p-btn"
                        style={{
                            padding: '10px 20px',
                            background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Copiar Tudo
                    </button>
                </div>

                {decimal && (
                    <div className="p-card" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '15px', padding: '20px', marginTop: '20px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.2)', fontWeight: '700' }}>Decimal</td>
                                    <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.2)', fontFamily: 'monospace', fontSize: '14px' }}>{decimal}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.2)', fontWeight: '700' }}>Binário</td>
                                    <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.2)', fontFamily: 'monospace', fontSize: '14px' }}>{binary}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.2)', fontWeight: '700' }}>Octal</td>
                                    <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.2)', fontFamily: 'monospace', fontSize: '14px' }}>{octal}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', fontWeight: '700' }}>Hexadecimal</td>
                                    <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '14px' }}>{hexadecimal}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
