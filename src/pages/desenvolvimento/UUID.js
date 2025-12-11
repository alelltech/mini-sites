import React, { useState } from 'react';
import '../../styles/conversor.css';

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
        <section className="tool-section">
            <div className="tool-header">
                <h1>🔑 Gerador de UUID</h1>
                <p className="description">Gere identificadores universais únicos (UUID v4)</p>
            </div>
            <div className="tool-container">
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <button
                        onClick={generateOne}
                        style={{
                            padding: '10px 20px',
                            background: '#667eea',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Gerar Um UUID
                    </button>
                    <button
                        onClick={generateMultiple}
                        style={{
                            padding: '10px 20px',
                            background: '#764ba2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Gerar 10 UUIDs
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

                {uuids && (
                    <div className="result">
                        <strong>UUIDs Gerados:</strong>
                        <pre style={{
                            background: 'white',
                            padding: '15px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            overflowX: 'auto',
                            marginTop: '10px',
                            marginBottom: '10px'
                        }}>
                            {uuids}
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
                            📋 Copiar Tudo
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
