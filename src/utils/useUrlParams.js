import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook para ler parâmetros da URL e aplicar em estados
 * Usado para preencher campos automaticamente quando redirecionado do chat
 */
export const useUrlParams = (setters) => {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    // Aplicar cada parâmetro ao setter correspondente
    Object.entries(setters).forEach(([paramName, setter]) => {
      const value = searchParams.get(paramName);
      if (value !== null && value !== '') {
        // Pequeno delay para evitar problemas de renderização
        setTimeout(() => {
          setter(value);
        }, 100);
      }
    });
  }, [location.search]);
};

export default useUrlParams;
