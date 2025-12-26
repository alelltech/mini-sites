/**
 * MiniChatBot - Agente conversacional compacto (~15KB)
 * Extrai entidades e parâmetros de comandos em linguagem natural
 */
class MiniChatBot {
  constructor() {
    this.intents = this.buildIntents();
    this.context = {};
  }

  buildIntents() {
    return {
      financiamento: {
        patterns: [
          'financiamento', 'financiar', 'parcelar', 'financiamento de',
          'financiamento para', 'quero financiar', 'simular financiamento',
          'parcelas', 'prestacao', 'prestações'
        ],
        entities: ['valor', 'entrada', 'parcelas'],
        responses: ['Vou simular o financiamento para você.'],
        action: '/financas/emprestimo',
        fillForm: (params) => ({
          valorTotal: params.valor,
          entrada: params.entrada || 0,
          numeroParcelas: params.parcelas || 48,
          taxaJuros: 1.5 // taxa padrão
        })
      },
      jurosCompostos: {
        patterns: [
          'juros', 'investimento', 'aplicação', 'aplicacao', 'rendimento',
          'poupança', 'poupanca', 'quanto rende', 'investir'
        ],
        entities: ['valor', 'periodo', 'taxa'],
        responses: ['Vou calcular o rendimento do seu investimento.'],
        action: '/financas/juros-compostos',
        fillForm: (params) => ({
          valorInicial: params.valor,
          periodo: params.periodo || 12,
          taxaJuros: params.taxa || 0.5
        })
      },
      desconto: {
        patterns: [
          'desconto', 'promoção', 'promocao', 'economia',
          'quanto economizo', 'calcular desconto', 'desconto de'
        ],
        entities: ['valor', 'percentual'],
        responses: ['Calculando o desconto.'],
        action: '/financas/desconto',
        fillForm: (params) => ({
          valorOriginal: params.valor,
          percentualDesconto: params.percentual || 10
        })
      },
      imc: {
        patterns: ['imc', 'peso ideal', 'massa corporal', 'indice de massa'],
        entities: ['peso', 'altura'],
        responses: ['Vou calcular seu IMC.'],
        action: '/utilitarios/imc',
        fillForm: (params) => ({
          peso: params.peso,
          altura: params.altura
        })
      },
      fgts: {
        patterns: ['fgts', 'fundo de garantia', 'saque fgts'],
        entities: ['salario', 'tempo'],
        responses: ['Abrindo a Calculadora de FGTS.'],
        action: '/financas/fgts',
        fillForm: (params) => ({
          salario: params.salario,
          meses: params.tempo || 12
        })
      },
      inss: {
        patterns: ['inss', 'previdencia', 'previdência', 'contribuição', 'contribuicao'],
        entities: ['salario'],
        responses: ['Calculando a contribuição ao INSS.'],
        action: '/financas/inss',
        fillForm: (params) => ({
          salario: params.salario
        })
      },
      impostos: {
        patterns: ['imposto', 'ir', 'irpf', 'tributo', 'imposto de renda'],
        entities: ['salario'],
        responses: ['Calculando os impostos.'],
        action: '/financas/impostos',
        fillForm: (params) => ({
          rendaMensal: params.salario
        })
      },
      conversaoMoeda: {
        patterns: [
          'converter', 'conversão', 'conversao', 'moeda', 'dolar',
          'dollar', 'euro', 'real', 'cotação', 'cotacao'
        ],
        entities: ['valor', 'moedaOrigem', 'moedaDestino'],
        responses: ['Abrindo o conversor de moedas.'],
        action: '/conversores/moedas',
        fillForm: (params) => ({
          valor: params.valor,
          de: params.moedaOrigem || 'BRL',
          para: params.moedaDestino || 'USD'
        })
      },
      temperatura: {
        patterns: ['temperatura', 'celsius', 'fahrenheit', 'kelvin'],
        entities: ['valor'],
        responses: ['Convertendo temperatura.'],
        action: '/conversores/temperatura',
        fillForm: (params) => ({
          valor: params.valor
        })
      },
      peso: {
        patterns: ['peso', 'quilograma', 'kg', 'grama', 'tonelada', 'libra'],
        entities: ['valor'],
        responses: ['Convertendo peso.'],
        action: '/conversores/peso',
        fillForm: (params) => ({
          valor: params.valor
        })
      },
      comprimento: {
        patterns: [
          'metro', 'centimetro', 'quilometro', 'milha', 'distancia',
          'distância', 'km', 'cm'
        ],
        entities: ['valor'],
        responses: ['Convertendo comprimento.'],
        action: '/conversores/comprimento',
        fillForm: (params) => ({
          valor: params.valor
        })
      },
      carros: {
        patterns: [
          'carro', 'veiculo', 'veículo', 'comparar', 'fipe',
          'tabela fipe', 'preço carro', 'preco carro'
        ],
        entities: ['marca', 'modelo'],
        responses: ['Abrindo o Comparador de Carros.'],
        action: '/utilitarios/comparador-carros',
        fillForm: (params) => ({
          marca: params.marca,
          modelo: params.modelo
        })
      },
      cpf: {
        patterns: ['cpf', 'gerar cpf', 'validar cpf', 'gerador de cpf'],
        entities: [],
        responses: ['Abrindo o Gerador de CPF.'],
        action: '/desenvolvimento/cpf'
      },
      cnpj: {
        patterns: ['cnpj', 'gerar cnpj', 'validar cnpj', 'gerador de cnpj'],
        entities: [],
        responses: ['Abrindo o Gerador de CNPJ.'],
        action: '/desenvolvimento/cnpj'
      },
      senha: {
        patterns: ['senha', 'password', 'gerar senha', 'gerador de senha'],
        entities: ['tamanho'],
        responses: ['Abrindo o Gerador de Senhas.'],
        action: '/utilitarios/senha',
        fillForm: (params) => ({
          tamanho: params.tamanho || 16
        })
      },
      uuid: {
        patterns: ['uuid', 'guid', 'identificador', 'gerador uuid'],
        entities: [],
        responses: ['Abrindo o Gerador de UUID.'],
        action: '/desenvolvimento/uuid'
      },
      hash: {
        patterns: ['hash', 'md5', 'sha', 'sha256', 'criptografia'],
        entities: [],
        responses: ['Abrindo a ferramenta de Hash.'],
        action: '/desenvolvimento/md5'
      },
      base64: {
        patterns: ['base64', 'codificar', 'decodificar', 'encode', 'decode'],
        entities: [],
        responses: ['Abrindo o Conversor Base64.'],
        action: '/desenvolvimento/base64'
      },
      json: {
        patterns: ['json', 'formatar', 'validar json', 'formatador'],
        entities: [],
        responses: ['Abrindo o Formatador JSON.'],
        action: '/desenvolvimento/json'
      },
      ajuda: {
        patterns: ['ajuda', 'help', 'o que você faz', 'comandos', 'como usar'],
        entities: [],
        responses: [`Posso ajudá-lo com:

📊 **Finanças**
• Financiamento de veículos
• Juros compostos e investimentos
• FGTS, INSS, Impostos
• Descontos

🔄 **Conversores**
• Moedas (Dólar, Euro, Real...)
• Temperatura, Peso, Comprimento

🚗 **Carros**
• Comparador de preços FIPE

🔧 **Desenvolvimento**
• Geradores: CPF, CNPJ, UUID, Senha
• Hash, Base64, JSON

💡 **Exemplos de comandos:**
"Simule um financiamento de 40 mil com 10 mil de entrada em 48 parcelas"
"Quanto rende 5 mil em 12 meses a 0.8% ao mês"
"Calcule o desconto de 15% em 250 reais"
"Qual meu IMC com 75kg e 1.75m"

Digite o que você precisa!`],
        action: null
      }
    };
  }

