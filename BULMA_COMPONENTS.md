# Componentes Bulma para CalcZone BR

## 1. Navbar
```html
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <strong>CalcZone BR</strong>
    </a>
  </div>
  <div class="navbar-menu">
    <div class="navbar-end">
      <div class="navbar-item">
        <a href="/" class="button is-primary">Home</a>
      </div>
    </div>
  </div>
</nav>
```

## 2. Hero Section
```html
<section class="hero is-large">
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title">CalcZone BR</h1>
      <p class="subtitle">50+ Calculadoras Online Grátis</p>
      <p>Finanças, Conversores, Ferramentas Educacionais e muito mais</p>
    </div>
  </div>
</section>
```

## 3. Grid de Calculadoras
```html
<section class="section">
  <div class="container">
    <h2 class="section-title">Nossas Calculadoras</h2>
    <div class="calculators-grid">
      <!-- Card Template -->
      <div class="card calculator-card">
        <div class="card-image">📊</div>
        <div class="card-header">
          <p class="card-header-title">Calculadora FGTS</p>
        </div>
        <div class="card-content">
          <p>Calcule seu saldo FGTS de forma rápida e precisa</p>
        </div>
      </div>
      <!-- Repetir para mais cards -->
    </div>
  </div>
</section>
```

## 4. Footer
```html
<footer class="footer">
  <div class="container">
    <div class="columns">
      <div class="column">
        <h4><strong>CalcZone BR</strong></h4>
        <p>Plataforma de calculadoras online grátis e confiável</p>
      </div>
      <div class="column">
        <h5><strong>Links Úteis</strong></h5>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/sobre">Sobre</a></li>
          <li><a href="/contato">Contato</a></li>
        </ul>
      </div>
    </div>
    <hr>
    <div class="has-text-centered">
      <p>&copy; 2024 CalcZone BR. Todos os direitos reservados.</p>
    </div>
  </div>
</footer>
```

## 5. Formulário
```html
<div class="field">
  <label class="label">Email</label>
  <div class="control">
    <input class="input" type="email" placeholder="seu@email.com">
  </div>
</div>

<div class="field">
  <label class="label">Mensagem</label>
  <div class="control">
    <textarea class="textarea" placeholder="Sua mensagem aqui..."></textarea>
  </div>
</div>

<div class="field">
  <div class="control">
    <button class="button is-primary">Enviar</button>
  </div>
</div>
```

## 6. Tabela com Bulma
```html
<table class="table is-striped is-hoverable is-fullwidth">
  <thead>
    <tr>
      <th>Calculadora</th>
      <th>Descrição</th>
      <th>Categoria</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Calculadora FGTS</td>
      <td>Calcula saldo FGTS</td>
      <td><span class="tag is-primary">Finanças</span></td>
    </tr>
  </tbody>
</table>
```

## 7. Notificações
```html
<!-- Sucesso -->
<div class="notification is-success">
  <button class="delete"></button>
  Operação realizada com sucesso!
</div>

<!-- Erro -->
<div class="notification is-danger">
  <button class="delete"></button>
  Houve um erro ao processar a requisição
</div>

<!-- Aviso -->
<div class="notification is-warning">
  <button class="delete"></button>
  Este valor pode estar incorreto
</div>
```

## 8. Columns Layout
```html
<div class="columns">
  <div class="column is-one-third">
    <p>33% da largura</p>
  </div>
  <div class="column is-two-thirds">
    <p>66% da largura</p>
  </div>
</div>

<div class="columns">
  <div class="column">
    <p>50% - responsivo</p>
  </div>
  <div class="column">
    <p>50% - responsivo</p>
  </div>
</div>
```

## 9. Breadcrumb
```html
<nav class="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/financas">Finanças</a></li>
    <li class="is-active"><a href="#" aria-current="page">Calculadora FGTS</a></li>
  </ul>
</nav>
```

## 10. Tabs
```html
<div class="tabs is-boxed">
  <ul>
    <li class="is-active"><a href="#tab1">Conversores</a></li>
    <li><a href="#tab2">Finanças</a></li>
    <li><a href="#tab3">Educação</a></li>
  </ul>
</div>
```

## Cores do Bulma
- `is-primary`: #3273dc (Azul)
- `is-success`: #48c774 (Verde)
- `is-info`: #3298dc (Cyan)
- `is-warning`: #ffdd57 (Amarelo)
- `is-danger`: #f14668 (Vermelho)

## Classes Úteis
- `.has-text-centered`: Centraliza texto
- `.is-fullwidth`: Largura 100%
- `.mt-6`, `.mb-6`, etc: Margin top/bottom
- `.p-4`: Padding
- `.is-hidden-mobile`: Oculta em mobile
- `.is-hidden-tablet`: Oculta em tablet
