import React, { useState, useEffect } from 'react';
import '../../styles/conversor.css';

export default function ContadorDiasRestantes() {
    const [dataAlvo, setDataAlvo] = useState('');
    const [resultado, setResultado] = useState(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if (dataAlvo) {
            calcular();
        }
    }, [dataAlvo]);

    function calcular() {
        if (!dataAlvo) {
            setShowResult(false);
            return;
        }

        const dataAlvoObj = new Date(dataAlvo);
        const hoje = new Date();

        if (dataAlvoObj <= hoje) {
            setShowResult(false);
            return;
        }

        const diff = dataAlvoObj.getTime() - hoje.getTime();
        const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
        const semanas = Math.floor(dias / 7);
        const diasRestantes = dias % 7;

        setResultado({
            dias,
            semanas,
            diasRestantes
        });
        setShowResult(true);
    }

    function limpar() {
        setDataAlvo('');
        setResultado(null);
        setShowResult(false);
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>📅 Contador de Dias Restantes</h1>
                <p className="description">Calcule dias restantes até uma data</p>
            </div>
            <div className="tool-container">
                <div style={{ maxWidth: '600px' }}>
                    <div className="form-group">
                        <label htmlFor="dataAlvo">Data Alvo:</label>
                        <input
                            id="dataAlvo"
                            type="date"
                            value={dataAlvo}
                            onChange={(e) => setDataAlvo(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
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

                    {showResult && resultado && (
                        <div className="result">
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#007bff', marginBottom: '10px' }}>
                                {resultado.dias} dias
                            </div>
                            <p style={{ fontSize: '16px' }}>
                                {resultado.semanas} semanas e {resultado.diasRestantes} dias
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
