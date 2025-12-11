import React, { useState, useEffect } from 'react';
import '../../styles/conversor.css';

export default function Idade() {
    const [dataNascimento, setDataNascimento] = useState('');
    const [resultado, setResultado] = useState(null);

    useEffect(() => {
        calcular();
    }, [dataNascimento]);

    function calcular() {
        if (!dataNascimento) {
            setResultado(null);
            return;
        }

        const dataNasc = new Date(dataNascimento);
        const hoje = new Date();

        if (dataNasc > hoje) {
            setResultado(null);
            return;
        }

        let anos = hoje.getFullYear() - dataNasc.getFullYear();
        let meses = hoje.getMonth() - dataNasc.getMonth();
        let dias = hoje.getDate() - dataNasc.getDate();

        if (dias < 0) {
            meses--;
            dias += new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
        }

        if (meses < 0) {
            anos--;
            meses += 12;
        }

        setResultado({
            anos,
            meses,
            dias
        });
    }

    function limpar() {
        setDataNascimento('');
        setResultado(null);
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>🎂 Calculadora de Idade</h1>
                <p className="description">Calcule sua idade exata em anos, meses e dias</p>
            </div>
            <div className="tool-container">
                <form className="tool-form">
                    <div className="form-group">
                        <label htmlFor="dataNascimento">Data de Nascimento:</label>
                        <input
                            type="date"
                            id="dataNascimento"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                        />
                    </div>
                </form>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
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
                    <div className="result">
                        <div style={{
                            fontSize: '2.5rem',
                            fontWeight: 'bold',
                            color: '#667eea',
                            marginBottom: '15px',
                            textAlign: 'center'
                        }}>
                            {resultado.anos} anos
                        </div>
                        <p style={{
                            fontSize: '1.2rem',
                            margin: 0,
                            textAlign: 'center',
                            color: '#666'
                        }}>
                            {resultado.meses} meses e {resultado.dias} dias
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
