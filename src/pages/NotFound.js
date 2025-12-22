import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="not-found">
      <h1>Página não encontrada</h1>
      <p>O conteúdo que você procura não existe ou foi movido.</p>
      <Link className="button" to="/">Voltar para a página inicial</Link>
    </section>
  );
}

export default NotFound;
