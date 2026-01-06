import React, { useState, useEffect } from 'react';

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
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="p-card p-shadow-2" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)', backdropFilter: 'blur(40px) saturate(150%)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '30px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 10px 0' }}>
                    <i className="icon-microscope"></i> Conversor Notação Científica
                </h1>
                <p style={{ color: '#999', marginBottom: '25px' }}>Converta números para notação científica</p>
                
                <div className="p-form-group" style={{ marginBottom: '20px' }}>
                    <label htmlFor="numero" className="p-form-label">Número:</label>
                    <input
                        id="numero"
                        type="number"
                        placeholder="Ex: 0.00123 ou 1500000"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        className="p-input p-form-text"
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button
                        onClick={handleConverter}
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
                        Converter
                    </button>
                    <button
                        onClick={handleLimpar}
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

                {showResult && resultado && (
                    <div className="p-card" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '15px', padding: '20px', marginTop: '20px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: 0 }}>Resultado da Conversão</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                                    <td style={{ padding: '12px', fontWeight: '600' }}>
                                        Número Original:
                                    </td>
                                    <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '16px' }}>{resultado.original}</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                                    <td style={{ padding: '12px', fontWeight: '600' }}>
                                        Notação Científica:
                                    </td>
                                    <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '16px' }}>
                                        {resultado.cientifico}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', fontWeight: '600' }}>
                                        Expoente:
                                    </td>
                                    <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '16px' }}>10<sup>{resultado.expoente}</sup></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
