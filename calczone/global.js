// ============================================
// FUNÇÕES UTILITÁRIAS GLOBAIS - CalcZone BR
// ============================================

/**
 * Formata um número para a localidade pt-BR
 */
function formatNumber(num, decimals = 2) {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(num);
}

/**
 * Formata um valor como moeda BRL
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

/**
 * Copia texto para clipboard
 */
function copyToClipboard(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.textContent;
        btn.textContent = '✓ Copiado!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }).catch(() => {
        alert('Erro ao copiar');
    });
}

/**
 * Mostra resultado com rolagem automática
 */
function showResult(content) {
    const result = document.getElementById('result');
    const resultContent = document.getElementById('resultContent');
    if (resultContent && result) {
        resultContent.innerHTML = content;
        result.classList.remove('hidden');
        result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/**
 * Esconde resultado
 */
function hideResult() {
    const result = document.getElementById('result');
    if (result) {
        result.classList.add('hidden');
    }
}

/**
 * Mostra alerta
 */
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} mt-20`;
    alertDiv.textContent = message;
    
    const form = document.querySelector('.tool-form');
    if (form) {
        form.insertBefore(alertDiv, form.firstChild);
        setTimeout(() => alertDiv.remove(), 5000);
    }
}

// ============================================
// VALIDADORES
// ============================================

function isValidNumber(num) {
    return !isNaN(num) && isFinite(num);
}

function isPositive(num) {
    return isValidNumber(num) && num > 0;
}

function isNonNegative(num) {
    return isValidNumber(num) && num >= 0;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;
    
    let sum = 0;
    let remainder;
    
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
}

function isValidCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, '');
    if (cnpj.length !== 14) return false;
    
    let sum = 0;
    let remainder;
    
    for (let i = 0; i < 4; i++) {
        sum += parseInt(cnpj.charAt(i)) * (5 - i);
    }
    
    for (let i = 0; i < 8; i++) {
        sum += parseInt(cnpj.charAt(i + 4)) * (9 - i);
    }
    
    remainder = sum % 11;
    if (remainder < 2) remainder = 0;
    else remainder = 11 - remainder;
    
    if (remainder !== parseInt(cnpj.charAt(12))) return false;
    
    sum = 0;
    for (let i = 0; i < 5; i++) {
        sum += parseInt(cnpj.charAt(i)) * (6 - i);
    }
    
    for (let i = 0; i < 8; i++) {
        sum += parseInt(cnpj.charAt(i + 5)) * (10 - i);
    }
    
    remainder = sum % 11;
    if (remainder < 2) remainder = 0;
    else remainder = 11 - remainder;
    
    if (remainder !== parseInt(cnpj.charAt(13))) return false;
    
    return true;
}

// ============================================
// MANIPULADORES DE TEXTO
// ============================================

function removeAccents(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function reverseString(str) {
    return str.split('').reverse().join('');
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function toUpperCase(str) {
    return str.toUpperCase();
}

function toLowerCase(str) {
    return str.toLowerCase();
}

function toPascalCase(str) {
    return str
        .split(/\s+/)
        .map(word => capitalizeFirst(word))
        .join('');
}

function toSnakeCase(str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/[^a-zA-Z0-9_]/g, '_')
        .toLowerCase();
}

function toCamelCase(str) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
            if (+match === 0) return '';
            return index === 0 ? match.toLowerCase() : match.toUpperCase();
        });
}

function countWords(text) {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

function countCharacters(text) {
    return text.length;
}

function countCharactersWithoutSpaces(text) {
    return text.replace(/\s/g, '').length;
}

function countLines(text) {
    return text.split('\n').length;
}

// ============================================
// CÁLCULOS DE DATA
// ============================================

function calculateDaysBetween(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diff = Math.abs(d2 - d1);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
}

function calculateAgeDetailed(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    
    if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    return { years, months, days };
}

function getDayOfWeek(date) {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return days[new Date(date).getDay()];
}

// ============================================
// GERADORES
// ============================================

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function generatePassword(length = 12, options = {}) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let chars = lowercase;
    if (options.uppercase !== false) chars += uppercase;
    if (options.numbers !== false) chars += numbers;
    if (options.symbols) chars += symbols;
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

function generateCPF() {
    let cpf = '';
    
    // Gera os 9 primeiros dígitos
    for (let i = 0; i < 9; i++) {
        cpf += Math.floor(Math.random() * 10);
    }
    
    // Calcula primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf[i]) * (10 - i);
    }
    let remainder = sum % 11;
    let firstDigit = remainder < 2 ? 0 : 11 - remainder;
    
    // Calcula segundo dígito verificador
    cpf += firstDigit;
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf[i]) * (11 - i);
    }
    remainder = sum % 11;
    let secondDigit = remainder < 2 ? 0 : 11 - remainder;
    cpf += secondDigit;
    
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function generateCNPJ() {
    let cnpj = '';
    
    // Gera os 8 primeiros dígitos
    for (let i = 0; i < 8; i++) {
        cnpj += Math.floor(Math.random() * 10);
    }
    cnpj += '0001'; // Filial padrão
    
    // Calcula primeiro dígito verificador
    let sum = 0;
    const multiplier1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    
    for (let i = 0; i < 12; i++) {
        sum += parseInt(cnpj[i]) * multiplier1[i];
    }
    
    let remainder = sum % 11;
    let firstDigit = remainder < 2 ? 0 : 11 - remainder;
    
    // Calcula segundo dígito verificador
    cnpj += firstDigit;
    sum = 0;
    const multiplier2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    
    for (let i = 0; i < 13; i++) {
        sum += parseInt(cnpj[i]) * multiplier2[i];
    }
    
    remainder = sum % 11;
    let secondDigit = remainder < 2 ? 0 : 11 - remainder;
    cnpj += secondDigit;
    
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

// ============================================
// CONVERSÕES
// ============================================

function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function celsiusToKelvin(celsius) {
    return celsius + 273.15;
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

function metersToKilometers(meters) {
    return meters / 1000;
}

function kilometersToMeters(kilometers) {
    return kilometers * 1000;
}

function metersToMiles(meters) {
    return meters * 0.000621371;
}

function milesToMeters(miles) {
    return miles / 0.000621371;
}

function kilogramsToLibras(kg) {
    return kg * 2.20462;
}

function librasToKilograms(lbs) {
    return lbs / 2.20462;
}

function litersToGallons(liters) {
    return liters * 0.264172;
}

function gallonsToLiters(gallons) {
    return gallons / 0.264172;
}

// ============================================
// CRIPTOGRAFIA
// ============================================

async function hashMD5(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hashSHA256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function toBase64(text) {
    return btoa(unescape(encodeURIComponent(text)));
}

function fromBase64(base64) {
    return decodeURIComponent(escape(atob(base64)));
}

// ============================================
// UTILITÁRIOS GERAIS
// ============================================

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function trackToolUsage(toolName) {
    if (window.gtag) {
        gtag('event', 'tool_usage', {
            'tool_name': toolName
        });
    }
}

function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}

function setQueryParam(param, value) {
    const params = new URLSearchParams(window.location.search);
    params.set(param, value);
    window.history.replaceState({}, '', `?${params.toString()}`);
}

// ============================================
// DOM HELPERS
// ============================================

function el(selector) {
    return document.querySelector(selector);
}

function elAll(selector) {
    return document.querySelectorAll(selector);
}

function addClass(element, className) {
    if (element) element.classList.add(className);
}

function removeClass(element, className) {
    if (element) element.classList.remove(className);
}

function toggleClass(element, className) {
    if (element) element.classList.toggle(className);
}

function hasClass(element, className) {
    return element && element.classList.contains(className);
}

function hide(element) {
    if (element) element.classList.add('hidden');
}

function show(element) {
    if (element) element.classList.remove('hidden');
}
