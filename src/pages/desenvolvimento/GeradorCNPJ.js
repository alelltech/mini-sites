import React, { useState } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';

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
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="p-card p-shadow-2" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)', backdropFilter: 'blur(40px) saturate(150%)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '30px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 10px 0' }}>
                    <i className="icon-briefcase"></i> Gerador de CNPJ
                </h1>
                <p style={{ color: '#999', marginBottom: '25px' }}>Gera CNPJs válidos para testes</p>
                
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <button
                        onClick={generateOne}
                        className="p-btn"
                        style={{
                            padding: '10px 20px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Gerar Um CNPJ
                    </button>
                    <button
                        onClick={generateMultiple}
                        className="p-btn"
                        style={{
                            padding: '10px 20px',
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Gerar 10 CNPJs
                    </button>
                    <button
                        onClick={clear}
                        className="p-btn"
                        style={{
                            padding: '10px 20px',
                            background: 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Limpar
                    </button>
                </div>

                {output && (
                    <div className="p-card" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '15px', padding: '20px', marginTop: '20px' }}>
                        <p style={{ fontWeight: '700', marginTop: 0, marginBottom: '12px' }}>CNPJ(s) Gerado(s):</p>
                        <pre style={{
                            background: 'rgba(255,255,255,0.9)',
                            padding: '15px',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '700',
                            marginTop: '0',
                            marginBottom: '15px',
                            overflowX: 'auto',
                            fontFamily: 'monospace'
                        }}>
                            {output}
                        </pre>
                        <button
                            onClick={copyResult}
                            className="p-btn"
                            style={{
                                padding: '10px 16px',
                                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '600'
                            }}
                        >
                            Copiar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
