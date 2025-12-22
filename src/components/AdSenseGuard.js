import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ADS_CLIENT_ID = 'ca-pub-6825782606132043';
const SCRIPT_ID = 'adsbygoogle-loader';

const allowedPaths = new Set([
  '/',
  '/utilitarios/comparador-carros',
  '/utilitarios/tabela-carros',
  '/conversores/temperatura',
  '/conversores/moedas',
  '/conversores/comprimento',
  '/conversores/peso',
  '/conversores/area',
  '/conversores/velocidade',
  '/conversores/volume',
  '/conversores/pressao',
  '/conversores/tempo',
  '/educacao/nota-final',
  '/educacao/densidade',
  '/educacao/cientifica',
  '/educacao/cronograma-estudos',
  '/educacao/notacao-cientifica',
  '/financas/desconto',
  '/financas/juros-compostos',
  '/financas/inss',
  '/financas/emprestimo',
  '/financas/fgts',
  '/financas/hipoteca',
  '/financas/horas-extras',
  '/financas/impostos',
  '/financas/margem-lucro',
  '/desenvolvimento/uuid',
  '/desenvolvimento/cpf',
  '/desenvolvimento/hash',
  '/desenvolvimento/base64',
  '/desenvolvimento/base-numerica',
  '/desenvolvimento/cnpj',
  '/desenvolvimento/hex-decimal',
  '/desenvolvimento/hex-rgb',
  '/desenvolvimento/json',
  '/desenvolvimento/md5',
  '/desenvolvimento/paleta-cores',
  '/desenvolvimento/sha256',
  '/desenvolvimento/url-encoder',
  '/texto/maiuscula-minuscula',
  '/texto/removedor-acentos',
  '/texto/palavras-caracteres',
  '/utilitarios/imc',
  '/utilitarios/porcentagem',
  '/utilitarios/idade',
  '/utilitarios/cpf-validador',
  '/utilitarios/calorias',
  '/utilitarios/cnpj-validador',
  '/utilitarios/dias-restantes',
  '/utilitarios/energia',
  '/utilitarios/numero-aleatorio',
  '/utilitarios/senha'
]);

const removeAutoAds = () => {
  const selectors = [
    'ins.adsbygoogle',
    'ins[data-adsbygoogle-status]',
    'iframe[id^="aswift_"]',
    'div[id^="google_ads"]',
    'div[id^="google_ads_iframe"]'
  ];

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((node) => node.remove());
  });
};

const disableAds = () => {
  const loader = document.getElementById(SCRIPT_ID);
  if (loader) {
    loader.remove();
  }

  removeAutoAds();

  if (window.adsbygoogle) {
    window.adsbygoogle.length = 0;
  }
};

const ensureAdScript = () => {
  if (document.getElementById(SCRIPT_ID)) {
    return;
  }

  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CLIENT_ID}`;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
};

function AdSenseGuard() {
  const location = useLocation();

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const allowed = allowedPaths.has(location.pathname);

    if (allowed) {
      ensureAdScript();
    } else {
      disableAds();
    }
  }, [location.pathname]);

  return null;
}

export default AdSenseGuard;
