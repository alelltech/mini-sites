import React, { useState, useEffect } from 'react';
import '../../styles/conversor.css';

export default function IMC() {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [resultado, setResultado] = useState(null);

    useEffect(() => {
        calcular();
    }, [peso, altura]);

    function calcular() {
        const pesoVal = parseFloat(peso);
        const alturaVal = parseFloat(altura);

        if (!pesoVal || pesoVal <= 0 || !alturaVal || alturaVal <= 0) {
            setResultado(null);
            return;
        }

        const alturaMetros = alturaVal / 100;
        const imc = (pesoVal / (alturaMetros * alturaMetros)).toFixed(1);

        let categoria = '';
        let cor = '';
        if (imc < 18.5) {
            categoria = 'Abaixo do peso';
            cor = '#ffc107';
        } else if (imc < 25) {
            categoria = 'Peso normal';
            cor = '#28a745';
        } else if (imc < 30) {
            categoria = 'Sobrepeso';
            cor = '#fd7e14';
        } else if (imc < 35) {
            categoria = 'Obesidade Grau I';
            cor = '#dc3545';
        } else if (imc < 40) {
            categoria = 'Obesidade Grau II';
            cor = '#bd2130';
        } else {
            categoria = 'Obesidade Grau III';
            cor = '#721c24';
        }

        setResultado({ imc, categoria, cor });
    }

    function limpar() {
        setPeso('');
        setAltura('');
        setResultado(null);
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>⚖️ Calculadora de IMC</h1>
                <p className="description">Calcule seu Índice de Massa Corporal</p>
            </div>
            <div className="tool-container">
                <form className="tool-form">
                    <div className="form-group">
                        <label htmlFor="peso">Peso (kg):</label>
                        <input
                            type="number"
                            id="peso"
                            placeholder="Ex: 75"
                            step="0.1"
                            value={peso}
                            onChange={(e) => setPeso(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="altura">Altura (cm):</label>
                        <input
                            type="number"
                            id="altura"
                            placeholder="Ex: 180"
                            value={altura}
                            onChange={(e) => setAltura(e.target.value)}
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
                            color: resultado.cor,
                            marginBottom: '10px'
                        }}>
                            {resultado.imc}
                        </div>
                        <p style={{
                            fontSize: '1.3rem',
                            margin: 0,
                            fontWeight: 'bold',
                            color: resultado.cor
                        }}>
                            {resultado.categoria}
                        </p>
                    </div>
                )}

                <div style={{ marginTop: '30px', background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
                    <h3 style={{ marginTop: 0 }}>📊 Classificação do IMC</h3>
                    <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                        <li>Abaixo de 18,5: Abaixo do peso</li>
                        <li>18,5 - 24,9: Peso normal</li>
                        <li>25,0 - 29,9: Sobrepeso</li>
                        <li>30,0 - 34,9: Obesidade Grau I</li>
                        <li>35,0 - 39,9: Obesidade Grau II</li>
                        <li>Acima de 40: Obesidade Grau III</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
