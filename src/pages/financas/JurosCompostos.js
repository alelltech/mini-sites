import React, { useState, useEffect } from 'react';
import useUrlParams from '../../utils/useUrlParams.js';
import { formatCurrency, formatNumber, safeParseFloat } from '../../utils/globalFunctions.js';

export default function JurosCompostos() {
    const [capital, setCapital] = useState('');
    const [taxa, setTaxa] = useState('');
    const [tempo, setTempo] = useState('');
    const [frequencia, setFrequencia] = useState('12');
    const [resultado, setResultado] = useState(null);

    // Ler parâmetros da URL
    useUrlParams({
        valorInicial: setCapital,
        periodo: (value) => setTempo((parseFloat(value) / 12).toString()), // converter meses para anos
        taxaJuros: setTaxa
    });

    useEffect(() => {
        calcular();
    }, [capital, taxa, tempo, frequencia]);

    function calcular() {
        const capitalVal = safeParseFloat(capital);
        const taxaVal = safeParseFloat(taxa);
        const tempoVal = safeParseFloat(tempo);
        const frequenciaVal = parseInt(frequencia) || 12;

        if (capitalVal === 0 || taxaVal === 0 || tempoVal === 0) {
            setResultado(null);
            return;
        }

        try {
            const taxaDecimal = taxaVal / 100;
            const periodos = frequenciaVal * tempoVal;
            const taxaPeriodo = taxaDecimal / frequenciaVal;

            const montante = capitalVal * Math.pow(1 + taxaPeriodo, periodos);
            const jurosGanhos = montante - capitalVal;

            setResultado({
                montante,
                jurosGanhos,
                capital: capitalVal,
                taxaPeriodo: taxaPeriodo * 100,
                periodos: Math.round(periodos)
            });
        } catch (e) {
            setResultado(null);
        }
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
                        <i className="icon-graph" style={{ marginRight: '10px' }}></i>
                        Calculadora de Juros Compostos
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Calcule o rendimento de investimentos com juros compostos</p>
                </div>

                <form style={{ marginBottom: '20px' }}>
                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="capital" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>
                            Capital Inicial (R$):
                        </label>
                        <input
                            className="p-input p-form-text"
                            type="number"
                            id="capital"
                            placeholder="1000"
                            min="0"
                            step="0.01"
                            value={capital}
                            onChange={(e) => setCapital(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        />
                    </div>
                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="taxa" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>
                            Taxa de Juros (% ao ano):
                        </label>
                        <input
                            className="p-input p-form-text"
                            type="number"
                            id="taxa"
                            placeholder="10"
                            min="0"
                            step="0.01"
                            value={taxa}
                            onChange={(e) => setTaxa(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        />
                    </div>
                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="tempo" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>
                            Tempo (anos):
                        </label>
                        <input
                            className="p-input p-form-text"
                            type="number"
                            id="tempo"
                            placeholder="5"
                            min="0"
                            step="0.1"
                            value={tempo}
                            onChange={(e) => setTempo(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        />
                    </div>
                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="frequencia" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>
                            Frequência de Capitalização:
                        </label>
                        <select
                            className="p-select p-form-select"
                            id="frequencia"
                            value={frequencia}
                            onChange={(e) => setFrequencia(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        >
                            <option value="1">Anual</option>
                            <option value="2">Semestral</option>
                            <option value="4">Trimestral</option>
                            <option value="12">Mensal</option>
                            <option value="365">Diário</option>
                        </select>
                    </div>
                </form>

                {resultado && (
                    <div className="p-card p-shadow-1" style={{
                        background: 'rgba(255,255,255,0.5)',
                        borderRadius: '15px',
                        padding: '20px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.3)'
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px 0 0 8px', fontWeight: '500', color: '#333' }}>Capital Inicial</td>
                                    <td style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.7)', borderRadius: '0 8px 8px 0', textAlign: 'right', color: '#333' }}>{formatCurrency(resultado.capital)}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px 16px', background: 'rgba(40, 167, 69, 0.1)', borderRadius: '8px 0 0 8px', fontWeight: '500', color: '#333' }}>Juros Ganhos</td>
                                    <td style={{ padding: '12px 16px', background: 'rgba(40, 167, 69, 0.1)', borderRadius: '0 8px 8px 0', textAlign: 'right', color: '#28a745', fontWeight: 'bold' }}>+{formatCurrency(resultado.jurosGanhos)}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px 16px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '8px 0 0 8px', fontWeight: '500', color: '#333' }}>Montante Final</td>
                                    <td style={{ padding: '12px 16px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '0 8px 8px 0', textAlign: 'right', fontWeight: 'bold', color: '#667eea', fontSize: '1.3rem' }}>{formatCurrency(resultado.montante)}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px 0 0 8px', fontWeight: '500', color: '#333' }}>Taxa por Período</td>
                                    <td style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.7)', borderRadius: '0 8px 8px 0', textAlign: 'right', color: '#333' }}>{formatNumber(resultado.taxaPeriodo, 4)}%</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px 0 0 8px', fontWeight: '500', color: '#333' }}>Períodos Totais</td>
                                    <td style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.7)', borderRadius: '0 8px 8px 0', textAlign: 'right', color: '#333' }}>{resultado.periodos}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
