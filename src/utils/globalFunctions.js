// ============================================
// FUNÇÕES UTILITÁRIAS GLOBAIS - CalcZone BR
// ============================================

/**
 * Formata um número para a localidade pt-BR
 */
export function formatNumber(num, decimals = 2) {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(num);
}

/**
 * Formata um valor como moeda BRL
 */
export function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

/**
 * Copia texto para clipboard
 */
export function copyToClipboard(text) {
    return navigator.clipboard.writeText(text).then(() => {
        return true;
    }).catch(() => {
        console.error('Erro ao copiar');
        return false;
    });
}

/**
 * Validadores
 */
export function isValidNumber(num) {
    return !isNaN(num) && isFinite(num);
}

export function isPositive(num) {
    return isValidNumber(num) && num > 0;
}

export function isNonNegative(num) {
    return isValidNumber(num) && num >= 0;
}

export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstDigit = 11 - (sum % 11);
    firstDigit = firstDigit === 10 || firstDigit === 11 ? 0 : firstDigit;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondDigit = 11 - (sum % 11);
    secondDigit = secondDigit === 10 || secondDigit === 11 ? 0 : secondDigit;
    
    return parseInt(cpf.charAt(9)) === firstDigit && parseInt(cpf.charAt(10)) === secondDigit;
}

export function isValidCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, '');
    if (cnpj.length !== 14) return false;
    if (/^(\d)\1{13}$/.test(cnpj)) return false;
    
    let sum = 0;
    const multipliers = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    
    for (let i = 0; i < 12; i++) {
        sum += parseInt(cnpj.charAt(i)) * multipliers[i];
    }
    
    let firstDigit = 11 - (sum % 11);
    firstDigit = firstDigit === 10 || firstDigit === 11 ? 0 : firstDigit;
    
    sum = 0;
    multipliers.push(6);
    for (let i = 0; i < 13; i++) {
        sum += parseInt(cnpj.charAt(i)) * multipliers[i];
    }
    
    let secondDigit = 11 - (sum % 11);
    secondDigit = secondDigit === 10 || secondDigit === 11 ? 0 : secondDigit;
    
    return parseInt(cnpj.charAt(12)) === firstDigit && parseInt(cnpj.charAt(13)) === secondDigit;
}

export function safeParseFloat(value) {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
}
