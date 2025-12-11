import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Home from './pages/Home.js';

// Conversores
import ConvertorTemperatura from './pages/conversores/Temperatura.js';
import ConvertorMoedas from './pages/conversores/Moedas.js';
import ConvertorComprimento from './pages/conversores/Comprimento.js';
import ConvertorPeso from './pages/conversores/Peso.js';
import ConvertorArea from './pages/conversores/Area.js';
import ConvertorVelocidade from './pages/conversores/Velocidade.js';
import ConvertorVolume from './pages/conversores/Volume.js';
import ConvertorPressao from './pages/conversores/Pressao.js';
import ConvertorTempo from './pages/conversores/Tempo.js';

// Educação
import NotaFinal from './pages/educacao/NotaFinal.js';
import Densidade from './pages/educacao/Densidade.js';
import CalculadoraCientifica from './pages/educacao/CalculadoraCientifica.js';
import CronogramaEstudos from './pages/educacao/CronogramaEstudos.js';
import NotacaoCientifica from './pages/educacao/NotacaoCientifica.js';

// Finanças
import Desconto from './pages/financas/Desconto.js';
import JurosCompostos from './pages/financas/JurosCompostos.js';
import INSS from './pages/financas/INSS.js';
import SimuladorEmprestimo from './pages/financas/SimuladorEmprestimo.js';
import CalculadoraFGTS from './pages/financas/CalculadoraFGTS.js';
import CalculadoraHipoteca from './pages/financas/CalculadoraHipoteca.js';
import CalculadoraHorasExtras from './pages/financas/CalculadoraHorasExtras.js';
import CalculadoraImpostos from './pages/financas/CalculadoraImpostos.js';
import CalculadoraMargemLucro from './pages/financas/CalculadoraMargemLucro.js';

// Desenvolvimento
import UUID from './pages/desenvolvimento/UUID.js';
import GeradorcPF from './pages/desenvolvimento/GeradorcPF.js';
import Hash from './pages/desenvolvimento/Hash.js';
import Base64 from './pages/desenvolvimento/Base64.js';
import BaseNumerica from './pages/desenvolvimento/BaseNumerica.js';
import GeradorCNPJ from './pages/desenvolvimento/GeradorCNPJ.js';
import HexDecimal from './pages/desenvolvimento/HexDecimal.js';
import HexRGB from './pages/desenvolvimento/HexRGB.js';
import JSONFormatter from './pages/desenvolvimento/JSONFormatter.js';
import MD5 from './pages/desenvolvimento/MD5.js';
import PaletaCores from './pages/desenvolvimento/PaletaCores.js';
import SHA256 from './pages/desenvolvimento/SHA256.js';
import URLEncoder from './pages/desenvolvimento/URLEncoder.js';

// Texto
import MaiusculaMinuscula from './pages/texto/MaiusculaMinuscula.js';
import RemovedorAcentos from './pages/texto/RemovedorAcentos.js';
import PalavrasCaracteres from './pages/texto/PalavrasCaracteres.js';

// Utilitários
import IMC from './pages/utilitarios/IMC.js';
import Porcentagem from './pages/utilitarios/Porcentagem.js';
import Idade from './pages/utilitarios/Idade.js';
import CPFValidador from './pages/utilitarios/CPFValidador.js';
import CalculadoraCalorias from './pages/utilitarios/CalculadoraCalorias.js';
import ValidadorCNPJ from './pages/utilitarios/ValidadorCNPJ.js';
import ContadorDiasRestantes from './pages/utilitarios/ContadorDiasRestantes.js';
import CalculadoraEnergia from './pages/utilitarios/CalculadoraEnergia.js';
import GeradorNumeroAleatorio from './pages/utilitarios/GeradorNumeroAleatorio.js';
import GeradorSenha from './pages/utilitarios/GeradorSenha.js';

import './styles/App.css';

