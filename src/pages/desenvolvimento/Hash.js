import React, { useState, useEffect } from 'react';

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
                        Gerador de Hash
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Gere hash de qualquer texto (função de hash simples)</p>
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
                            📋 Copiar
                        </button>
                    </div>
                )}

                <div style={{ marginTop: '30px', background: 'rgba(255, 243, 205, 0.7)', padding: '15px', borderRadius: '10px', borderLeft: '4px solid #ffc107' }}>
                    <strong>⚠️ Nota:</strong> Esta é uma função de hash simples para demonstração. 
                    Para produção com MD5/SHA256 real, use bibliotecas como CryptoJS.
                </div>
            </div>
        </div>
    );
}
