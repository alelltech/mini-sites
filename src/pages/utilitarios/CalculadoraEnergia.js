import React, { useState, useEffect } from 'react';

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
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div className="p-card p-shadow-2" style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '30px'
            }}>
                <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
                        <i className="icon-energy" style={{ marginRight: '10px' }}></i>
                        Calculadora de Consumo de Energia
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Calcule consumo de energia elétrica e estime conta de luz</p>
                </div>

                <form style={{ marginBottom: '20px' }}>
                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="potencia" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Potência do Aparelho (Watts):</label>
                        <input
                            className="p-input p-form-text"
                            id="potencia"
                            type="number"
                            placeholder="Ex: 1000"
                            step="0.01"
                            value={potencia}
                            onChange={(e) => setPotencia(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        />
                    </div>

                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="horas" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Horas de Uso por Dia:</label>
                        <input
                            className="p-input p-form-text"
                            id="horas"
                            type="number"
                            placeholder="Ex: 8"
                            step="0.1"
                            value={horas}
                            onChange={(e) => setHoras(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        />
                    </div>

                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="dias" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Dias no Mês:</label>
                        <input
                            className="p-input p-form-text"
                            id="dias"
                            type="number"
                            value={dias}
                            onChange={(e) => setDias(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        />
                    </div>

                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="tarifa" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Valor do kWh (R$):</label>
                        <input
                            className="p-input p-form-text"
                            id="tarifa"
                            type="number"
                            value={tarifa}
                            step="0.01"
                            placeholder="1.00"
                            onChange={(e) => setTarifa(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        />
                    </div>
                </form>

                {showResult && resultado && (
                    <div className="p-card p-shadow-1" style={{ background: 'rgba(255,255,255,0.5)', borderRadius: '15px', padding: '20px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '15px', fontSize: '18px', fontWeight: '600', color: '#333' }}>Resultado</h3>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '14px', color: '#666' }}>Potência (W)</td>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#333', textAlign: 'right' }}>{resultado.potencia}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '14px', color: '#666' }}>Consumo Diário (kWh)</td>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#333', textAlign: 'right' }}>{resultado.diario}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '14px', color: '#666' }}>Consumo Mensal (kWh)</td>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#333', textAlign: 'right' }}>{resultado.mensal}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(40, 167, 69, 0.1)', borderRadius: '8px', fontSize: '14px', color: '#666', fontWeight: '600' }}>Custo Mensal (R$)</td>
                                    <td style={{ padding: '12px', background: 'rgba(40, 167, 69, 0.1)', borderRadius: '8px', fontSize: '18px', fontWeight: '700', color: '#28a745', textAlign: 'right' }}>R$ {resultado.custo}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
