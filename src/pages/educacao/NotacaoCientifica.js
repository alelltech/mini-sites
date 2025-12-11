import React, { useState, useEffect } from 'react';
import '../../styles/conversor.css';

export default function NotacaoCientifica() {
    const [numero, setNumero] = useState('');
    const [resultado, setResultado] = useState(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if (numero === '') {
            setResultado(null);
            setShowResult(false);
            return;
        }

        const numValue = parseFloat(numero);
        if (isNaN(numValue)) {
            setShowResult(false);
            return;
        }

        const eNotation = numValue.toExponential(4);
        let expoente = 0;
        if (numValue !== 0) {
            expoente = Math.floor(Math.log10(Math.abs(numValue)));
        }

        setResultado({
            original: numValue,
            cientifico: eNotation,
            expoente: expoente
        });
        setShowResult(true);
    }, [numero]);

    function handleConverter() {
        const numValue = parseFloat(numero);
        if (isNaN(numValue) || numero === '') {
            setShowResult(false);
            return;
        }

        const eNotation = numValue.toExponential(4);
        let expoente = 0;
        if (numValue !== 0) {
            expoente = Math.floor(Math.log10(Math.abs(numValue)));
        }

        setResultado({
            original: numValue,
            cientifico: eNotation,
            expoente: expoente
        });
        setShowResult(true);
    }

    function handleLimpar() {
        setNumero('');
        setResultado(null);
        setShowResult(false);
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>🔬 Conversor Notação Científica</h1>
                <p className="description">Converta números para notação científica</p>
            </div>
            <div className="tool-container">
                <div className="form-group">
                    <label htmlFor="numero">Número:</label>
                    <input
                        id="numero"
                        type="number"
                        placeholder="Ex: 0.00123 ou 1500000"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={handleConverter}
                        style={{
                            padding: '10px 20px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Converter
                    </button>
                    <button
                        onClick={handleLimpar}
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
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                        <strong>Número Original</strong>
                                    </td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{resultado.original}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                        <strong>Notação Científica</strong>
                                    </td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', fontFamily: 'monospace' }}>
                                        {resultado.cientifico}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                        <strong>Expoente</strong>
                                    </td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>10<sup>{resultado.expoente}</sup></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
}
