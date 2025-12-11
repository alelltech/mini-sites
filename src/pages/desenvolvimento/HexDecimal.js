import React, { useState, useEffect } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

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
        <section className="tool-section">
            <div className="tool-header">
                <h1>🔄 Conversor Hex/Decimal</h1>
                <p className="description">Converta entre hexadecimal e decimal</p>
            </div>
            <div className="tool-container">
                <div className="form-group">
                    <label htmlFor="decimal">Valor Decimal:</label>
                    <input
                        id="decimal"
                        type="number"
                        placeholder="Digite um número decimal..."
                        value={decimal}
                        onChange={(e) => setDecimal(e.target.value)}
                        style={{ width: '100%', padding: '10px', fontFamily: 'monospace', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="hexadecimal">Valor Hexadecimal:</label>
                    <input
                        id="hexadecimal"
                        type="text"
                        placeholder="Digite um valor hex (ex: FF, 1A2B)..."
                        value={hexadecimal}
                        onChange={(e) => setHexadecimal(e.target.value)}
                        style={{ width: '100%', padding: '10px', fontFamily: 'monospace', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
                    <button
                        onClick={handleDecimalToHex}
                        style={{
                            padding: '10px 20px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        → Para Hex
                    </button>
                    <button
                        onClick={handleHexToDecimal}
                        style={{
                            padding: '10px 20px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        ← Para Decimal
                    </button>
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

                {resultText && (
                    <div className="result">
                        <strong>Resultado:</strong>
                        <pre style={{
                            background: 'white',
                            padding: '15px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontFamily: 'monospace',
                            marginTop: '10px',
                            marginBottom: '10px',
                            overflowX: 'auto'
                        }}>
                            {resultText}
                        </pre>
                        <button
                            onClick={copyResult}
                            style={{
                                padding: '8px 16px',
                                background: '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Copiar
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
