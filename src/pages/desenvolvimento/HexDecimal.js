import React, { useState, useEffect } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';

export default function HexDecimal() {
    const [decimal, setDecimal] = useState('');
    const [hexadecimal, setHexadecimal] = useState('');
    const [resultText, setResultText] = useState('');

    useEffect(() => {
        if (decimal === '') {
            setHexadecimal('');
            setResultText('');
            return;
        }
        try {
            const d = parseInt(decimal);
            if (!isNaN(d)) {
                const h = d.toString(16).toUpperCase();
                setHexadecimal(h);
                setResultText('Hexadecimal: ' + h);
            }
        } catch (e) {
            setResultText('');
        }
    }, [decimal]);

    useEffect(() => {
        if (hexadecimal === '') {
            setDecimal('');
            setResultText('');
            return;
        }
        try {
            const h = parseInt(hexadecimal, 16);
            if (!isNaN(h)) {
                setDecimal(h.toString());
                setResultText('Decimal: ' + h);
            }
        } catch (e) {
            setResultText('');
        }
    }, [hexadecimal]);

    function handleDecimalToHex() {
        if (!decimal || isNaN(decimal)) {
            alert('Digite um número decimal válido');
            return;
        }
        const hex = parseInt(decimal).toString(16).toUpperCase();
        setHexadecimal(hex);
        setResultText('Hexadecimal: ' + hex);
    }

    function handleHexToDecimal() {
        if (!hexadecimal) {
            alert('Digite um valor hexadecimal válido');
            return;
        }
        try {
            const dec = parseInt(hexadecimal, 16);
            setDecimal(dec.toString());
            setResultText('Decimal: ' + dec);
        } catch (e) {
            alert('Valor hexadecimal inválido');
        }
    }

    function copyResult() {
        copyToClipboard(resultText).then(() => {
            alert('Copiado!');
        });
    }

    function clear() {
        setDecimal('');
        setHexadecimal('');
        setResultText('');
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="p-card p-shadow-2" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)', backdropFilter: 'blur(40px) saturate(150%)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '30px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 10px 0' }}>
                    <i className="icon-shuffle"></i> Conversor Hex/Decimal
                </h1>
                <p style={{ color: '#999', marginBottom: '25px' }}>Converta entre hexadecimal e decimal</p>
                
                <div className="p-form-group" style={{ marginBottom: '15px' }}>
                    <label htmlFor="decimal" className="p-form-label">Valor Decimal:</label>
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

                <div className="p-form-group" style={{ marginBottom: '20px' }}>
                    <label htmlFor="hexadecimal" className="p-form-label">Valor Hexadecimal:</label>
                    <input
                        id="hexadecimal"
                        className="p-input p-form-text"
                        type="text"
                        placeholder="Digite um valor hex (ex: FF, 1A2B)..."
                        value={hexadecimal}
                        onChange={(e) => setHexadecimal(e.target.value)}
                        style={{ width: '100%', padding: '10px', fontFamily: 'monospace', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    <button
                        onClick={handleDecimalToHex}
                        className="p-btn"
                        style={{
                            padding: '10px 20px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        → Para Hex
                    </button>
                    <button
                        onClick={handleHexToDecimal}
                        className="p-btn"
                        style={{
                            padding: '10px 20px',
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        ← Para Decimal
                    </button>
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
                </div>

                {resultText && (
                    <div className="p-card" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '15px', padding: '20px' }}>
                        <p style={{ fontWeight: '700', marginTop: 0, marginBottom: '12px' }}>Resultado:</p>
                        <pre style={{
                            background: 'rgba(255,255,255,0.9)',
                            padding: '15px',
                            borderRadius: '8px',
                            fontFamily: 'monospace',
                            marginTop: '0',
                            marginBottom: '15px',
                            overflowX: 'auto',
                            fontSize: '14px'
                        }}>
                            {resultText}
                        </pre>
                        <button
                            onClick={copyResult}
                            className="p-btn"
                            style={{
                                padding: '10px 16px',
                                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            Copiar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
