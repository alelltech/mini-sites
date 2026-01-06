import React, { useState, useEffect } from 'react';

const AvaliacaoCorporal = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    sexo: 'masculino',
    dataAvaliacao: new Date().toISOString().split('T')[0],
    peso: '',
    altura: '',
    circunferenciaPescoco: '',
    circunferenciaTorax: '',
    circunferenciaCintura: '',
    circunferenciaAbdomen: '',
    circunferenciaQuadril: '',
    circunferenciaBracoDir: '',
    circunferenciaBracoEsq: '',
    circunferenciaCoxaDir: '',
    circunferenciaCoxaEsq: '',
    circunferenciaPanturrilhaDir: '',
    circunferenciaPanturrilhaEsq: '',
    dobraTriceps: '',
    dobraSubescapular: '',
    dobraSuprailiaca: '',
    dobraAbdominal: '',
    dobraCoxa: '',
    dobraPanturrilha: '',
    flexao: '',
    abdominal: '',
    testeSentar: '',
    vo2max: '',
    flexibilidade: '',
    objetivo: '',
    restricoes: '',
    observacoes: ''
  });

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = () => {
    const dados = localStorage.getItem('avaliacoesCorporais');
    if (dados) {
      setClientes(JSON.parse(dados));
    }
  };

  const salvarClientes = (novosClientes) => {
    localStorage.setItem('avaliacoesCorporais', JSON.stringify(novosClientes));
    setClientes(novosClientes);
  };

  const calcularIMC = () => {
    const peso = parseFloat(formData.peso);
    const altura = parseFloat(formData.altura) / 100;
    if (peso && altura) {
      return (peso / (altura * altura)).toFixed(2);
    }
    return '-';
  };

  const classificarIMC = (imc) => {
    if (imc < 18.5) return 'Abaixo do peso';
    if (imc < 25) return 'Peso normal';
    if (imc < 30) return 'Sobrepeso';
    if (imc < 35) return 'Obesidade Grau I';
    if (imc < 40) return 'Obesidade Grau II';
    return 'Obesidade Grau III';
  };

  const calcularRCQ = () => {
    const cintura = parseFloat(formData.circunferenciaCintura);
    const quadril = parseFloat(formData.circunferenciaQuadril);
    if (cintura && quadril) {
      return (cintura / quadril).toFixed(2);
    }
    return '-';
  };

  const calcularPercentualGordura = () => {
    const soma = 
      parseFloat(formData.dobraTriceps || 0) +
      parseFloat(formData.dobraSubescapular || 0) +
      parseFloat(formData.dobraSuprailiaca || 0) +
      parseFloat(formData.dobraAbdominal || 0);
    
    if (soma > 0) {
      const densidade = 1.10938 - (0.0008267 * soma) + (0.00000016 * soma * soma);
      const percentualGordura = ((495 / densidade) - 450).toFixed(1);
      return isFinite(percentualGordura) ? percentualGordura : '-';
    }
    return '-';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const novaAvaliacao = () => {
    setFormData({
      nome: '',
      idade: '',
      sexo: 'masculino',
      dataAvaliacao: new Date().toISOString().split('T')[0],
      peso: '',
      altura: '',
      circunferenciaPescoco: '',
      circunferenciaTorax: '',
      circunferenciaCintura: '',
      circunferenciaAbdomen: '',
      circunferenciaQuadril: '',
      circunferenciaBracoDir: '',
      circunferenciaBracoEsq: '',
      circunferenciaCoxaDir: '',
      circunferenciaCoxaEsq: '',
      circunferenciaPanturrilhaDir: '',
      circunferenciaPanturrilhaEsq: '',
      dobraTriceps: '',
      dobraSubescapular: '',
      dobraSuprailiaca: '',
      dobraAbdominal: '',
      dobraCoxa: '',
      dobraPanturrilha: '',
      flexao: '',
      abdominal: '',
      testeSentar: '',
      vo2max: '',
      flexibilidade: '',
      objetivo: '',
      restricoes: '',
      observacoes: ''
    });
    setClienteSelecionado(null);
    setModoEdicao(true);
  };

  const salvarAvaliacao = () => {
    if (!formData.nome || !formData.peso || !formData.altura) {
      alert('Preencha os campos obrigatórios (Nome, Peso, Altura)');
      return;
    }

    const imc = calcularIMC();
    const avaliacao = {
      id: clienteSelecionado?.id || Date.now(),
      ...formData,
      imc
    };

    let novosClientes;
    if (clienteSelecionado) {
      novosClientes = clientes.map(c => c.id === clienteSelecionado.id ? avaliacao : c);
    } else {
      novosClientes = [...clientes, avaliacao];
    }

    salvarClientes(novosClientes);
    setModoEdicao(false);
    setClienteSelecionado(null);
  };

  const editarCliente = (cliente) => {
    setFormData(cliente);
    setClienteSelecionado(cliente);
    setModoEdicao(true);
  };

  const excluirCliente = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta avaliação?')) {
      const novosClientes = clientes.filter(c => c.id !== id);
      salvarClientes(novosClientes);
    }
  };

  const exportarPDF = (cliente) => {
    const texto = `
AVALIAÇÃO CORPORAL - ${cliente.nome}
Data: ${new Date(cliente.dataAvaliacao).toLocaleDateString('pt-BR')}

DADOS PESSOAIS:
Idade: ${cliente.idade} anos
Sexo: ${cliente.sexo}

MEDIDAS ANTROPOMÉTRICAS:
Peso: ${cliente.peso} kg
Altura: ${cliente.altura} cm
IMC: ${cliente.imc} (${classificarIMC(parseFloat(cliente.imc))})

CIRCUNFERÊNCIAS:
Pescoço: ${cliente.circunferenciaPescoco || '-'} cm
Tórax: ${cliente.circunferenciaTorax || '-'} cm
Cintura: ${cliente.circunferenciaCintura || '-'} cm
Abdômen: ${cliente.circunferenciaAbdomen || '-'} cm
Quadril: ${cliente.circunferenciaQuadril || '-'} cm
RCQ: ${cliente.circunferenciaCintura && cliente.circunferenciaQuadril ? (parseFloat(cliente.circunferenciaCintura) / parseFloat(cliente.circunferenciaQuadril)).toFixed(2) : '-'}

OBSERVAÇÕES:
${cliente.objetivo || '-'}
    `;
    
    const blob = new Blob([texto], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `avaliacao_${cliente.nome}_${cliente.dataAvaliacao}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const exportarDados = () => {
    const json = JSON.stringify(clientes, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `avaliacoes_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const btnGradient = (gradient) => ({
    background: gradient,
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600'
  });

  const cardStyle = {
    background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
    backdropFilter: 'blur(40px) saturate(150%)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '20px',
    padding: '25px',
    marginBottom: '20px'
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="p-card p-shadow-2" style={cardStyle}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginTop: 0, marginBottom: '10px' }}>
          <i className="icon-user"></i> Avaliação Corporal Profissional
        </h1>
        <p style={{ color: '#999', marginBottom: '20px' }}>Ferramenta completa para avaliação antropométrica e de composição corporal</p>

        {!modoEdicao ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={novaAvaliacao} className="p-btn" style={btnGradient('linear-gradient(135deg, #667eea 0%, #764ba2 100%)')}>
                + Nova Avaliação
              </button>
              <button onClick={exportarDados} className="p-btn" style={btnGradient('linear-gradient(135deg, #28a745 0%, #20c997 100%)')} disabled={clientes.length === 0}>
                📥 Exportar Dados
              </button>
            </div>

            <div style={{ marginTop: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px' }}>Clientes Cadastrados ({clientes.length})</h2>
              {clientes.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
                  <p style={{ fontSize: '14px', marginBottom: '8px' }}>Nenhuma avaliação cadastrada ainda.</p>
                  <p style={{ fontSize: '12px', color: '#999' }}>Clique em "Nova Avaliação" para começar.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
                  {clientes.map(cliente => (
                    <div key={cliente.id} className="p-card p-shadow-1" style={{ ...cardStyle, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '12px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0' }}>{cliente.nome}</h3>
                        <span style={{ fontSize: '14px' }}>{cliente.sexo === 'masculino' ? '♂' : '♀'}</span>
                      </div>
                      <div style={{ flex: 1, marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                          <span style={{ color: '#999' }}>Idade:</span>
                          <strong>{cliente.idade} anos</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                          <span style={{ color: '#999' }}>IMC:</span>
                          <strong>{cliente.imc}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                          <span style={{ color: '#999' }}>Data:</span>
                          <strong>{new Date(cliente.dataAvaliacao).toLocaleDateString('pt-BR')}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                          <span style={{ color: '#999' }}>Peso:</span>
                          <strong>{cliente.peso} kg</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                          <span style={{ color: '#999' }}>Altura:</span>
                          <strong>{cliente.altura} cm</strong>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => editarCliente(cliente)} className="p-btn" style={{ ...btnGradient('linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'), flex: 1, padding: '8px 12px', fontSize: '12px' }}>
                          ✏️ Editar
                        </button>
                        <button onClick={() => exportarPDF(cliente)} className="p-btn" style={{ ...btnGradient('linear-gradient(135deg, #667eea 0%, #764ba2 100%)'), flex: 1, padding: '8px 12px', fontSize: '12px' }}>
                          📄 PDF
                        </button>
                        <button onClick={() => excluirCliente(cliente.id)} className="p-btn" style={{ ...btnGradient('linear-gradient(135deg, #dc3545 0%, #c82333 100%)'), flex: 1, padding: '8px 12px', fontSize: '12px' }}>
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto', paddingRight: '10px' }}>
            {/* Seção 1: Dados Pessoais */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                <span style={{ fontSize: '24px', fontWeight: '700', color: '#667eea', minWidth: '50px' }}>01</span>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 5px 0' }}>Dados Pessoais</h2>
                  <p style={{ fontSize: '13px', color: '#999', margin: 0 }}>Informações básicas do cliente</p>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                <div className="p-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="p-form-label">Nome Completo *</label>
                  <input
                    className="p-input p-form-text"
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Nome do cliente"
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}
                  />
                </div>

                <div className="p-form-group">
                  <label className="p-form-label">Idade *</label>
                  <input
                    className="p-input p-form-text"
                    type="number"
                    name="idade"
                    value={formData.idade}
                    onChange={handleInputChange}
                    placeholder="Anos"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}
                  />
                </div>

                <div className="p-form-group">
                  <label className="p-form-label">Sexo *</label>
                  <select className="p-select p-form-select" name="sexo" value={formData.sexo} onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                  </select>
                </div>

                <div className="p-form-group">
                  <label className="p-form-label">Data da Avaliação</label>
                  <input
                    className="p-input p-form-text"
                    type="date"
                    name="dataAvaliacao"
                    value={formData.dataAvaliacao}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}
                  />
                </div>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: '20px', marginBottom: '15px' }}>Medidas Básicas</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <div className="p-form-group">
                  <label className="p-form-label">Peso (kg) *</label>
                  <input
                    className="p-input p-form-text"
                    type="number"
                    step="0.1"
                    name="peso"
                    value={formData.peso}
                    onChange={handleInputChange}
                    placeholder="Ex: 70.5"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}
                  />
                </div>

                <div className="p-form-group">
                  <label className="p-form-label">Altura (cm) *</label>
                  <input
                    className="p-input p-form-text"
                    type="number"
                    step="0.1"
                    name="altura"
                    value={formData.altura}
                    onChange={handleInputChange}
                    placeholder="Ex: 175"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}
                  />
                </div>

                <div className="p-form-group" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '15px', padding: '15px', textAlign: 'center' }}>
                  <label className="p-form-label" style={{ display: 'block', marginBottom: '8px' }}>IMC</label>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#667eea', marginBottom: '5px' }}>{calcularIMC()}</div>
                  <small style={{ color: '#666' }}>{calcularIMC() !== '-' && classificarIMC(parseFloat(calcularIMC()))}</small>
                </div>

                <div className="p-form-group" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '15px', padding: '15px', textAlign: 'center' }}>
                  <label className="p-form-label" style={{ display: 'block', marginBottom: '8px' }}>RCQ</label>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#667eea' }}>{calcularRCQ()}</div>
                </div>
              </div>
            </div>

            {/* Seção 2: Circunferências */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                <span style={{ fontSize: '24px', fontWeight: '700', color: '#667eea', minWidth: '50px' }}>02</span>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 5px 0' }}>Circunferências Corporais</h2>
                  <p style={{ fontSize: '13px', color: '#999', margin: 0 }}>Medidas em centímetros</p>
                </div>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: 0, marginBottom: '15px' }}>Tronco</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '25px' }}>
                {['Pescoço', 'Tórax', 'Cintura', 'Abdômen', 'Quadril'].map((medida, i) => {
                  const fieldMap = { 'Pescoço': 'circunferenciaPescoco', 'Tórax': 'circunferenciaTorax', 'Cintura': 'circunferenciaCintura', 'Abdômen': 'circunferenciaAbdomen', 'Quadril': 'circunferenciaQuadril' };
                  return (
                    <div key={i} className="p-form-group">
                      <label className="p-form-label">{medida}</label>
                      <input type="number" step="0.1" name={fieldMap[medida]} value={formData[fieldMap[medida]]} onChange={handleInputChange} placeholder="cm" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }} />
                    </div>
                  );
                })}
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: 0, marginBottom: '15px' }}>Membros Superiores</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '25px' }}>
                {['Braço Direito', 'Braço Esquerdo'].map((medida, i) => {
                  const fieldMap = { 'Braço Direito': 'circunferenciaBracoDir', 'Braço Esquerdo': 'circunferenciaBracoEsq' };
                  return (
                    <div key={i} className="p-form-group">
                      <label className="p-form-label">{medida}</label>
                      <input type="number" step="0.1" name={fieldMap[medida]} value={formData[fieldMap[medida]]} onChange={handleInputChange} placeholder="cm" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }} />
                    </div>
                  );
                })}
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: 0, marginBottom: '15px' }}>Membros Inferiores</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                {['Coxa Direita', 'Coxa Esquerda', 'Panturrilha Direita', 'Panturrilha Esquerda'].map((medida, i) => {
                  const fieldMap = { 'Coxa Direita': 'circunferenciaCoxaDir', 'Coxa Esquerda': 'circunferenciaCoxaEsq', 'Panturrilha Direita': 'circunferenciaPanturrilhaDir', 'Panturrilha Esquerda': 'circunferenciaPanturrilhaEsq' };
                  return (
                    <div key={i} className="p-form-group">
                      <label className="p-form-label">{medida}</label>
                      <input type="number" step="0.1" name={fieldMap[medida]} value={formData[fieldMap[medida]]} onChange={handleInputChange} placeholder="cm" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Seção 3: Dobras Cutâneas */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                <span style={{ fontSize: '24px', fontWeight: '700', color: '#667eea', minWidth: '50px' }}>03</span>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 5px 0' }}>Dobras Cutâneas</h2>
                  <p style={{ fontSize: '13px', color: '#999', margin: 0 }}>Protocolo de 7 dobras (mm)</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                {['Tríceps', 'Subescapular', 'Supra-ilíaca', 'Abdominal', 'Coxa', 'Panturrilha Medial'].map((dobra, i) => {
                  const fieldMap = { 'Tríceps': 'dobraTriceps', 'Subescapular': 'dobraSubescapular', 'Supra-ilíaca': 'dobraSuprailiaca', 'Abdominal': 'dobraAbdominal', 'Coxa': 'dobraCoxa', 'Panturrilha Medial': 'dobraPanturrilha' };
                  return (
                    <div key={i} className="p-form-group">
                      <label className="p-form-label">{dobra}</label>
                      <input type="number" step="0.1" name={fieldMap[dobra]} value={formData[fieldMap[dobra]]} onChange={handleInputChange} placeholder="mm" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }} />
                    </div>
                  );
                })}
              </div>

              <div className="p-form-group" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '15px', padding: '15px', textAlign: 'center' }}>
                <label className="p-form-label" style={{ display: 'block', marginBottom: '8px' }}>% Gordura Corporal</label>
                <div style={{ fontSize: '28px', fontWeight: '700', color: '#667eea' }}>{calcularPercentualGordura()}%</div>
                <small style={{ color: '#666' }}>Jackson & Pollock (4 dobras)</small>
              </div>
            </div>

            {/* Seção 4: Testes */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                <span style={{ fontSize: '24px', fontWeight: '700', color: '#667eea', minWidth: '50px' }}>04</span>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 5px 0' }}>Testes de Condicionamento</h2>
                  <p style={{ fontSize: '13px', color: '#999', margin: 0 }}>Avaliação de capacidades físicas</p>
                </div>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: 0, marginBottom: '15px' }}>Força e Resistência</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '25px' }}>
                <div className="p-form-group">
                  <label className="p-form-label">Flexões de Braço (reps)</label>
                  <input type="number" name="flexao" value={formData.flexao} onChange={handleInputChange} placeholder="Repetições" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }} />
                </div>
                <div className="p-form-group">
                  <label className="p-form-label">Abdominais (reps)</label>
                  <input type="number" name="abdominal" value={formData.abdominal} onChange={handleInputChange} placeholder="Repetições" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }} />
                </div>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: 0, marginBottom: '15px' }}>Flexibilidade</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '25px' }}>
                <div className="p-form-group">
                  <label className="p-form-label">Teste Sentar e Alcançar (cm)</label>
                  <input type="number" step="0.1" name="testeSentar" value={formData.testeSentar} onChange={handleInputChange} placeholder="cm" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }} />
                </div>
                <div className="p-form-group">
                  <label className="p-form-label">Flexibilidade Geral</label>
                  <select name="flexibilidade" value={formData.flexibilidade} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}>
                    <option value="">Selecione...</option>
                    <option value="Muito Baixa">Muito Baixa</option>
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Boa">Boa</option>
                    <option value="Excelente">Excelente</option>
                  </select>
                </div>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: 0, marginBottom: '15px' }}>Capacidade Aeróbica</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '25px' }}>
                <div className="p-form-group">
                  <label className="p-form-label">VO₂ Máx (ml/kg/min)</label>
                  <input type="number" step="0.1" name="vo2max" value={formData.vo2max} onChange={handleInputChange} placeholder="ml/kg/min" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }} />
                </div>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: 0, marginBottom: '15px' }}>Observações</h3>
              <div className="p-form-group">
                <label className="p-form-label">Objetivo Geral</label>
                <textarea name="objetivo" value={formData.objetivo} onChange={handleInputChange} rows="2" placeholder="Ex: Emagrecimento, hipertrofia..." style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)', marginBottom: '15px' }} />
              </div>

              <div className="p-form-group">
                <label className="p-form-label">Restrições Médicas</label>
                <textarea name="restricoes" value={formData.restricoes} onChange={handleInputChange} rows="2" placeholder="Ex: Problemas articulares..." style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)', marginBottom: '15px' }} />
              </div>

              <div className="p-form-group">
                <label className="p-form-label">Observações Finais</label>
                <textarea name="observacoes" value={formData.observacoes} onChange={handleInputChange} rows="3" placeholder="Anotações adicionais..." style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }} />
              </div>
            </div>

            {/* Botões */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '30px', marginBottom: '40px' }}>
              <button onClick={() => setModoEdicao(false)} className="p-btn" style={btnGradient('linear-gradient(135deg, #6c757d 0%, #5a6268 100%)')}>
                ✕ Cancelar
              </button>
              <button onClick={salvarAvaliacao} className="p-btn" style={btnGradient('linear-gradient(135deg, #28a745 0%, #20c997 100%)')}>
                💾 Salvar Avaliação
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvaliacaoCorporal;
