import React, { useState } from 'react';

export default function UUID() {
    const [uuids, setUuids] = useState('');

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function generateOne() {
        const uuid = generateUUID();
        setUuids(uuid);
    }

    function generateMultiple() {
        const uuidsArray = [];
        for(let i = 0; i < 10; i++) {
            uuidsArray.push(generateUUID());
        }
        setUuids(uuidsArray.join('\n'));
    }

    function copyResult() {
        navigator.clipboard.writeText(uuids);
        alert('Copiado!');
    }

    function clear() {
        setUuids('');
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
                        <i className="icon-key" style={{ marginRight: '10px' }}></i>
                        Gerador de UUID
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Gere identificadores universais únicos (UUID v4)</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <button onClick={generateOne} className="p-btn" style={{
                        flex: '1', padding: '12px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white', border: 'none', borderRadius: '10px',
                        cursor: 'pointer', fontSize: '14px', fontWeight: '600',
                        transition: 'all 0.3s ease'
                    }}>
                        Gerar Um UUID
                    </button>
                    <button onClick={generateMultiple} className="p-btn" style={{
                        flex: '1', padding: '12px',
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        color: 'white', border: 'none', borderRadius: '10px',
                        cursor: 'pointer', fontSize: '14px', fontWeight: '600',
                        transition: 'all 0.3s ease'
                    }}>
                        Gerar 10 UUIDs
                    </button>
                    <button onClick={clear} className="p-btn" style={{
                        padding: '12px 24px',
                        background: 'linear-gradient(145deg, rgba(108, 117, 125, 0.9), rgba(108, 117, 125, 0.7))',
                        color: 'white', border: 'none', borderRadius: '10px',
                        cursor: 'pointer', fontSize: '14px', fontWeight: '600'
                    }}>
                        Limpar
                    </button>
                </div>

                {uuids && (
                    <div className="p-card p-shadow-1" style={{
                        background: 'rgba(255,255,255,0.5)', borderRadius: '15px',
                        padding: '20px', backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.3)'
                    }}>
                        <pre style={{
                            background: 'rgba(255,255,255,0.9)', padding: '15px',
                            border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px',
                            overflowX: 'auto', marginBottom: '15px', fontFamily: 'monospace',
                            fontSize: '14px', color: '#333'
                        }}>
                            {uuids}
                        </pre>
                        <button onClick={copyResult} className="p-btn" style={{
                            width: '100%', padding: '12px',
                            background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                            color: 'white', border: 'none', borderRadius: '10px',
                            cursor: 'pointer', fontSize: '14px', fontWeight: '600'
                        }}>
                            📋 Copiar Tudo
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
