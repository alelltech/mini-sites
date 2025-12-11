import React, { useState, useEffect } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

export default function Base64() {
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
            // Auto-detect if it's base64 or text
            try {
                const decoded = decodeURIComponent(escape(atob(input)));
                setOutput(decoded);
                setMode('decodified');
            } catch (e) {
                try {
                    const encoded = btoa(unescape(encodeURIComponent(input)));
                    setOutput(encoded);
                    setMode('encoded');
                } catch (e2) {
                    setOutput('');
                    setMode('');
                }
            }
        } catch (e) {
            setOutput('');
            setMode('');
        }
    }, [input]);

    function handleEncode() {
        try {
            const result = btoa(unescape(encodeURIComponent(input)));
            setOutput(result);
            setMode('encoded');
        } catch (e) {
            alert('Erro ao codificar');
        }
    }

    function handleDecode() {
        try {
            const result = decodeURIComponent(escape(atob(input)));
            setOutput(result);
            setMode('decodified');
        } catch (e) {
            alert('Base64 inválido');
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
                <h1>🔐 Base64 Encoder/Decoder</h1>
                <p className="description">Codifique e decodifique texto em Base64</p>
            </div>
            <div className="tool-container">
                <div className="form-group">
                    <label htmlFor="input">Texto ou Base64:</label>
                    <textarea
                        id="input"
                        placeholder="Digite o texto ou Base64..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{ width: '100%', minHeight: '100px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
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
                        Codificar
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
                        Decodificar
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
                        <strong>
                            {mode === 'decodified' ? 'Decodificado' : 'Codificado'}:
                        </strong>
                        <pre style={{
                            background: 'white',
                            padding: '15px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontFamily: 'monospace',
                            marginTop: '10px',
                            marginBottom: '10px',
                            overflowX: 'auto',
                            wordBreak: 'break-all'
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
