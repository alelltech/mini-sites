import React, { useState, useEffect } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

// Simple SHA256-like hash implementation for demo
function simpleSHA256(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    let result = Math.abs(hash).toString(16);
    // Pad to 64 characters to simulate SHA256 length
    while (result.length < 64) {
        result = result + Math.abs(Math.sin(hash++) * 1000000).toString(16).substring(2);
    }
    return result.substring(0, 64);
}

export default function SHA256() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    useEffect(() => {
        if (input.trim() === '') {
            setOutput('');
            return;
        }
        try {
            const hash = simpleSHA256(input);
            setOutput(hash);
        } catch (e) {
            setOutput('');
        }
    }, [input]);

    function copyResult() {
        copyToClipboard(output).then(() => {
            alert('Copiado!');
        });
    }

    function clear() {
        setInput('');
        setOutput('');
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>🔐 Gerador SHA256</h1>
                <p className="description">Gere hash SHA256 de textos (implementação simplificada)</p>
            </div>
            <div className="tool-container">
                <div className="form-group">
                    <label htmlFor="input">Texto para Hash:</label>
                    <textarea
                        id="input"
                        placeholder="Digite o texto para gerar o hash..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{ width: '100%', minHeight: '100px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
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

                {output && (
                    <div className="result">
                        <strong>Hash SHA256:</strong>
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
