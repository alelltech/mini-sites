import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MiniChatBot from '../utils/chatBot.js';
import '../styles/MiniChat.css';

const MiniChat = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [bot] = useState(() => new MiniChatBot());
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messages.length === 0) {
      addMessage('bot', 'Olá! 👋 Sou seu assistente virtual.\n\nDigite "ajuda" para ver exemplos de comandos.');
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (sender, text, data = null) => {
    setMessages(prev => [...prev, { 
      sender, 
      text, 
      data,
      time: new Date() 
    }]);
  };

  const formatParamsPreview = (params) => {
    if (!params) return '';
    
    const labels = {
      valorTotal: 'Valor Total',
      entrada: 'Entrada',
      numeroParcelas: 'Parcelas',
      taxaJuros: 'Taxa de Juros',
      valorInicial: 'Valor Inicial',
      periodo: 'Período (meses)',
      valorOriginal: 'Valor Original',
      percentualDesconto: 'Desconto (%)',
      peso: 'Peso (kg)',
      altura: 'Altura (m)',
      salario: 'Salário',
      meses: 'Meses',
      rendaMensal: 'Renda Mensal',
      valor: 'Valor',
      de: 'De',
      para: 'Para',
      tamanho: 'Tamanho'
    };

    const items = Object.entries(params)
      .filter(([_, value]) => value !== null && value !== undefined)
      .map(([key, value]) => {
        const label = labels[key] || key;
        let displayValue = value;
        
        // Formatar valores monetários
        if (key.includes('valor') || key.includes('entrada') || key.includes('salario') || key.includes('renda')) {
          displayValue = `R$ ${parseFloat(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        }
        // Formatar percentuais
        else if (key.includes('taxa') || key.includes('percentual')) {
          displayValue = `${value}%`;
        }
        // Formatar parcelas
        else if (key === 'numeroParcelas') {
          displayValue = `${value}x`;
        }
        
        return `• ${label}: ${displayValue}`;
      });

    return items.length > 0 ? '\n\n📋 Dados:\n' + items.join('\n') : '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userInput = input.trim();
    addMessage('user', userInput);
    setInput('');
    setIsTyping(true);

    // Simular delay de digitação
    setTimeout(() => {
      const response = bot.respond(userInput);
      
      // Formatar mensagem com preview dos parâmetros
      let botMessage = response.message;
      if (response.params) {
        botMessage += formatParamsPreview(response.params);
      }
      
      addMessage('bot', botMessage, response);
      setIsTyping(false);
      
      // Navegar para a ferramenta com parâmetros
      if (response.action) {
        setTimeout(() => {
          const url = bot.buildUrlWithParams(response.action, response.params);
          
          // Adicionar mensagem de redirecionamento
          addMessage('bot', '🔄 Redirecionando...');
          
          // Navegar após um delay usando React Router
          setTimeout(() => {
            navigate(url);
          }, 800);
        }, 1200);
      }
    }, 400 + Math.random() * 400); // Delay variável para parecer mais natural
  };

  const handleQuickAction = (action) => {
    setInput(action);
    // Auto-enviar após pequeno delay
    setTimeout(() => {
      const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
      document.querySelector('.chat-input')?.dispatchEvent(submitEvent);
    }, 100);
  };

  const quickActions = [
    '📊 Financiamento de 30 mil',
    '💰 Quanto rende 10 mil em 12 meses',
    '📉 Desconto de 20% em 150 reais',
    '⚖️ IMC com 70kg e 1.70m'
  ];

  const clearChat = () => {
    setMessages([]);
    setTimeout(() => {
      addMessage('bot', 'Chat limpo! Como posso ajudar?');
    }, 100);
  };

  return (
    <>
      {/* Botão flutuante */}
      <button 
        className={`chat-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Fechar chat' : 'Abrir chat'}
        title="Assistente Virtual"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Widget do chat */}
      {isOpen && (
        <div className="mini-chat" role="dialog" aria-label="Chat do assistente">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="chat-title">🤖 Assistente Virtual</span>
              <span className="chat-status">● Online</span>
            </div>
            <div className="chat-header-actions">
              <button 
                onClick={clearChat} 
                title="Limpar conversa"
                aria-label="Limpar conversa"
              >
                🗑️
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                title="Fechar"
                aria-label="Fechar chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Mensagens */}
          <div className="chat-messages">
            {messages.length === 1 && (
              <div className="quick-actions">
                <p className="quick-actions-title">Experimente:</p>
                {quickActions.map((action, i) => (
                  <button
                    key={i}
                    className="quick-action-btn"
                    onClick={() => handleQuickAction(action)}
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.sender}`}>
                <div className="msg-content">
                  {msg.text.split('\n').map((line, idx) => (
                    <React.Fragment key={idx}>
                      {line}
                      {idx < msg.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
                <div className="msg-time">
                  {msg.time.toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="msg bot typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form className="chat-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua pergunta..."
              disabled={isTyping}
              aria-label="Digite sua mensagem"
            />
            <button 
              type="submit" 
              disabled={isTyping || !input.trim()}
              aria-label="Enviar mensagem"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default MiniChat;
