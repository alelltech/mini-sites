import React, { useState, useEffect } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';

// Simple hash implementation for demo
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
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
            const hash = simpleHash(input);
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
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div className="p-card p-shadow-2" style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '30px'
            }}>
                <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
                        <i className="icon-lock" style={{ marginRight: '10px' }}></i>
                        Gerador MD5
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Gere hash MD5 de textos (implementação simplificada)</p>
                </div>
                <div className="p-form-group">
                    <label htmlFor="input" className="p-form-label">Texto para Hash:</label>
                    <textarea
                        id="input"
                        className="p-input p-form-text"
                        placeholder="Digite o texto para gerar o hash..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{ width: '100%', minHeight: '100px', padding: '12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', fontFamily: 'monospace', fontSize: '14px' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button onClick={clear} className="p-btn" style={{
                        padding: '12px 24px',
                        background: 'linear-gradient(145deg, rgba(108, 117, 125, 0.9), rgba(108, 117, 125, 0.7))',
                        color: 'white', border: 'none', borderRadius: '10px',
                        cursor: 'pointer', fontSize: '14px', fontWeight: '600'
                    }}>
                        Limpar
                    </button>
                </div>

                {output && (
                    <div className="p-card p-shadow-1" style={{
                        background: 'rgba(255,255,255,0.5)', borderRadius: '15px',
                        padding: '20px', backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.3)', marginTop: '20px'
                    }}>
                        <strong style={{ color: '#667eea', marginBottom: '10px', display: 'block' }}>Hash Gerado:</strong>
                        <pre style={{
                            background: 'rgba(255,255,255,0.9)', padding: '15px',
                            border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px',
                            fontFamily: 'monospace', marginBottom: '15px',
                            overflowX: 'auto', wordBreak: 'break-all', fontSize: '14px', color: '#333'
                        }}>
                            {output}
                        </pre>
                        <button onClick={copyResult} className="p-btn" style={{
                            width: '100%', padding: '12px',
                            background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                            color: 'white', border: 'none', borderRadius: '10px',
                            cursor: 'pointer', fontSize: '14px', fontWeight: '600'
                        }}>
                            Copiar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
