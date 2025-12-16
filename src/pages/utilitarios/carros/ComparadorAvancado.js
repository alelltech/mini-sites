import React, { useState, useEffect } from 'react';
import '../../../styles/ComparadorAvancado.css';
import carsData from '../../../../public/data/cars/meta_data.json';

const ComparadorAvancado = () => {
  const [selectedCars, setSelectedCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [filteredModels, setFilteredModels] = useState([]);
  const [viewMode, setViewMode] = useState('categories');
  const [carImages, setCarImages] = useState({});
  const [expandedCategory, setExpandedCategory] = useState(null);

  const brands = carsData.meta_data_views.fabricante;

  useEffect(() => {
    let filtered = carsData.meta_data_views.nome_do_modelo;

    if (selectedBrand) {
      const brandModels = carsData.models
        .filter(car => car.fabricante === selectedBrand)
        .map(car => car.nome_do_modelo);
      filtered = filtered.filter(model => brandModels.includes(model));
    }

    if (searchTerm) {
      filtered = filtered.filter(model =>
        model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredModels(filtered.slice(0, 20));
  }, [selectedBrand, searchTerm]);

  // Carregar imagens dos carros
  useEffect(() => {
    const loadCarImages = async () => {
      const images = {};
      for (const car of selectedCars) {
        const imagePath = `/public/data/cars/${car.fabricante}/${car.fabricante}-${car.nome_do_modelo}.jpg`;
        images[car.nome_do_modelo] = imagePath;
      }
      setCarImages(images);
    };
    loadCarImages();
  }, [selectedCars]);

  const addCar = (modelName) => {
    if (selectedCars.length < 4 && !selectedCars.find(car => car.nome_do_modelo === modelName)) {
      const carDetails = carsData.models.find(car => car.nome_do_modelo === modelName);
      if (carDetails) {
        setSelectedCars([...selectedCars, carDetails]);
      }
    }
  };

  const removeCar = (index) => {
    setSelectedCars(selectedCars.filter((_, i) => i !== index));
  };

  const getCategories = () => {
    const categories = {};
    if (selectedCars.length === 0) return categories;

    const firstCar = selectedCars[0];
    Object.keys(firstCar).forEach(key => {
      const category = key.split('_')[0];
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(key);
    });

    return categories;
  };

  const categories = getCategories();
  const categoryLabels = {
    'dimensoes': 'Dimensões',
    'motor': 'Motor',
    'desempenho': 'Desempenho',
    'anos': 'Período',
    'nome': 'Modelo',
    'fabricante': 'Marca'
  };

  const getCarValue = (car, field) => {
    const value = car[field];
    if (!value) return '-';
    return value;
  };

  const compareValues = (field) => {
    if (selectedCars.length < 2) return null;
    const values = selectedCars.map(car => getCarValue(car, field));
    const allSame = values.every(v => v === values[0]);
    return !allSame;
  };

  // Sistema de scoring para evidenciar melhores qualidades
  const extractNumericValue = (value, field) => {
    if (!value || value === '-') return null;
    const match = String(value).match(/[\d.]+/);
    return match ? parseFloat(match[0]) : null;
  };

  const getHighlights = () => {
    if (selectedCars.length < 2) return { byIndex: {}, byField: {} };

    const highlights = { byIndex: {}, byField: {} };
    const comparisons = {
      'motor_potencia_cv': { label: '⚡ Maior Potência', better: 'higher' },
      'desempenho_velocidade_maxima_kmph': { label: '🏁 Maior Velocidade Máxima', better: 'higher' },
      'motor_torque_kgfm': { label: '💪 Maior Torque', better: 'higher' },
      'dimensoes_peso_em_ordem_de_marcha': { label: '⚖️ Menor Peso', better: 'lower' },
      'desempenho_consumo_combustivel_cidade_kmpl': { label: '⛽ Melhor Consumo Urbano', better: 'higher' },
      'desempenho_consumo_combustivel_estradas_kmpl': { label: '⛽ Melhor Consumo em Estrada', better: 'higher' },
      'desempenho_aceleracao0100': { label: '🚀 Aceleração Mais Rápida', better: 'lower' },
      'dimensoes_espaco_no_porta_malas': { label: '📦 Maior Porta-Malas', better: 'higher' },
      'dimensoes_comprimento': { label: '📏 Maior Comprimento', better: 'higher' },
      'dimensoes_altura': { label: '📏 Maior Altura', better: 'higher' },
      'dimensoes_largura': { label: '📏 Maior Largura', better: 'higher' },
    };

    Object.entries(comparisons).forEach(([field, { label, better }]) => {
      const values = selectedCars.map((car, idx) => ({
        idx,
        value: extractNumericValue(car[field], field),
        name: car.nome_do_modelo
      })).filter(v => v.value !== null);

      if (values.length >= selectedCars.length) {
        const winner = better === 'higher'
          ? values.reduce((max, v) => v.value > max.value ? v : max)
          : values.reduce((min, v) => v.value < min.value ? v : min);

        if (!highlights.byIndex[winner.idx]) {
          highlights.byIndex[winner.idx] = [];
        }
        highlights.byIndex[winner.idx].push(label);

        // Rastrear campo destacado para cada carro
        if (!highlights.byField[field]) {
          highlights.byField[field] = {};
        }
        highlights.byField[field][winner.idx] = true;
      }
    });

    return highlights;
  };

  const highlights = getHighlights();

  const calculateOverallScore = (carIdx) => {
    const score = highlights.byIndex[carIdx] ? highlights.byIndex[carIdx].length : 0;
    return score;
  };

  const isFieldHighlighted = (field, carIdx) => {
    return highlights.byField[field] && highlights.byField[field][carIdx];
  };

  return (
    <div className="comparador-avancado-container">
      <div className="comparador-header">
        <h1>🚗 Comparador de Carros</h1>
        <p>Selecione até 4 modelos para comparar características detalhadas</p>
      </div>

      <div className="comparador-content">
        <div className="comparador-sidebar">
          <div className="search-section">
            <h3>🔍 Buscar Modelo</h3>
            <input
              type="text"
              placeholder="Ex: Civic, Gol, Corsa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="brand-section">
            <h3>🏢 Filtrar por Marca</h3>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="brand-select"
            >
              <option value="">Todas as marcas ({brands.length})</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="models-section">
            <h3>📋 Modelos ({filteredModels.length})</h3>
            <div className="models-list">
              {filteredModels.length === 0 ? (
                <div className="no-models">Nenhum modelo encontrado</div>
              ) : (
                filteredModels.map(model => (
                  <div key={model} className="model-item">
                    <span className="model-name">{model}</span>
                    <button
                      onClick={() => addCar(model)}
                      disabled={selectedCars.length >= 4 || selectedCars.find(c => c.nome_do_modelo === model)}
                      className="add-btn"
                      title={selectedCars.length >= 4 ? 'Máximo de 4 carros atingido' : 'Adicionar'}
                    >
                      {selectedCars.find(c => c.nome_do_modelo === model) ? '✓' : '+'}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="comparador-main">
          <div className="selected-cars">
            <h2>✨ Modelos Selecionados ({selectedCars.length}/4)</h2>
            {selectedCars.length === 0 ? (
              <div className="no-cars">
                <p>👈 Selecione um modelo na lista ao lado para começar a comparação</p>
              </div>
            ) : (
              <div className="selected-list">
                {selectedCars.map((car, index) => {
                  const score = calculateOverallScore(index);
                  const carHighlights = highlights.byIndex[index] || [];
                  return (
                    <div key={index} className={`selected-car-item ${score > 0 ? 'with-highlights' : ''}`}>
                      <div className="car-image-placeholder">
                        <span>📸</span>
                      </div>
                      <div className="car-info">
                        <div className="car-header-info">
                          <h3>{car.nome_do_modelo}</h3>
                          {score > 0 && (
                            <div className="score-badge">
                              <span className="star">⭐</span>
                              <span className="score-count">{score}</span>
                            </div>
                          )}
                        </div>
                        <p className="brand">{car.fabricante}</p>
                        <p className="years">{car.anos_disponiveis || 'Anos não informados'}</p>
                        {carHighlights.length > 0 && (
                          <div className="highlights-list">
                            {carHighlights.map((highlight, idx) => (
                              <span key={idx} className="highlight-badge">{highlight}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeCar(index)}
                        className="remove-btn"
                        title="Remover da comparação"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {selectedCars.length > 0 && (
            <div className="comparison-section">
              {selectedCars.length > 1 && (
                <div className="highlights-summary">
                  <h2>🏆 Melhores Qualidades</h2>
                  <div className="highlights-grid">
                    {selectedCars.map((car, index) => {
                      const carHighlights = highlights.byIndex[index] || [];
                      const score = calculateOverallScore(index);
                      return (
                        <div key={index} className={`highlight-card ${score > 0 ? 'has-score' : 'no-score'}`}>
                          <div className="card-header">
                            <h3>{car.nome_do_modelo}</h3>
                            {score > 0 && (
                              <div className="score-display">
                                <span className="score-text">{score} Destaque{score > 1 ? 's' : ''}</span>
                              </div>
                            )}
                          </div>
                          {carHighlights.length > 0 ? (
                            <ul className="highlights-items">
                              {carHighlights.map((highlight, idx) => (
                                <li key={idx}>{highlight}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="no-highlights">Nenhuma destaque em relação aos outros</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="view-modes">
                <button
                  className={`mode-btn ${viewMode === 'categories' ? 'active' : ''}`}
                  onClick={() => setViewMode('categories')}
                >
                  📊 Por Categoria
                </button>
                <button
                  className={`mode-btn ${viewMode === 'detailed' ? 'active' : ''}`}
                  onClick={() => setViewMode('detailed')}
                >
                  📋 Visão Detalhada
                </button>
              </div>

              {viewMode === 'categories' ? (
                <div className="category-comparison">
                  {Object.entries(categories).map(([category, fields]) => (
                    <div key={category} className="category-block">
                      <button
                        className="category-title"
                        onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                      >
                        <span>{categoryLabels[category] || category}</span>
                        <span className="expand-icon">{expandedCategory === category ? '▼' : '▶'}</span>
                      </button>
                      {expandedCategory === category && (
                        <table className="comparison-table">
                          <tbody>
                            {fields
                              .filter(field => field !== 'fabricante' && field !== 'nome_do_modelo')
                              .map(field => {
                                const fieldLabel = field.replace(category + '_', '').replace(/_/g, ' ');
                                const isDifferent = compareValues(field);
                                return (
                                  <tr key={field} className={`field-row ${isDifferent ? 'different' : ''}`}>
                                    <td className="field-label">
                                      {fieldLabel.charAt(0).toUpperCase() + fieldLabel.slice(1).toLowerCase()}
                                    </td>
                                    {selectedCars.map((car, idx) => (
                                      <td 
                                        key={idx} 
                                        className={`field-value ${isFieldHighlighted(field, idx) ? 'highlighted' : ''}`}
                                      >
                                        {car[field] || '-'}
                                      </td>
                                    ))}
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="detailed-comparison">
                  <table className="detailed-table">
                    <thead>
                      <tr>
                        <th>Características</th>
                        {selectedCars.map((car, idx) => (
                          <th key={idx}>
                            <div className="car-header">
                              <strong>{car.nome_do_modelo}</strong>
                              <span>{car.fabricante}</span>
                              <span className="year">{car.anos_disponiveis}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(categories).map(([category, fields]) =>
                        fields
                          .filter(field => field !== 'fabricante' && field !== 'nome_do_modelo')
                          .map(field => {
                            const fieldLabel = field.replace(category + '_', '').replace(/_/g, ' ');
                            const isDifferent = compareValues(field);
                            return (
                              <tr key={field} className={`comparison-row ${isDifferent ? 'different' : ''}`}>
                                <td className="field-label">
                                  <strong>{fieldLabel.charAt(0).toUpperCase() + fieldLabel.slice(1).toLowerCase()}</strong>
                                </td>
                                {selectedCars.map((car, idx) => (
                                  <td 
                                    key={idx} 
                                    className={`field-value ${isFieldHighlighted(field, idx) ? 'highlighted' : ''}`}
                                  >
                                    {car[field] || '-'}
                                  </td>
                                ))}
                              </tr>
                            );
                          })
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <footer className="comparador-footer">
        <p>💡 Dica: Valores em amarelo indicam características diferentes entre os modelos</p>
        <p>🏆 Destaque: Cada carro recebe uma pontuação baseada em suas melhores qualidades comparativas</p>
      </footer>
    </div>
  );
};

export default ComparadorAvancado;