function App() {
  return (
    <Router>
      <Header />
      <main className="main-content">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Conversores */}
          <Route path="/conversores/temperatura" element={<ConvertorTemperatura />} />
          <Route path="/conversores/moedas" element={<ConvertorMoedas />} />
          <Route path="/conversores/comprimento" element={<ConvertorComprimento />} />
          <Route path="/conversores/peso" element={<ConvertorPeso />} />
          <Route path="/conversores/area" element={<ConvertorArea />} />
          <Route path="/conversores/velocidade" element={<ConvertorVelocidade />} />
          <Route path="/conversores/volume" element={<ConvertorVolume />} />
          <Route path="/conversores/pressao" element={<ConvertorPressao />} />
          <Route path="/conversores/tempo" element={<ConvertorTempo />} />

          {/* Educação */}
          <Route path="/educacao/nota-final" element={<NotaFinal />} />
          <Route path="/educacao/densidade" element={<Densidade />} />
          <Route path="/educacao/cientifica" element={<CalculadoraCientifica />} />
          <Route path="/educacao/cronograma-estudos" element={<CronogramaEstudos />} />
          <Route path="/educacao/notacao-cientifica" element={<NotacaoCientifica />} />

          {/* Finanças */}
          <Route path="/financas/desconto" element={<Desconto />} />
          <Route path="/financas/juros-compostos" element={<JurosCompostos />} />
          <Route path="/financas/inss" element={<INSS />} />
          <Route path="/financas/emprestimo" element={<SimuladorEmprestimo />} />
          <Route path="/financas/fgts" element={<CalculadoraFGTS />} />
          <Route path="/financas/hipoteca" element={<CalculadoraHipoteca />} />
          <Route path="/financas/horas-extras" element={<CalculadoraHorasExtras />} />
          <Route path="/financas/impostos" element={<CalculadoraImpostos />} />
          <Route path="/financas/margem-lucro" element={<CalculadoraMargemLucro />} />

          {/* Desenvolvimento */}
          <Route path="/desenvolvimento/uuid" element={<UUID />} />
          <Route path="/desenvolvimento/cpf" element={<GeradorcPF />} />
          <Route path="/desenvolvimento/hash" element={<Hash />} />
          <Route path="/desenvolvimento/base64" element={<Base64 />} />
          <Route path="/desenvolvimento/base-numerica" element={<BaseNumerica />} />
          <Route path="/desenvolvimento/cnpj" element={<GeradorCNPJ />} />
          <Route path="/desenvolvimento/hex-decimal" element={<HexDecimal />} />
          <Route path="/desenvolvimento/hex-rgb" element={<HexRGB />} />
          <Route path="/desenvolvimento/json" element={<JSONFormatter />} />
          <Route path="/desenvolvimento/md5" element={<MD5 />} />
          <Route path="/desenvolvimento/paleta-cores" element={<PaletaCores />} />
          <Route path="/desenvolvimento/sha256" element={<SHA256 />} />
          <Route path="/desenvolvimento/url-encoder" element={<URLEncoder />} />

          {/* Texto */}
          <Route path="/texto/maiuscula-minuscula" element={<MaiusculaMinuscula />} />
          <Route path="/texto/removedor-acentos" element={<RemovedorAcentos />} />
          <Route path="/texto/palavras-caracteres" element={<PalavrasCaracteres />} />

          {/* Utilitários */}
          <Route path="/utilitarios/imc" element={<IMC />} />
          <Route path="/utilitarios/porcentagem" element={<Porcentagem />} />
          <Route path="/utilitarios/idade" element={<Idade />} />
          <Route path="/utilitarios/cpf-validador" element={<CPFValidador />} />
          <Route path="/utilitarios/calorias" element={<CalculadoraCalorias />} />
          <Route path="/utilitarios/cnpj-validador" element={<ValidadorCNPJ />} />
          <Route path="/utilitarios/dias-restantes" element={<ContadorDiasRestantes />} />
          <Route path="/utilitarios/energia" element={<CalculadoraEnergia />} />
          <Route path="/utilitarios/numero-aleatorio" element={<GeradorNumeroAleatorio />} />
          <Route path="/utilitarios/senha" element={<GeradorSenha />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