  normalize(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s.,]/g, ' ')
      .trim();
  }

  extractEntities(text) {
    const normalized = this.normalize(text);
    const entities = {};

    // Extrair valores monetários (ex: 40 mil, 10000, 5.5k, R$ 1500)
    const moneyPatterns = [
      /(\d+(?:\.\d+)?)\s*(?:mil|k)/gi,
      /r\$?\s*(\d+(?:[.,]\d+)?)/gi,
      /(\d+(?:[.,]\d+)?)\s*reais/gi,
      /(\d+(?:[.,]\d+)?)\s*(?=\s|$)/g
    ];

    let valores = [];
    for (const pattern of moneyPatterns) {
      const matches = [...text.matchAll(pattern)];
      for (const match of matches) {
        let num = parseFloat(match[1].replace(',', '.'));
        if (match[0].toLowerCase().includes('mil') || match[0].toLowerCase().includes('k')) {
          num *= 1000;
        }
        valores.push(num);
      }
    }

    // Extrair número de parcelas (ex: 48x, 48 parcelas, 48 vezes)
    const parcelasMatch = text.match(/(\d+)\s*(?:x|parcelas?|vezes|meses)/i);
    if (parcelasMatch) {
      entities.parcelas = parseInt(parcelasMatch[1]);
    }

    // Extrair períodos/tempo
    const periodoMatch = text.match(/(\d+)\s*(?:meses|anos|dias)/i);
    if (periodoMatch) {
      let periodo = parseInt(periodoMatch[1]);
      if (periodoMatch[0].toLowerCase().includes('ano')) {
        periodo *= 12;
      }
      entities.periodo = periodo;
      entities.tempo = periodo;
    }

    // Extrair percentual (ex: 15%, 10 por cento)
    const percentualMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:%|por\s*cento|porcento)/i);
    if (percentualMatch) {
      entities.percentual = parseFloat(percentualMatch[1]);
      entities.taxa = parseFloat(percentualMatch[1]);
    }

    // Extrair peso (ex: 75kg, 75 quilos)
    const pesoMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:kg|quilos?|kilos?)/i);
    if (pesoMatch) {
      entities.peso = parseFloat(pesoMatch[1]);
    }

    // Extrair altura (ex: 1.75m, 175cm)
    const alturaMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:m|metros?)|(\d+)\s*cm/i);
    if (alturaMatch) {
      if (alturaMatch[0].includes('cm')) {
        entities.altura = parseFloat(alturaMatch[2]) / 100;
      } else {
        entities.altura = parseFloat(alturaMatch[1]);
      }
    }

    // Extrair moedas
    const moedas = {
      'dolar': 'USD', 'dollar': 'USD', 'usd': 'USD',
      'euro': 'EUR', 'eur': 'EUR',
      'real': 'BRL', 'reais': 'BRL', 'brl': 'BRL',
      'libra': 'GBP', 'gbp': 'GBP'
    };
    for (const [palavra, codigo] of Object.entries(moedas)) {
      if (normalized.includes(palavra)) {
        entities.moedaOrigem = entities.moedaOrigem || codigo;
        entities.moedaDestino = codigo;
      }
    }

    // Atribuir valores extraídos aos contextos apropriados
    if (valores.length > 0) {
      // Contexto de financiamento ou entrada
      if (normalized.includes('entrada')) {
        const entradaIndex = valores.findIndex((v, i) => {
          const palavrasAntes = text.substring(0, text.indexOf(v.toString())).toLowerCase();
          return palavrasAntes.includes('entrada');
        });
        if (entradaIndex !== -1) {
          entities.entrada = valores[entradaIndex];
          entities.valor = valores.find((v, i) => i !== entradaIndex) || valores[0];
        } else {
          entities.valor = valores[0];
          entities.entrada = valores[1];
        }
      } else {
        entities.valor = valores[0];
        entities.salario = valores[0];
      }
    }

    return entities;
  }

  classify(input) {
    const normalized = this.normalize(input);
    const words = normalized.split(/\s+/);
    
    let bestMatch = null;
    let bestScore = 0;

    for (const [intent, data] of Object.entries(this.intents)) {
      let score = 0;
      
      for (const pattern of data.patterns) {
        const normalizedPattern = this.normalize(pattern);
        
        // Correspondência exata
        if (normalized.includes(normalizedPattern)) {
          score += 10;
        }
        
        // Sobreposição de palavras
        const patternWords = normalizedPattern.split(/\s+/);
        const overlap = words.filter(w => patternWords.includes(w)).length;
        score += overlap * 2;
        
        // Bonus para palavras-chave específicas
        if (words.includes(normalizedPattern)) {
          score += 5;
        }
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = intent;
      }
    }

    return bestScore > 0 ? { intent: bestMatch, data: this.intents[bestMatch] } : null;
  }

  getMissingFields(intent, entities) {
    const missing = [];

    switch (intent) {
      case 'financiamento': {
        if (!entities.valor) missing.push('valor do veículo');
        if (!entities.parcelas) missing.push('quantidade de parcelas');
        break;
      }
      case 'jurosCompostos': {
        if (!entities.valor) missing.push('valor inicial');
        if (!entities.taxa && !entities.percentual) missing.push('taxa de juros');
        break;
      }
      case 'desconto': {
        if (!entities.valor) missing.push('valor do produto/serviço');
        if (!entities.percentual) missing.push('percentual de desconto');
        break;
      }
      case 'imc': {
        if (!entities.peso) missing.push('peso');
        if (!entities.altura) missing.push('altura');
        break;
      }
      case 'fgts': {
        if (!entities.salario) missing.push('salário');
        break;
      }
      case 'inss': {
        if (!entities.salario) missing.push('salário');
        break;
      }
      case 'impostos': {
        if (!entities.salario) missing.push('renda mensal');
        break;
      }
      case 'conversaoMoeda': {
        if (!entities.valor) missing.push('valor para converter');
        if (!entities.moedaDestino) missing.push('moeda de destino');
        break;
      }
      case 'temperatura':
      case 'peso':
      case 'comprimento': {
        if (!entities.valor) missing.push('valor para converter');
        break;
      }
      default:
        break;
    }

    return missing;
  }

  respond(input) {
    const classification = this.classify(input);
    
    if (!classification) {
      return {
        message: 'Não entendi. Digite "ajuda" para ver exemplos de comandos.',
        action: null,
        params: null,
        needsMoreInfo: true,
        missingFields: []
      };
    }

    const { intent, data } = classification;
    const entities = this.extractEntities(input);
    const missingFields = this.getMissingFields(intent, entities);
    
    // Gerar resposta
    const response = data.responses[Math.floor(Math.random() * data.responses.length)];
    
    // Preparar parâmetros para a ferramenta
    let params = null;
    if (data.fillForm && typeof data.fillForm === 'function') {
      params = data.fillForm(entities);
    }

    // Se faltam informações essenciais, peça detalhes e não redirecione
    if (missingFields.length > 0) {
      const pedido = `Preciso de mais informações: ${missingFields.join(', ')}.`;
      const exemplosSugestoes = {
        financiamento: 'Ex: "Financiar 50 mil com 10 mil de entrada em 48x"',
        jurosCompostos: 'Ex: "Rendimento de 5 mil a 0.8% ao mês por 12 meses"',
        desconto: 'Ex: "Desconto de 15% em 250 reais"',
        imc: 'Ex: "IMC com 75kg e 1.75m"',
        conversaoMoeda: 'Ex: "Converter 100 dólares para real"'
      };
      const exemplo = exemplosSugestoes[intent] ? `\n${exemplosSugestoes[intent]}` : '';

      return {
        message: `${pedido}${exemplo}`,
        action: null,
        params: null,
        entities,
        needsMoreInfo: true,
        missingFields
      };
    }

    return {
      message: response,
      action: data.action,
      params: params,
      entities: entities,
      needsMoreInfo: false,
      missingFields: []
    };
  }

  buildUrlWithParams(baseUrl, params) {
    if (!params) return baseUrl;
    
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== null && value !== undefined) {
        queryParams.append(key, value);
      }
    }
    
    const queryString = queryParams.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }
}

export default MiniChatBot;
