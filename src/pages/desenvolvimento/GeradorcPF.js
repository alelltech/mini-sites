import React, { useState } from 'react';
import '../../styles/conversor.css';

export default function Geradorcpf() {
    const [cpfs, setCpfs] = useState('');

    function generateCPF() {
        let cpf = '';
        for (let i = 0; i < 9; i++) {
            cpf += Math.floor(Math.random() * 10);
        }

        let d1 = cpf.split('').reduce((acc, val, i) => acc + (val * (10 - i)), 0) % 11;
        d1 = d1 % 10;

        let d2 = (cpf + d1).split('').reduce((acc, val, i) => acc + (val * (11 - i)), 0) % 11;
        d2 = d2 % 10;

        return cpf + d1 + d2;
    }

    function formatCPF(cpf) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    function generateOne() {
        const cpf = generateCPF();
        setCpfs(formatCPF(cpf));
    }

    function generateMultiple() {
        const cpfsArray = [];
        for (let i = 0; i < 10; i++) {
            cpfsArray.push(formatCPF(generateCPF()));
        }
        setCpfs(cpfsArray.join('\n'));
    }

    function copyResult() {
        navigator.clipboard.writeText(cpfs);
        alert('Copiado!');
    }

    function clear() {
        setCpfs('');
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>🔢 Gerador de CPF</h1>
                <p className="description">Gera CPFs válidos (apenas para testes)</p>
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
                        Gerar Um CPF
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
                        Gerar 10 CPFs
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

                {cpfs && (
                    <div className="result">
                        <strong>CPF(s) Gerado(s):</strong>
                        <pre style={{
                            background: 'white',
                            padding: '15px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            marginTop: '10px',
                            marginBottom: '10px',
                            overflowX: 'auto'
                        }}>
                            {cpfs}
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
            </div>
        </section>
    );
}
