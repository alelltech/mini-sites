import React, { useState } from 'react';
import { isValidCPF } from '../../utils/globalFunctions.js';

export default function CPFValidador() {
    const [cpf, setCpf] = useState('');
    const [resultado, setResultado] = useState(null);

    function validar() {
        const cpfLimpo = cpf.replace(/\D/g, '');

        if (cpfLimpo.length !== 11) {
            setResultado({ valido: false, mensagem: 'CPF inválido (deve ter 11 dígitos)' });
            return;
        }

        if (/^(\d)\1{10}$/.test(cpfLimpo)) {
            setResultado({ valido: false, mensagem: 'CPF inválido (sequência repetida)' });
            return;
        }

        if (isValidCPF(cpf)) {
            setResultado({ valido: true, mensagem: '✓ CPF Válido' });
        } else {
            setResultado({ valido: false, mensagem: '✗ CPF Inválido' });
        }
    }

    function limpar() {
        setCpf('');
        setResultado(null);
    }

    return (
        <div style={{ 
            padding: '20px',
            maxWidth: '800px',
            margin: '0 auto'
        }}>
            <div className="p-card p-shadow-2" style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '30px'
            }}>
                <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                    <h1 style={{ 
                        fontSize: '28px', 
                        fontWeight: '600',
                        marginBottom: '10px',
                        color: '#333'
                    }}>
                        <i className="icon-check" style={{ marginRight: '10px' }}></i>
                        Validador de CPF
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Valide CPFs brasileiros</p>
                </div>

                <form style={{ marginBottom: '20px' }} onSubmit={(e) => { e.preventDefault(); validar(); }}>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="cpf" style={{ 
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#333'
                        }}>
                            CPF:
                        </label>
                        <input
                            className="p-input"
                            type="text"
                            id="cpf"
                            placeholder="000.000.000-00"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                fontSize: '16px',
                                border: '1px solid rgba(0,0,0,0.1)',
                                borderRadius: '10px',
                                background: 'rgba(255,255,255,0.9)',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    </div>
                </form>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button
                        className="p-btn p-shadow-1"
                        onClick={validar}
                        style={{
                            padding: '12px 24px',
                            background: 'linear-gradient(145deg, rgba(102, 126, 234, 0.9), rgba(102, 126, 234, 0.7))',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                    >
                        Validar CPF
                    </button>
                    <button
                        className="p-btn p-shadow-1"
                        onClick={limpar}
                        style={{
                            padding: '12px 24px',
                            background: 'linear-gradient(145deg, rgba(108, 117, 125, 0.9), rgba(108, 117, 125, 0.7))',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                    >
                        Limpar
                    </button>
                </div>

                {resultado && (
                    <div className="p-card p-shadow-1" style={{
                        background: resultado.valido ? 'rgba(212, 237, 218, 0.7)' : 'rgba(248, 215, 218, 0.7)',
                        borderRadius: '15px',
                        padding: '20px',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${resultado.valido ? 'rgba(40, 167, 69, 0.3)' : 'rgba(220, 53, 69, 0.3)'}`,
                        textAlign: 'center'
                    }}>
                        <div style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            margin: '10px 0',
                            color: resultado.valido ? '#155724' : '#721c24'
                        }}>
                            {resultado.mensagem}
                        </div>
                    </div>
                )}

                <div className="p-card p-shadow-1" style={{ 
                    marginTop: '30px', 
                    background: 'rgba(255,255,255,0.5)', 
                    borderRadius: '15px',
                    padding: '20px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)'
                }}>
                    <h3 style={{ marginTop: 0, color: '#333', fontSize: '18px', fontWeight: '600' }}>📋 Como Funciona</h3>
                    <p style={{ margin: '0 0 10px 0', color: '#555' }}>
                        O CPF (Cadastro de Pessoas Físicas) é um número único de 11 dígitos.
                        Os dois últimos dígitos são dígitos verificadores calculados a partir dos 9 primeiros.
                    </p>
                    <p style={{ margin: 0, color: '#666' }}>
                        Este validador verifica se o CPF possui os dígitos verificadores corretos.
                    </p>
                </div>
            </div>
        </div>
    );
}
