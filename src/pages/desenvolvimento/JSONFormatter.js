import React, { useState, useEffect } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

export default function JSONFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [resultTitle, setResultTitle] = useState('');

    useEffect(() => {
        if (input.trim() === '') {
            setOutput('');
            setResultTitle('');
            return;
        }
        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 2);
            setOutput(formatted);
            setResultTitle('✓ JSON Válido - Formatado:');
        } catch (e) {
            setResultTitle('✗ JSON Inválido: ' + e.message);
            setOutput('');
        }
    }, [input]);

    function handleFormat() {
        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 2);
            setOutput(formatted);
            setResultTitle('Formatado:');
        } catch (e) {
            alert('JSON inválido: ' + e.message);
        }
    }

    function handleMinify() {
        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            setOutput(minified);
            setResultTitle('Minificado:');
        } catch (e) {
            alert('JSON inválido: ' + e.message);
        }
    }

    function handleValidate() {
        try {
            JSON.parse(input);
            alert('✓ JSON válido!');
        } catch (e) {
            alert('✗ JSON inválido: ' + e.message);
        }
    }

    function copyResult() {
        copyToClipboard(output).then(() => {
            alert('Copiado!');
        });
    }

    function clear() {
        setInput('');
        setOutput('');
        setResultTitle('');
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>📋 Formatador JSON</h1>
                <p className="description">Formate e valide JSON online</p>
            </div>
            <div className="tool-container">
                <div className="form-group">
                    <label htmlFor="input">Cole seu JSON aqui:</label>
                    <textarea
                        id="input"
                        placeholder="Cole seu JSON aqui..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{ width: '100%', minHeight: '150px', padding: '10px', fontFamily: 'monospace', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
                    <button
                        onClick={handleFormat}
                        style={{
                            padding: '10px 20px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Formatar
                    </button>
                    <button
                        onClick={handleMinify}
                        style={{
                            padding: '10px 20px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Minificar
                    </button>
                    <button
                        onClick={handleValidate}
                        style={{
                            padding: '10px 20px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Validar
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

                {resultTitle && (
                    <div className="result">
                        <strong>{resultTitle}</strong>
                        {output && (
                            <>
                                <pre style={{
                                    background: '#fff',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    overflow: 'auto',
                                    maxHeight: '300px',
                                    marginTop: '10px',
                                    marginBottom: '10px'
                                }}>
                                    {output}
                                </pre>
                                <button
                                    onClick={copyResult}
                                    style={{
                                        padding: '8px 16px',
                                        background: '#28a745',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '12px'
                                    }}
                                >
                                    Copiar
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
