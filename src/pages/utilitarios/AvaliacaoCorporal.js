import React, { useState, useEffect } from 'react';
import '../../styles/AvaliacaoCorporal.css';

const AvaliacaoCorporal = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    sexo: 'masculino',
    dataAvaliacao: new Date().toISOString().split('T')[0],
    
    // Dados Antropométricos
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
    
    // Dobras Cutâneas (mm)
    dobraTriceps: '',
    dobraSubescapular: '',
    dobraSuprailiaca: '',
    dobraAbdominal: '',
    dobraCoxa: '',
    dobraPanturrilha: '',
    
    // Testes de Condicionamento Físico
    flexao: '',
    abdominal: '',
    testeSentar: '',
    vo2max: '',
    flexibilidade: '',
    
    // Observações
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
      const idade = parseInt(formData.idade);
      const densidade = formData.sexo === 'masculino' 
        ? 1.10938 - (0.0008267 * soma) + (0.0000016 * soma * soma) - (0.0002574 * idade)
        : 1.0994921 - (0.0009929 * soma) + (0.0000023 * soma * soma) - (0.0001392 * idade);
      
      const percentual = ((495 / densidade) - 450).toFixed(2);
      return percentual > 0 ? percentual : '-';
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
    if (!formData.nome.trim()) {
      alert('Por favor, informe o nome do cliente.');
      return;
    }

    const avaliacaoCompleta = {
      ...formData,
      id: clienteSelecionado?.id || Date.now(),
      imc: calcularIMC(),
      rcq: calcularRCQ(),
      percentualGordura: calcularPercentualGordura(),
      ultimaAtualizacao: new Date().toISOString()
    };

    let novosClientes;
    if (clienteSelecionado) {
      novosClientes = clientes.map(c => 
        c.id === clienteSelecionado.id ? avaliacaoCompleta : c
      );
    } else {
      novosClientes = [...clientes, avaliacaoCompleta];
    }

    salvarClientes(novosClientes);
    setModoEdicao(false);
    setClienteSelecionado(avaliacaoCompleta);
    alert('Avaliação salva com sucesso!');
  };

  const editarCliente = (cliente) => {
    setFormData(cliente);
    setClienteSelecionado(cliente);
    setModoEdicao(true);
  };

  const excluirCliente = (id) => {
    if (window.confirm('Deseja realmente excluir esta avaliação?')) {
      const novosClientes = clientes.filter(c => c.id !== id);
      salvarClientes(novosClientes);
      if (clienteSelecionado?.id === id) {
        setClienteSelecionado(null);
        setModoEdicao(false);
      }
    }
  };

  const exportarDados = () => {
    const dataStr = JSON.stringify(clientes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `avaliacoes-corporais-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportarPDF = (cliente) => {
    const conteudo = `
AVALIAÇÃO CORPORAL - RELATÓRIO

Nome: ${cliente.nome}
Idade: ${cliente.idade} anos
Sexo: ${cliente.sexo === 'masculino' ? 'Masculino' : 'Feminino'}
Data da Avaliação: ${new Date(cliente.dataAvaliacao).toLocaleDateString('pt-BR')}

DADOS ANTROPOMÉTRICOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Peso: ${cliente.peso} kg
Altura: ${cliente.altura} cm
IMC: ${cliente.imc} - ${classificarIMC(parseFloat(cliente.imc))}
RCQ: ${cliente.rcq}
Percentual de Gordura: ${cliente.percentualGordura}%

CIRCUNFERÊNCIAS (cm)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pescoço: ${cliente.circunferenciaPescoco || '-'}
Tórax: ${cliente.circunferenciaTorax || '-'}
Cintura: ${cliente.circunferenciaCintura || '-'}
Abdômen: ${cliente.circunferenciaAbdomen || '-'}
Quadril: ${cliente.circunferenciaQuadril || '-'}
Braço D/E: ${cliente.circunferenciaBracoDir || '-'} / ${cliente.circunferenciaBracoEsq || '-'}
Coxa D/E: ${cliente.circunferenciaCoxaDir || '-'} / ${cliente.circunferenciaCoxaEsq || '-'}
Panturrilha D/E: ${cliente.circunferenciaPanturrilhaDir || '-'} / ${cliente.circunferenciaPanturrilhaEsq || '-'}

DOBRAS CUTÂNEAS (mm)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tríceps: ${cliente.dobraTriceps || '-'}
Subescapular: ${cliente.dobraSubescapular || '-'}
Supra-ilíaca: ${cliente.dobraSuprailiaca || '-'}
Abdominal: ${cliente.dobraAbdominal || '-'}
Coxa: ${cliente.dobraCoxa || '-'}
Panturrilha: ${cliente.dobraPanturrilha || '-'}

TESTES DE CONDICIONAMENTO FÍSICO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Flexões: ${cliente.flexao || '-'}
Abdominais: ${cliente.abdominal || '-'}
Teste Sentar e Alcançar: ${cliente.testeSentar || '-'} cm
VO2 Máx: ${cliente.vo2max || '-'} ml/kg/min
Flexibilidade: ${cliente.flexibilidade || '-'}

INFORMAÇÕES ADICIONAIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Objetivo: ${cliente.objetivo || '-'}
Restrições: ${cliente.restricoes || '-'}
Observações: ${cliente.observacoes || '-'}

Última atualização: ${new Date(cliente.ultimaAtualizacao).toLocaleString('pt-BR')}
    `;

    const dataBlob = new Blob([conteudo], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `avaliacao-${cliente.nome.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="avaliacao-corporal-container">
      <div className="avaliacao-header">
        <h1>Avaliação Corporal</h1>
        <p className="subtitle">Ferramenta profissional para educadores físicos e terapeutas</p>
      </div>

      {!modoEdicao ? (
        <div className="painel-principal">
          <div className="acoes-principais">
            <button onClick={novaAvaliacao} className="btn-primary">
              + Nova Avaliação
            </button>
            <button onClick={exportarDados} className="btn-secondary" disabled={clientes.length === 0}>
              📥 Exportar Todos os Dados
            </button>
          </div>

          <div className="lista-clientes">
            <h2>Clientes Cadastrados ({clientes.length})</h2>
            {clientes.length === 0 ? (
              <div className="empty-state">
                <p>Nenhuma avaliação cadastrada ainda.</p>
                <p>Clique em "Nova Avaliação" para começar.</p>
              </div>
            ) : (
              <div className="cards-clientes">
                {clientes.map(cliente => (
                  <div key={cliente.id} className="card-cliente">
                    <div className="card-header">
                      <h3>{cliente.nome}</h3>
                      <span className="badge">{cliente.sexo === 'masculino' ? '♂' : '♀'}</span>
                    </div>
                    <div className="card-body">
                      <div className="info-row">
                        <span>Idade:</span>
                        <strong>{cliente.idade} anos</strong>
                      </div>
                      <div className="info-row">
                        <span>IMC:</span>
                        <strong>{cliente.imc}</strong>
                      </div>
                      <div className="info-row">
                        <span>Data:</span>
                        <strong>{new Date(cliente.dataAvaliacao).toLocaleDateString('pt-BR')}</strong>
                      </div>
                      <div className="info-row">
                        <span>Peso:</span>
                        <strong>{cliente.peso} kg</strong>
                      </div>
                      <div className="info-row">
                        <span>Altura:</span>
                        <strong>{cliente.altura} cm</strong>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button onClick={() => editarCliente(cliente)} className="btn-edit">
                        ✏️ Editar
                      </button>
                      <button onClick={() => exportarPDF(cliente)} className="btn-export">
                        📄 Exportar
                      </button>
                      <button onClick={() => excluirCliente(cliente.id)} className="btn-delete">
                        🗑️ Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="formulario-avaliacao">
          <div className="formulario-scroll">
            {/* Seção 1: Dados Pessoais */}
            <div className="secao-form">
              <div className="secao-header">
                <span className="secao-numero">01</span>
                <div className="secao-titulo">
                  <h2>Dados Pessoais e Antropométricos</h2>
                  <p className="secao-subtitulo">Informações básicas do cliente e medidas fundamentais</p>
                </div>
              </div>
              
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Nome Completo *</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Nome do cliente"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Idade *</label>
                  <input
                    type="number"
                    name="idade"
                    value={formData.idade}
                    onChange={handleInputChange}
                    placeholder="Anos"
                  />
                </div>

                <div className="form-group">
                  <label>Sexo *</label>
                  <select name="sexo" value={formData.sexo} onChange={handleInputChange}>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Data da Avaliação</label>
                  <input
                    type="date"
                    name="dataAvaliacao"
                    value={formData.dataAvaliacao}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Medidas Básicas</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Peso (kg) *</label>
                    <input
                      type="number"
                      step="0.1"
                      name="peso"
                      value={formData.peso}
                      onChange={handleInputChange}
                      placeholder="Ex: 70.5"
                    />
                  </div>

                  <div className="form-group">
                    <label>Altura (cm) *</label>
                    <input
                      type="number"
                      step="0.1"
                      name="altura"
                      value={formData.altura}
                      onChange={handleInputChange}
                      placeholder="Ex: 175"
                    />
                  </div>

                  <div className="form-group resultado">
                    <label>IMC</label>
                    <div className="valor-destaque">{calcularIMC()}</div>
                    <small>{calcularIMC() !== '-' && classificarIMC(parseFloat(calcularIMC()))}</small>
                  </div>

                  <div className="form-group resultado">
                    <label>RCQ</label>
                    <div className="valor-destaque">{calcularRCQ()}</div>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Informações Adicionais</h3>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Objetivo</label>
                    <textarea
                      name="objetivo"
                      value={formData.objetivo}
                      onChange={handleInputChange}
                      rows="2"
                      placeholder="Ex: Emagrecimento, hipertrofia, condicionamento..."
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Restrições Médicas/Físicas</label>
                    <textarea
                      name="restricoes"
                      value={formData.restricoes}
                      onChange={handleInputChange}
                      rows="2"
                      placeholder="Ex: Problemas articulares, cirurgias recentes..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Seção 2: Circunferências */}
            <div className="secao-form">
              <div className="secao-header">
                <span className="secao-numero">02</span>
                <div className="secao-titulo">
                  <h2>Circunferências Corporais</h2>
                  <p className="secao-subtitulo">Medidas de perímetros em diferentes regiões do corpo (em centímetros)</p>
                </div>
              </div>
              
              <div className="medidas-com-imagem">
                <div className="form-area">
                  <div className="form-section">
                    <h3>Tronco</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Pescoço</label>
                        <input
                          type="number"
                          step="0.1"
                          name="circunferenciaPescoco"
                          value={formData.circunferenciaPescoco}
                          onChange={handleInputChange}
                          placeholder="cm"
                        />
                        <small className="help-text">Medir na altura da cartilagem tireoide</small>
                      </div>

                      <div className="form-group">
                        <label>Tórax</label>
                        <input
                          type="number"
                          step="0.1"
                          name="circunferenciaTorax"
                          value={formData.circunferenciaTorax}
                          onChange={handleInputChange}
                          placeholder="cm"
                        />
                        <small className="help-text">Na altura dos mamilos</small>
                      </div>

                      <div className="form-group">
                        <label>Cintura</label>
                        <input
                          type="number"
                          step="0.1"
                          name="circunferenciaCintura"
                          value={formData.circunferenciaCintura}
                          onChange={handleInputChange}
                          placeholder="cm"
                        />
                        <small className="help-text">Ponto mais estreito do tronco</small>
                      </div>

                      <div className="form-group">
                        <label>Abdômen</label>
                        <input
                          type="number"
                          step="0.1"
                          name="circunferenciaAbdomen"
                          value={formData.circunferenciaAbdomen}
                          onChange={handleInputChange}
                          placeholder="cm"
                        />
                        <small className="help-text">Na altura do umbigo</small>
                      </div>

                      <div className="form-group">
                        <label>Quadril</label>
                        <input
                          type="number"
                          step="0.1"
                          name="circunferenciaQuadril"
                          value={formData.circunferenciaQuadril}
                          onChange={handleInputChange}
                          placeholder="cm"
                        />
                        <small className="help-text">Ponto de maior circunferência</small>
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>Membros Superiores</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Braço Direito</label>
                        <input
                          type="number"
                          step="0.1"
                          name="circunferenciaBracoDir"
                          value={formData.circunferenciaBracoDir}
                          onChange={handleInputChange}
                          placeholder="cm"
                        />
                        <small className="help-text">Relaxado, ponto médio</small>
                      </div>

                      <div className="form-group">
                        <label>Braço Esquerdo</label>
                        <input
                          type="number"
                          step="0.1"
                          name="circunferenciaBracoEsq"
                          value={formData.circunferenciaBracoEsq}
                          onChange={handleInputChange}
                          placeholder="cm"
                        />
                        <small className="help-text">Relaxado, ponto médio</small>
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>Membros Inferiores</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Coxa Direita</label>
                        <input
                          type="number"
                          step="0.1"
                          name="circunferenciaCoxaDir"
                          value={formData.circunferenciaCoxaDir}
                          onChange={handleInputChange}
                          placeholder="cm"
                        />
                        <small className="help-text">Região proximal</small>
                      </div>

                      <div className="form-group">
                        <label>Coxa Esquerda</label>
                        <input
                          type="number"
                          step="0.1"
                          name="circunferenciaCoxaEsq"
                          value={formData.circunferenciaCoxaEsq}
                          onChange={handleInputChange}
                          placeholder="cm"
                        />
                        <small className="help-text">Região proximal</small>
                      </div>

                      <div className="form-group">
                        <label>Panturrilha Direita</label>
                        <input
                          type="number"
                          step="0.1"
                          name="circunferenciaPanturrilhaDir"
                          value={formData.circunferenciaPanturrilhaDir}
                          onChange={handleInputChange}
                          placeholder="cm"
                        />
                        <small className="help-text">Maior circunferência</small>
                      </div>

                      <div className="form-group">
                        <label>Panturrilha Esquerda</label>
                        <input
                          type="number"
                          step="0.1"
                          name="circunferenciaPanturrilhaEsq"
                          value={formData.circunferenciaPanturrilhaEsq}
                          onChange={handleInputChange}
                          placeholder="cm"
                        />
                        <small className="help-text">Maior circunferência</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="imagem-referencia">
                  <div className="ref-box">
                    <h4>📏 Referências de Medição</h4>
                    <div className="ref-item">
                      <strong>Pescoço:</strong> Na altura da cartilagem tireoide (pomo de adão)
                    </div>
                    <div className="ref-item">
                      <strong>Tórax:</strong> Fita na altura dos mamilos, braços relaxados
                    </div>
                    <div className="ref-item">
                      <strong>Cintura:</strong> Ponto mais estreito entre costelas e quadril
                    </div>
                    <div className="ref-item">
                      <strong>Abdômen:</strong> Na altura do umbigo, abdômen relaxado
                    </div>
                    <div className="ref-item">
                      <strong>Quadril:</strong> Ponto de maior circunferência dos glúteos
                    </div>
                    <div className="ref-item">
                      <strong>Braço:</strong> Ponto médio entre acrômio e olécrano, relaxado
                    </div>
                    <div className="ref-item">
                      <strong>Coxa:</strong> 1cm abaixo da prega glútea
                    </div>
                    <div className="ref-item">
                      <strong>Panturrilha:</strong> Maior circunferência da perna
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seção 3: Dobras Cutâneas */}
            <div className="secao-form">
              <div className="secao-header">
                <span className="secao-numero">03</span>
                <div className="secao-titulo">
                  <h2>Dobras Cutâneas</h2>
                  <p className="secao-subtitulo">Protocolo de 7 dobras para estimativa de composição corporal (em milímetros)</p>
                </div>
              </div>
              
              <div className="medidas-com-imagem">
                <div className="form-area">
                  <div className="form-section">
                    <h3>Protocolo de 7 Dobras</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Tríceps</label>
                        <input
                          type="number"
                          step="0.1"
                          name="dobraTriceps"
                          value={formData.dobraTriceps}
                          onChange={handleInputChange}
                          placeholder="mm"
                        />
                        <small className="help-text">Ponto médio posterior do braço</small>
                      </div>

                      <div className="form-group">
                        <label>Subescapular</label>
                        <input
                          type="number"
                          step="0.1"
                          name="dobraSubescapular"
                          value={formData.dobraSubescapular}
                          onChange={handleInputChange}
                          placeholder="mm"
                        />
                        <small className="help-text">2cm abaixo do ângulo inferior da escápula</small>
                      </div>

                      <div className="form-group">
                        <label>Supra-ilíaca</label>
                        <input
                          type="number"
                          step="0.1"
                          name="dobraSuprailiaca"
                          value={formData.dobraSuprailiaca}
                          onChange={handleInputChange}
                          placeholder="mm"
                        />
                        <small className="help-text">Acima da crista ilíaca</small>
                      </div>

                      <div className="form-group">
                        <label>Abdominal</label>
                        <input
                          type="number"
                          step="0.1"
                          name="dobraAbdominal"
                          value={formData.dobraAbdominal}
                          onChange={handleInputChange}
                          placeholder="mm"
                        />
                        <small className="help-text">2cm lateral ao umbigo</small>
                      </div>

                      <div className="form-group">
                        <label>Coxa</label>
                        <input
                          type="number"
                          step="0.1"
                          name="dobraCoxa"
                          value={formData.dobraCoxa}
                          onChange={handleInputChange}
                          placeholder="mm"
                        />
                        <small className="help-text">Ponto médio anterior da coxa</small>
                      </div>

                      <div className="form-group">
                        <label>Panturrilha Medial</label>
                        <input
                          type="number"
                          step="0.1"
                          name="dobraPanturrilha"
                          value={formData.dobraPanturrilha}
                          onChange={handleInputChange}
                          placeholder="mm"
                        />
                        <small className="help-text">Maior circunferência medial</small>
                      </div>

                      <div className="form-group resultado full-width">
                        <label>% Gordura Corporal (Estimado)</label>
                        <div className="valor-destaque">{calcularPercentualGordura()}%</div>
                        <small>Baseado nas 4 primeiras dobras (Jackson & Pollock)</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="imagem-referencia">
                  <div className="ref-box">
                    <h4>📐 Técnica de Medição</h4>
                    <div className="ref-item">
                      <strong>Adipômetro:</strong> Aplicar 1cm distante dos dedos
                    </div>
                    <div className="ref-item">
                      <strong>Pinça:</strong> Polegar e indicador afastados 8cm
                    </div>
                    <div className="ref-item">
                      <strong>Pele:</strong> Puxar firmemente formando prega
                    </div>
                    <div className="ref-item">
                      <strong>Leitura:</strong> Aguardar 2-3 segundos após aplicação
                    </div>
                    <div className="ref-item">
                      <strong>Repetição:</strong> Realizar 3 medidas e usar a mediana
                    </div>
                    <hr />
                    <div className="ref-item">
                      <strong>Tríceps:</strong> Vertical, ponto médio posterior do braço
                    </div>
                    <div className="ref-item">
                      <strong>Subescapular:</strong> Oblíqua, 45° lateral inferior da escápula
                    </div>
                    <div className="ref-item">
                      <strong>Supra-ilíaca:</strong> Oblíqua descendente sobre crista ilíaca
                    </div>
                    <div className="ref-item">
                      <strong>Abdominal:</strong> Vertical, 2cm lateral ao umbigo
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seção 4: Condicionamento Físico */}
            <div className="secao-form">
              <div className="secao-header">
                <span className="secao-numero">04</span>
                <div className="secao-titulo">
                  <h2>Testes de Condicionamento Físico</h2>
                  <p className="secao-subtitulo">Avaliação de capacidades físicas e performance</p>
                </div>
              </div>
              
              <div className="form-section">
                <h3>Força e Resistência Muscular</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Flexões de Braço (repetições)</label>
                    <input
                      type="number"
                      name="flexao"
                      value={formData.flexao}
                      onChange={handleInputChange}
                      placeholder="Número de repetições"
                    />
                    <small className="help-text">Teste até a fadiga ou 1 minuto</small>
                  </div>

                  <div className="form-group">
                    <label>Abdominais (repetições)</label>
                    <input
                      type="number"
                      name="abdominal"
                      value={formData.abdominal}
                      onChange={handleInputChange}
                      placeholder="Número de repetições"
                    />
                    <small className="help-text">1 minuto de execução</small>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Flexibilidade</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Teste Sentar e Alcançar (cm)</label>
                    <input
                      type="number"
                      step="0.1"
                      name="testeSentar"
                      value={formData.testeSentar}
                      onChange={handleInputChange}
                      placeholder="Distância alcançada"
                    />
                    <small className="help-text">Banco de Wells ou similar</small>
                  </div>

                  <div className="form-group">
                    <label>Flexibilidade Geral</label>
                    <select
                      name="flexibilidade"
                      value={formData.flexibilidade}
                      onChange={handleInputChange}
                    >
                      <option value="">Selecione...</option>
                      <option value="Muito Baixa">Muito Baixa</option>
                      <option value="Baixa">Baixa</option>
                      <option value="Média">Média</option>
                      <option value="Boa">Boa</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                    <small className="help-text">Avaliação geral</small>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Capacidade Aeróbica</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>VO₂ Máx (ml/kg/min)</label>
                    <input
                      type="number"
                      step="0.1"
                      name="vo2max"
                      value={formData.vo2max}
                      onChange={handleInputChange}
                      placeholder="ml/kg/min"
                    />
                    <small className="help-text">Teste de Cooper ou similar</small>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Observações Finais</h3>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Observações Gerais</label>
                    <textarea
                      name="observacoes"
                      value={formData.observacoes}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Anotações sobre a avaliação, pontos de atenção, progressos observados, etc."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-navigation">
            <div className="nav-buttons">
              <button onClick={() => setModoEdicao(false)} className="btn-cancel">
                Cancelar
              </button>

              <button onClick={salvarAvaliacao} className="btn-success">
                💾 Salvar Avaliação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvaliacaoCorporal;
