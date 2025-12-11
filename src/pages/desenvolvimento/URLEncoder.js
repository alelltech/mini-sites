import React, { useState, useEffect } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

export default function URLEncoder() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('');

    useEffect(() => {
        if (input.trim() === '') {
            setOutput('');
            setMode('');
            return;
        }
        try {
            // Auto-detect if it's encoded or not
            const decoded = decodeURIComponent(input);
            if (decoded !== input) {
                setOutput(decoded);
                setMode('decodified');
            } else {
                const encoded = encodeURIComponent(input);
                setOutput(encoded);
                setMode('encoded');
            }
        } catch (e) {
            try {
                const encoded = encodeURIComponent(input);
                setOutput(encoded);
                setMode('encoded');
            } catch (e2) {
                setOutput('');
                setMode('');
            }
        }
    }, [input]);

    function handleEncode() {
        try {
            const result = encodeURIComponent(input);
            setOutput(result);
            setMode('encoded');
        } catch (e) {
            alert('Erro ao codificar');
        }
    }

    function handleDecode() {
        try {
            const result = decodeURIComponent(input);
            setOutput(result);
            setMode('decodified');
        } catch (e) {
            alert('URL inválida');
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
        setMode('');
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>🔗 URL Encoder/Decoder</h1>
                <p className="description">Codifique e decodifique URLs</p>
            </div>
            <div className="tool-container">
                <div className="form-group">
                    <label htmlFor="input">Digite a URL ou texto:</label>
                    <textarea
                        id="input"
                        placeholder="Digite a URL ou texto..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{ width: '100%', minHeight: '120px', padding: '10px', fontFamily: 'monospace', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
                    <button
                        onClick={handleEncode}
                        style={{
                            padding: '10px 20px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Codificar URL
                    </button>
                    <button
                        onClick={handleDecode}
                        style={{
                            padding: '10px 20px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Decodificar URL
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

                {output && (
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
                            overflowX: 'auto',
                            wordWrap: 'break-word'
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
