import React, { useState, useEffect } from 'react';
import useUrlParams from '../../utils/useUrlParams.js';
import { formatCurrency, formatNumber, safeParseFloat } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

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
        <section className="tool-section">
            <div className="tool-header">
                <h1>💰 Calculadora de Juros Compostos</h1>
                <p className="description">Calcule o rendimento de investimentos com juros compostos</p>
            </div>
            <div className="tool-container">
                <form className="tool-form">
                    <div className="form-group">
                        <label htmlFor="capital">Capital Inicial (R$)</label>
                        <input
                            type="number"
                            id="capital"
                            placeholder="1000"
                            min="0"
                            step="0.01"
                            value={capital}
                            onChange={(e) => setCapital(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="taxa">Taxa de Juros (% ao ano)</label>
                        <input
                            type="number"
                            id="taxa"
                            placeholder="10"
                            min="0"
                            step="0.01"
                            value={taxa}
                            onChange={(e) => setTaxa(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tempo">Tempo (anos)</label>
                        <input
                            type="number"
                            id="tempo"
                            placeholder="5"
                            min="0"
                            step="0.1"
                            value={tempo}
                            onChange={(e) => setTempo(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="frequencia">Frequência de Capitalização</label>
                        <select
                            id="frequencia"
                            value={frequencia}
                            onChange={(e) => setFrequencia(e.target.value)}
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
                    <div className="result">
                        <h2>Resultado</h2>
                        <div className="result-content">
                            <div className="result-item">
                                <label>Capital Inicial</label>
                                <value>{formatCurrency(resultado.capital)}</value>
                            </div>
                            <div className="result-item">
                                <label>Juros Ganhos</label>
                                <value style={{ color: '#28a745' }}>+{formatCurrency(resultado.jurosGanhos)}</value>
                            </div>
                            <div className="result-item">
                                <label>Montante Final</label>
                                <value style={{ fontSize: '1.3rem' }}>{formatCurrency(resultado.montante)}</value>
                            </div>
                            <div className="result-item">
                                <label>Taxa por Período</label>
                                <value>{formatNumber(resultado.taxaPeriodo, 4)}%</value>
                            </div>
                            <div className="result-item">
                                <label>Períodos Totais</label>
                                <value>{resultado.periodos}</value>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
