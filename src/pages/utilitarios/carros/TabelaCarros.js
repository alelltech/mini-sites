import React, { useState, useMemo, useCallback } from 'react';
import carsData from '../../../../public/data/cars/meta_data.json';

const TabelaCarros = () => {
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pinnedCars, setPinnedCars] = useState([]);
  const [pinnedOrder, setPinnedOrder] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [searchGlobal, setSearchGlobal] = useState('');
  const itemsPerPage = 25;

  // Colunas principais a exibir
  const columns = [
    { key: 'fabricante', label: 'Marca', sortable: true },
    { key: 'nome_do_modelo', label: 'Modelo', sortable: true },
    { key: 'anos_disponiveis', label: 'Anos', sortable: true },
    { key: 'motor_potencia_cv', label: 'Potência (CV)', sortable: true, type: 'numeric' },
    { key: 'motor_torque_kgfm', label: 'Torque (kgfm)', sortable: true, type: 'numeric' },
    { key: 'desempenho_velocidade_maxima_kmph', label: 'Vel. Máx (km/h)', sortable: true, type: 'numeric' },
    { key: 'desempenho_aceleracao0100', label: 'Aceleração 0-100', sortable: true },
    { key: 'desempenho_consumo_combustivel_cidade_kmpl', label: 'Consumo Urbano', sortable: true, type: 'numeric' },
    { key: 'dimensoes_comprimento', label: 'Comprimento', sortable: true },
    { key: 'dimensoes_altura', label: 'Altura', sortable: true },
    { key: 'dimensoes_largura', label: 'Largura', sortable: true },
    { key: 'dimensoes_peso_em_ordem_de_marcha', label: 'Peso', sortable: true },
    { key: 'motor_tipo_de_combustivel', label: 'Combustível', sortable: true },
    { key: 'motor_transmissao', label: 'Transmissão', sortable: true },
  ];

  // Filtrar e ordenar dados
  const filteredAndSortedData = useMemo(() => {
    let data = [...carsData.models];

    // Aplicar filtros por coluna
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        data = data.filter(car => {
          const value = String(car[key] || '').toLowerCase();
          return value.includes(String(filters[key]).toLowerCase());
        });
      }
    });

    // Aplicar busca global
    if (searchGlobal) {
      const searchLower = searchGlobal.toLowerCase();
      data = data.filter(car =>
        columns.some(col => String(car[col.key] || '').toLowerCase().includes(searchLower))
      );
    }

    // Separar carros fixados e não fixados
    const pinnedCarsData = data.filter(car => pinnedCars.includes(car.nome_do_modelo));
    const unpinnedCarsData = data.filter(car => !pinnedCars.includes(car.nome_do_modelo));

    // Ordenar não fixados
    if (sortConfig) {
      unpinnedCarsData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (sortConfig.column?.type === 'numeric') {
          const aNum = parseFloat(String(aValue).match(/[\d.]+/)?.[0] || 0);
          const bNum = parseFloat(String(bValue).match(/[\d.]+/)?.[0] || 0);
          return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Ordenar fixados conforme array pinnedOrder
    const sortedPinned = pinnedOrder.map(modelName =>
      pinnedCarsData.find(car => car.nome_do_modelo === modelName)
    ).filter(Boolean);

    return [...sortedPinned, ...unpinnedCarsData];
  }, [filters, searchGlobal, sortConfig, pinnedCars, pinnedOrder]);

  // Paginação (não incluir fixados na contagem)
  const unpinnedData = filteredAndSortedData.filter(car => !pinnedCars.includes(car.nome_do_modelo));
  const totalPages = Math.ceil(unpinnedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUnpinned = unpinnedData.slice(startIndex, startIndex + itemsPerPage);
  const pinnedDisplay = filteredAndSortedData.filter(car => pinnedCars.includes(car.nome_do_modelo));
  const displayData = [...pinnedDisplay, ...paginatedUnpinned];

  // Handlers
  const handleFilterChange = useCallback((column, value) => {
    setFilters(prev => ({
      ...prev,
      [column]: value
    }));
    setCurrentPage(1);
  }, []);

  const handleSort = useCallback((column) => {
    setSortConfig(prev => {
      if (prev?.key === column.key) {
        return { ...prev, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key: column.key, direction: 'asc', column };
    });
  }, []);

  const togglePin = useCallback((modelName) => {
    setPinnedCars(prev => {
      if (prev.includes(modelName)) {
        return prev.filter(name => name !== modelName);
      }
      return [...prev, modelName];
    });

    setPinnedOrder(prev => {
      if (prev.includes(modelName)) {
        return prev.filter(name => name !== modelName);
      }
      return [...prev, modelName];
    });
  }, []);

  const movePin = useCallback((modelName, direction) => {
    setPinnedOrder(prev => {
      const index = prev.indexOf(modelName);
      if (direction === 'up' && index > 0) {
        const newOrder = [...prev];
        [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
        return newOrder;
      }
      if (direction === 'down' && index < prev.length - 1) {
        const newOrder = [...prev];
        [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
        return newOrder;
      }
      return prev;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({});
    setSearchGlobal('');
    setCurrentPage(1);
    setSortConfig(null);
  }, []);

  const clearPins = useCallback(() => {
    setPinnedCars([]);
    setPinnedOrder([]);
  }, []);

  // Renderizar célula
  const renderCellValue = (car, column) => {
    const value = car[column.key];
    if (!value) return '-';
    if (typeof value === 'string' && value.length > 50) {
      return <span title={value}>{value.substring(0, 50)}...</span>;
    }
    return value;
  };

  return (
    <>
      <section className="hero is-info">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">🚗 Tabela Completa de Carros</h1>
            <p className="subtitle">
              Total: <strong>{carsData.models.length}</strong> | Encontrados: <strong>{filteredAndSortedData.length}</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mb-5">
            <div className="columns is-gapless is-multiline">
              <div className="column is-full-tablet is-three-quarters-desktop">
                <div className="field has-addons">
                  <div className="control is-expanded has-icons-left">
                    <input
                      type="text"
                      placeholder="🔍 Buscar em todas as colunas..."
                      value={searchGlobal}
                      onChange={(e) => {
                        setSearchGlobal(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="input is-large"
                    />
                    <span className="icon is-left">
                      <i className="fas fa-search"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="column is-full-tablet is-one-quarter-desktop">
                <div className="buttons are-medium is-fullwidth">
                  <button className="button is-fullwidth" onClick={clearAllFilters} title="Limpar todos os filtros">
                    <span className="icon-text">
                      <span className="icon">
                        <i className="fas fa-times"></i>
                      </span>
                      <span>Limpar</span>
                    </span>
                  </button>
                  {pinnedCars.length > 0 && (
                    <button className="button is-warning is-fullwidth" onClick={clearPins} title="Desafixar todos">
                      <span className="icon-text">
                        <span className="icon">
                          <i className="fas fa-unlock"></i>
                        </span>
                        <span>Desafixar ({pinnedCars.length})</span>
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="table-container">
            <table className="table is-striped is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th style={{ width: '80px', textAlign: 'center' }}>📌</th>
                  {columns.map(column => (
                    <th key={column.key}>
                      {column.sortable ? (
                        <div className="mb-2">
                          <button
                            className="button is-white is-small is-fullwidth has-text-left"
                            onClick={() => handleSort(column)}
                          >
                            <span className="icon-text is-fullwidth">
                              <span>{column.label}</span>
                              {sortConfig?.key === column.key && (
                                <span className="icon is-small">
                                  {sortConfig.direction === 'asc' ? '▲' : '▼'}
                                </span>
                              )}
                            </span>
                          </button>
                        </div>
                      ) : (
                        <div className="mb-2">{column.label}</div>
                      )}
                      <input
                        type="text"
                        placeholder="Filtrar..."
                        value={filters[column.key] || ''}
                        onChange={(e) => handleFilterChange(column.key, e.target.value)}
                        className="input is-small"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayData.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + 1} style={{ textAlign: 'center', padding: '40px' }}>
                      <p className="has-text-grey">
                        <em>Nenhum carro encontrado</em>
                      </p>
                    </td>
                  </tr>
                ) : (
                  displayData.map((car, index) => {
                    const isPinned = pinnedCars.includes(car.nome_do_modelo);
                    const pinnedIndex = pinnedOrder.indexOf(car.nome_do_modelo);
                    return (
                      <tr key={`${car.nome_do_modelo}-${index}`} style={isPinned ? { backgroundColor: '#f5f5f5' } : {}}>
                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                          <div className="buttons are-small">
                            <button
                              className={`button is-small ${isPinned ? 'is-warning' : 'is-light'}`}
                              onClick={() => togglePin(car.nome_do_modelo)}
                              title={isPinned ? 'Desafixar' : 'Fixar no topo'}
                            >
                              {isPinned ? '📌' : '📍'}
                            </button>
                          </div>
                          {isPinned && (
                            <div className="buttons are-small is-centered mt-2">
                              <button
                                className="button is-small is-info"
                                onClick={() => movePin(car.nome_do_modelo, 'up')}
                                disabled={pinnedIndex === 0}
                                title="Mover para cima"
                              >
                                ▲
                              </button>
                              <button
                                className="button is-small is-info"
                                onClick={() => movePin(car.nome_do_modelo, 'down')}
                                disabled={pinnedIndex === pinnedOrder.length - 1}
                                title="Mover para baixo"
                              >
                                ▼
                              </button>
                            </div>
                          )}
                        </td>
                        {columns.map(column => (
                          <td key={column.key} title={car[column.key] || '-'}>
                            {renderCellValue(car, column)}
                          </td>
                        ))}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {filteredAndSortedData.length > 0 && (
            <nav className="level is-mobile my-5">
              <div className="level-left">
                <div className="level-item">
                  <p className="heading">
                    Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong> | 
                    Exibindo <strong>{Math.min(itemsPerPage, unpinnedData.length)}</strong> de <strong>{unpinnedData.length}</strong>
                    {pinnedCars.length > 0 && ` + ${pinnedCars.length} fixado(s)`}
                  </p>
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  <div className="buttons are-small">
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="button"
                      title="Primeira página"
                    >
                      ⏮
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="button"
                      title="Página anterior"
                    >
                      ◀
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`button ${currentPage === pageNum ? 'is-info' : ''}`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="button"
                      title="Próxima página"
                    >
                      ▶
                    </button>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="button"
                      title="Última página"
                    >
                      ⏭
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          )}

          <div className="box mt-5">
            <div className="columns is-multiline">
              <div className="column is-half-tablet is-one-third-desktop">
                <span className="icon-text">
                  <span className="icon">📌</span>
                  <span>Fixar/desafixar no topo</span>
                </span>
              </div>
              <div className="column is-half-tablet is-one-third-desktop">
                <span className="icon-text">
                  <span className="icon">▲ ▼</span>
                  <span>Reordenar fixados</span>
                </span>
              </div>
              <div className="column is-half-tablet is-one-third-desktop">
                <span className="icon-text">
                  <span className="icon">🔼 🔽</span>
                  <span>Clique no cabeçalho para ordenar</span>
                </span>
              </div>
              <div className="column is-full">
                <span className="icon-text">
                  <span className="icon">🔍</span>
                  <span>Digite nos filtros por coluna ou na barra global</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TabelaCarros;
