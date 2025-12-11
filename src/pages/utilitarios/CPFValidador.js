import React, { useState } from 'react';
import '../../styles/conversor.css';
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
        <section className="tool-section">
            <div className="tool-header">
                <h1>🆔 Validador de CPF</h1>
                <p className="description">Valide CPFs brasileiros</p>
            </div>
            <div className="tool-container">
                <form className="tool-form" onSubmit={(e) => { e.preventDefault(); validar(); }}>
                    <div className="form-group">
                        <label htmlFor="cpf">CPF:</label>
                        <input
                            type="text"
                            id="cpf"
                            placeholder="000.000.000-00"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    </div>
                </form>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button
                        onClick={validar}
                        style={{
                            padding: '10px 20px',
                            background: '#667eea',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Validar CPF
                    </button>
                    <button
                        onClick={limpar}
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

                {resultado && (
                    <div className="result" style={{
                        background: resultado.valido ? '#d4edda' : '#f8d7da',
                        borderLeftColor: resultado.valido ? '#28a745' : '#dc3545',
                        marginTop: '30px'
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

                <div style={{ marginTop: '30px', background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
                    <h3 style={{ marginTop: 0 }}>📋 Como Funciona</h3>
                    <p style={{ margin: '0 0 10px 0' }}>
                        O CPF (Cadastro de Pessoas Físicas) é um número único de 11 dígitos.
                        Os dois últimos dígitos são dígitos verificadores calculados a partir dos 9 primeiros.
                    </p>
                    <p style={{ margin: 0, color: '#666' }}>
                        Este validador verifica se o CPF possui os dígitos verificadores corretos.
                    </p>
                </div>
            </div>
        </section>
    );
}
