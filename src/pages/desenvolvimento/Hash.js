import React, { useState, useEffect } from 'react';
import '../../styles/conversor.css';

// Implementação simples de hash (para demo - usar CryptoJS em produção)
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Converter para inteiro 32-bit
    }
    return Math.abs(hash).toString(16);
}

export default function MD5() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    useEffect(() => {
        if (input.trim() === '') {
            setOutput('');
            return;
        }
        try {
            // Nota: Esta é uma função de hash simples. 
            // Em produção, use a biblioteca CryptoJS
            const hash = simpleHash(input);
            setOutput(hash);
        } catch (e) {
            setOutput('');
        }
    }, [input]);

    function copyResult() {
        navigator.clipboard.writeText(output);
        alert('Copiado!');
    }

    function clear() {
        setInput('');
        setOutput('');
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>🔐 Gerador de Hash</h1>
                <p className="description">Gere hash de qualquer texto (função de hash simples)</p>
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
                        <strong>Hash Gerado:</strong>
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
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            📋 Copiar
                        </button>
                    </div>
                )}

                <div style={{ marginTop: '30px', background: '#fff3cd', padding: '15px', borderRadius: '4px', borderLeft: '4px solid #ffc107' }}>
                    <strong>⚠️ Nota:</strong> Esta é uma função de hash simples para demonstração. 
                    Para produção com MD5/SHA256 real, use bibliotecas como CryptoJS.
                </div>
            </div>
        </section>
    );
}
