import React, { useState } from 'react';
import '../../styles/conversor.css';

export default function CronogramaEstudos() {
    const [materia, setMateria] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFinal, setDataFinal] = useState('');
    const [topicos, setTopicos] = useState('');
    const [horas, setHoras] = useState('2');
    const [cronogramaResult, setCronogramaResult] = useState(null);
    const [showResult, setShowResult] = useState(false);

    function gerar() {
        const dataInicioObj = new Date(dataInicio);
        const dataFinalObj = new Date(dataFinal);
        const topicosArray = topicos.split('\n').filter(t => t.trim());
        const horasNum = parseFloat(horas);

        if (!materia || !dataInicio || !dataFinal || topicosArray.length === 0) {
            alert('Preencha todos os campos');
            return;
        }

        const diasTotais = Math.ceil((dataFinalObj - dataInicioObj) / (1000 * 60 * 60 * 24));
        if (diasTotais <= 0) {
            alert('Data final deve ser após data inicial');
            return;
        }

        const horasTotal = horasNum * diasTotais;
        const minutosPorTopico = Math.floor((horasTotal * 60) / topicosArray.length);
        const horasPorTopico = Math.floor(minutosPorTopico / 60);

        let cronograma = [];
        let dataAtual = new Date(dataInicioObj);
        let topicoAtual = 0;

        while (dataAtual <= dataFinalObj && topicoAtual < topicosArray.length) {
            const dia = dataAtual.toLocaleDateString('pt-BR');
            const topico = topicosArray[topicoAtual].trim();
            cronograma.push({ dia, topico, horas: horasPorTopico });
            dataAtual.setDate(dataAtual.getDate() + 1);
            topicoAtual++;
        }

        setCronogramaResult({ materia, cronograma });
        setShowResult(true);
    }

    function limpar() {
        setMateria('');
        setDataInicio('');
        setDataFinal('');
        setTopicos('');
        setHoras('2');
        setCronogramaResult(null);
        setShowResult(false);
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>📚 Gerador de Cronograma de Estudos</h1>
                <p className="description">Crie cronogramas de estudos personalizados</p>
            </div>
            <div className="tool-container">
                <div className="form-group">
                    <label htmlFor="materia">Disciplina/Matéria:</label>
                    <input
                        id="materia"
                        type="text"
                        placeholder="Ex: Matemática, História..."
                        value={materia}
                        onChange={(e) => setMateria(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                    <div className="form-group">
                        <label htmlFor="dataInicio">Data de Início:</label>
                        <input
                            id="dataInicio"
                            type="date"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dataFinal">Data de Prova/Avaliação:</label>
                        <input
                            id="dataFinal"
                            type="date"
                            value={dataFinal}
                            onChange={(e) => setDataFinal(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="topicos">Tópicos a Estudar (um por linha):</label>
                    <textarea
                        id="topicos"
                        rows="5"
                        placeholder="Tópico 1&#10;Tópico 2&#10;Tópico 3"
                        value={topicos}
                        onChange={(e) => setTopicos(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="horas">Horas de Estudo por Dia:</label>
                    <input
                        id="horas"
                        type="number"
                        value={horas}
                        onChange={(e) => setHoras(e.target.value)}
                        min="1"
                        step="0.5"
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={gerar}
                        style={{
                            padding: '10px 20px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Gerar Cronograma
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

                {showResult && cronogramaResult && (
                    <div className="result">
                        <h3>Cronograma: {cronogramaResult.materia}</h3>
                        <div>
                            {cronogramaResult.cronograma.map((item, index) => (
                                <div
                                    key={index}
                                    style={{
                                        padding: '8px',
                                        margin: '5px 0',
                                        background: '#e7f3ff',
                                        borderLeft: '4px solid #007bff',
                                        borderRadius: '2px'
                                    }}
                                >
                                    <strong>{item.dia}</strong> - {item.topico} ({item.horas}h)
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
