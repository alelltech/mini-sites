import React, { useState, useEffect } from 'react';
import '../../styles/conversor.css';

export default function CalculadoraEnergia() {
    const [potencia, setPotencia] = useState('');
    const [horas, setHoras] = useState('');
    const [dias, setDias] = useState('30');
    const [tarifa, setTarifa] = useState('1.00');
    const [resultado, setResultado] = useState(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if (potencia && horas && dias && tarifa) {
            calcular();
        }
    }, [potencia, horas, dias, tarifa]);

    function calcular() {
        const potenciaNum = parseFloat(potencia);
        const horasNum = parseFloat(horas);
        const diasNum = parseFloat(dias);
        const tarifaNum = parseFloat(tarifa);

        if (!potenciaNum || potenciaNum <= 0 || !horasNum || horasNum <= 0 || !diasNum || diasNum <= 0 || !tarifaNum || tarifaNum <= 0) {
            setShowResult(false);
            return;
        }

        const diario = (potenciaNum * horasNum) / 1000;
        const mensal = diario * diasNum;
        const custo = mensal * tarifaNum;

        setResultado({
            potencia: potenciaNum.toFixed(2),
            diario: diario.toFixed(2),
            mensal: mensal.toFixed(2),
            custo: custo.toFixed(2)
        });
        setShowResult(true);
    }

    function limpar() {
        setPotencia('');
        setHoras('');
        setDias('30');
        setTarifa('1.00');
        setResultado(null);
        setShowResult(false);
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>⚡ Calculadora de Consumo de Energia</h1>
                <p className="description">Calcule consumo de energia elétrica e estime conta de luz</p>
            </div>
            <div className="tool-container">
                <div style={{ maxWidth: '600px' }}>
                    <div className="form-group">
                        <label htmlFor="potencia">Potência do Aparelho (Watts):</label>
                        <input
                            id="potencia"
                            type="number"
                            placeholder="Ex: 1000"
                            step="0.01"
                            value={potencia}
                            onChange={(e) => setPotencia(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="horas">Horas de Uso por Dia:</label>
                        <input
                            id="horas"
                            type="number"
                            placeholder="Ex: 8"
                            step="0.1"
                            value={horas}
                            onChange={(e) => setHoras(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dias">Dias no Mês:</label>
                        <input
                            id="dias"
                            type="number"
                            value={dias}
                            onChange={(e) => setDias(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tarifa">Valor do kWh (R$):</label>
                        <input
                            id="tarifa"
                            type="number"
                            value={tarifa}
                            step="0.01"
                            onChange={(e) => setTarifa(e.target.value)}
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
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                            <strong>Potência (W)</strong>
                                        </td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                            {resultado.potencia}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                            <strong>Consumo Diário (kWh)</strong>
                                        </td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                            {resultado.diario}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                            <strong>Consumo Mensal (kWh)</strong>
                                        </td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                            {resultado.mensal}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                            <strong>Custo Mensal (R$)</strong>
                                        </td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                                            R$ {resultado.custo}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
