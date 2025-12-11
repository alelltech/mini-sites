import React, { useState } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

function generateCNPJ() {
    let cnpj = '';
    for (let i = 0; i < 8; i++) {
        cnpj += Math.floor(Math.random() * 10);
    }
    cnpj = cnpj + '0001' + '00';
    
    let d1 = cnpj.substring(0, 12).split('').reduce((acc, val, i) =>
        acc + (parseInt(val) * ((i % 8) + 2)), 0) % 11;
    d1 = d1 % 10;
    
    let d2 = (cnpj.substring(0, 12) + d1).split('').reduce((acc, val, i) =>
        acc + (parseInt(val) * ((i % 8) + 2)), 0) % 11;
    d2 = d2 % 10;
    
    return cnpj.substring(0, 12) + d1 + d2;
}

function formatCNPJ(cnpj) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

export default function GeradorCNPJ() {
    const [output, setOutput] = useState('');

    function generateOne() {
        const cnpj = generateCNPJ();
        setOutput(formatCNPJ(cnpj));
    }

    function generateMultiple() {
        const cnpjs = [];
        for (let i = 0; i < 10; i++) {
            cnpjs.push(formatCNPJ(generateCNPJ()));
        }
        setOutput(cnpjs.join('\n'));
    }

    function copyResult() {
        copyToClipboard(output).then(() => {
            alert('Copiado!');
        });
    }

    function clear() {
        setOutput('');
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>🏢 Gerador de CNPJ</h1>
                <p className="description">Gera CNPJs válidos (apenas para testes)</p>
            </div>
            <div className="tool-container">
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <button
                        onClick={generateOne}
                        style={{
                            padding: '10px 20px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Gerar Um CNPJ
                    </button>
                    <button
                        onClick={generateMultiple}
                        style={{
                            padding: '10px 20px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Gerar 10 CNPJs
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
                        <strong>CNPJ(s) Gerado(s):</strong>
                        <pre style={{
                            background: '#fff',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            marginTop: '10px',
                            marginBottom: '10px',
                            overflowX: 'auto'
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
                    </div>
                )}
            </div>
        </section>
    );
}
