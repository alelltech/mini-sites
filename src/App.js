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

// Finanças
import Desconto from './pages/financas/Desconto.js';
import JurosCompostos from './pages/financas/JurosCompostos.js';
import INSS from './pages/financas/INSS.js';

// Desenvolvimento
import UUID from './pages/desenvolvimento/UUID.js';
import GeradorcPF from './pages/desenvolvimento/GeradorcPF.js';
import Hash from './pages/desenvolvimento/Hash.js';

// Texto
import MaiusculaMinuscula from './pages/texto/MaiusculaMinuscula.js';
import RemovedorAcentos from './pages/texto/RemovedorAcentos.js';
import PalavrasCaracteres from './pages/texto/PalavrasCaracteres.js';

// Utilitários
import IMC from './pages/utilitarios/IMC.js';
import Porcentagem from './pages/utilitarios/Porcentagem.js';
import Idade from './pages/utilitarios/Idade.js';
import CPFValidador from './pages/utilitarios/CPFValidador.js';

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

          {/* Finanças */}
          <Route path="/financas/desconto" element={<Desconto />} />
          <Route path="/financas/juros-compostos" element={<JurosCompostos />} />
          <Route path="/financas/inss" element={<INSS />} />

          {/* Desenvolvimento */}
          <Route path="/desenvolvimento/uuid" element={<UUID />} />
          <Route path="/desenvolvimento/cpf" element={<GeradorcPF />} />
          <Route path="/desenvolvimento/hash" element={<Hash />} />

          {/* Texto */}
          <Route path="/texto/maiuscula-minuscula" element={<MaiusculaMinuscula />} />
          <Route path="/texto/removedor-acentos" element={<RemovedorAcentos />} />
          <Route path="/texto/palavras-caracteres" element={<PalavrasCaracteres />} />

          {/* Utilitários */}
          <Route path="/utilitarios/imc" element={<IMC />} />
          <Route path="/utilitarios/porcentagem" element={<Porcentagem />} />
          <Route path="/utilitarios/idade" element={<Idade />} />
          <Route path="/utilitarios/cpf-validador" element={<CPFValidador />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
