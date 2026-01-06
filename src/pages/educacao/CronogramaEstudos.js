import React, { useState } from 'react';

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
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="p-card p-shadow-2" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)', backdropFilter: 'blur(40px) saturate(150%)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '30px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 10px 0' }}>
                    <i className="icon-calendar"></i> Gerador de Cronograma
                </h1>
                <p style={{ color: '#999', marginBottom: '25px' }}>Crie cronogramas de estudos personalizados</p>
                
                <div className="p-form-group" style={{ marginBottom: '15px' }}>
                    <label htmlFor="materia" className="p-form-label">Disciplina/Matéria:</label>
                    <input
                        id="materia"
                        className="p-input p-form-text"
                        type="text"
                        placeholder="Ex: Matemática, História..."
                        value={materia}
                        onChange={(e) => setMateria(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                    <div className="p-form-group">
                        <label htmlFor="dataInicio" className="p-form-label">Data de Início:</label>
                        <input
                            id="dataInicio"
                            className="p-input p-form-text"
                            type="date"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}
                        />
                    </div>
                    <div className="p-form-group">
                        <label htmlFor="dataFinal" className="p-form-label">Data de Prova:</label>
                        <input
                            id="dataFinal"
                            className="p-input p-form-text"
                            type="date"
                            value={dataFinal}
                            onChange={(e) => setDataFinal(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}
                        />
                    </div>
                </div>

                <div className="p-form-group" style={{ marginBottom: '15px' }}>
                    <label htmlFor="topicos" className="p-form-label">Tópicos a Estudar:</label>
                    <textarea
                        id="topicos"
                        className="p-form-text"
                        rows="5"
                        placeholder="Tópico 1&#10;Tópico 2&#10;Tópico 3"
                        value={topicos}
                        onChange={(e) => setTopicos(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}
                    />
                </div>

                <div className="p-form-group" style={{ marginBottom: '20px' }}>
                    <label htmlFor="horas" className="p-form-label">Horas de Estudo/Dia:</label>
                    <input
                        id="horas"
                        className="p-input p-form-text"
                        type="number"
                        value={horas}
                        onChange={(e) => setHoras(e.target.value)}
                        min="1"
                        step="0.5"
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button
                        onClick={gerar}
                        className="p-btn"
                        style={{
                            padding: '10px 20px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Gerar Cronograma
                    </button>
                    <button
                        onClick={limpar}
                        className="p-btn"
                        style={{
                            padding: '10px 20px',
                            background: 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Limpar
                    </button>
                </div>

                {showResult && cronogramaResult && (
                    <div className="p-card" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '15px', padding: '20px', marginTop: '20px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: 0 }}>Cronograma: {cronogramaResult.materia}</h3>
                        <div>
                            {cronogramaResult.cronograma.map((item, index) => (
                                <div
                                    key={index}
                                    style={{
                                        padding: '12px',
                                        margin: '8px 0',
                                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(242, 93, 108, 0.1) 100%)',
                                        borderLeft: '4px solid #667eea',
                                        borderRadius: '6px'
                                    }}
                                >
                                    <strong>{item.data}</strong> - {item.topico} ({item.horas}h)
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
