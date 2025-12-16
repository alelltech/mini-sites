import React, { useState, useEffect } from 'react';
import '../../../styles/Comparador.css';
import carsData from '../../../public/data/cars/meta_data.json';

const Comparador = () => {
  const [selectedCars, setSelectedCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [filteredModels, setFilteredModels] = useState([]);
  const [viewMode, setViewMode] = useState('categories'); // 'categories' ou 'detailed'

  // Extrair marcas únicas
  const brands = carsData.meta_data_views.fabricante;

  // Atualizar modelos filtrados baseado na marca e busca
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

    setFilteredModels(filtered.slice(0, 20)); // Limitar a 20 resultados
  }, [selectedBrand, searchTerm]);

  // Adicionar carro à comparação
  const addCar = (modelName) => {
    if (selectedCars.length < 4 && !selectedCars.find(car => car.nome_do_modelo === modelName)) {
      const carDetails = carsData.models.find(car => car.nome_do_modelo === modelName);
      if (carDetails) {
        setSelectedCars([...selectedCars, carDetails]);
      }
    }
  };

  // Remover carro da comparação
  const removeCar = (index) => {
    setSelectedCars(selectedCars.filter((_, i) => i !== index));
  };

  // Agrupar campos por categoria
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

  return (
    <div className="comparador-container">
      <div className="comparador-header">
        <h1>Comparador de Carros</h1>
        <p>Selecione até 4 modelos para comparar características</p>
      </div>

      <div className="comparador-content">
        <div className="comparador-sidebar">
          <div className="search-section">
            <h3>Buscar Modelo</h3>
            <input
              type="text"
              placeholder="Digite o modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="brand-section">
            <h3>Filtrar por Marca</h3>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="brand-select"
            >
              <option value="">Todas as marcas</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="models-section">
            <h3>Modelos Disponíveis ({filteredModels.length})</h3>
            <div className="models-list">
              {filteredModels.map(model => (
                <div key={model} className="model-item">
                  <span className="model-name">{model}</span>
                  <button
                    onClick={() => addCar(model)}
                    disabled={selectedCars.length >= 4 || selectedCars.find(c => c.nome_do_modelo === model)}
                    className="add-btn"
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="comparador-main">
          <div className="selected-cars">
            <h2>Modelos Selecionados ({selectedCars.length}/4)</h2>
            <div className="selected-list">
              {selectedCars.length === 0 ? (
                <div className="no-cars">
                  <p>Nenhum carro selecionado. Escolha um modelo para começar a comparação.</p>
                </div>
              ) : (
                selectedCars.map((car, index) => (
                  <div key={index} className="selected-car-item">
                    <div className="car-card-header">
                      <div>
                        <h3>{car.nome_do_modelo}</h3>
                        <p>{car.fabricante}</p>
                      </div>
                      <button
                        onClick={() => removeCar(index)}
                        className="remove-btn"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {selectedCars.length > 0 && (
            <div className="comparison-section">
              <div className="view-modes">
                <button
                  className={`mode-btn ${viewMode === 'categories' ? 'active' : ''}`}
                  onClick={() => setViewMode('categories')}
                >
                  Por Categoria
                </button>
                <button
                  className={`mode-btn ${viewMode === 'detailed' ? 'active' : ''}`}
                  onClick={() => setViewMode('detailed')}
                >
                  Visão Detalhada
                </button>
              </div>

              {viewMode === 'categories' ? (
                <div className="category-comparison">
                  {Object.entries(categories).map(([category, fields]) => (
                    <div key={category} className="category-block">
                      <h3 className="category-title">
                        {categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1)}
                      </h3>
                      <table className="comparison-table">
                        <tbody>
                          {fields
                            .filter(field => field !== 'fabricante' && field !== 'nome_do_modelo')
                            .map(field => {
                              const fieldLabel = field.replace(category + '_', '').replace(/_/g, ' ');
                              return (
                                <tr key={field} className="field-row">
                                  <td className="field-label">
                                    {fieldLabel.charAt(0).toUpperCase() + fieldLabel.slice(1).toLowerCase()}
                                  </td>
                                  {selectedCars.map((car, idx) => (
                                    <td key={idx} className="field-value">
                                      {car[field] || '-'}
                                    </td>
                                  ))}
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
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
                            return (
                              <tr key={field} className="comparison-row">
                                <td className="field-label">
                                  <strong>{fieldLabel.charAt(0).toUpperCase() + fieldLabel.slice(1).toLowerCase()}</strong>
                                </td>
                                {selectedCars.map((car, idx) => (
                                  <td key={idx} className="field-value">
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
    </div>
  );
};

export default Comparador;
