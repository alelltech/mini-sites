/**
 * CalcZone BR - Global JavaScript
 * Common utilities and functions for all tools
 */

// ============================================
// Copy to Clipboard Utility
// ============================================
function copyToClipboard(text, buttonElement = null) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => {
                if (buttonElement) {
                    const originalText = buttonElement.textContent;
                    buttonElement.textContent = '✓ Copiado!';
                    setTimeout(() => {
                        buttonElement.textContent = originalText;
                    }, 2000);
                }
            })
            .catch(err => console.error('Erro ao copiar:', err));
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

// ============================================
// Format Number Utility
// ============================================
function formatNumber(num, decimals = 2) {
    if (isNaN(num)) return '0';
    return parseFloat(num).toLocaleString('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

// ============================================
// Format Currency
// ============================================
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// ============================================
// Validation Utilities
// ============================================
function isValidNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function isPositive(value) {
    return isValidNumber(value) && parseFloat(value) > 0;
}

function isNonNegative(value) {
    return isValidNumber(value) && parseFloat(value) >= 0;
}

// ============================================
// String Utilities
// ============================================
function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function reverseString(str) {
    return str.split('').reverse().join('');
}

// ============================================
// Date Utilities
// ============================================
function calculateDaysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((date1 - date2) / oneDay));
}

function formatDate(date) {
    return date.toLocaleDateString('pt-BR');
}

// ============================================
// Random Number Generator
// ============================================
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ============================================
// Show/Hide Results
// ============================================
function showResult(resultElement, value, label = '') {
    if (!resultElement) return;
    
    resultElement.classList.remove('hidden');
    
    if (label) {
        const labelEl = resultElement.querySelector('.result-label');
        if (labelEl) labelEl.textContent = label;
    }
    
    const valueEl = resultElement.querySelector('.result-value');
    if (valueEl) valueEl.textContent = value;
}

function hideResult(resultElement) {
    if (resultElement) {
        resultElement.classList.add('hidden');
    }
}

// ============================================
// Clear Form
// ============================================
function clearForm(formElement) {
    if (formElement) {
        formElement.reset();
    }
}

// ============================================
// Debounce Function
// ============================================
function debounce(func, delay = 300) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// ============================================
// Analytics Tracking (Optional)
// ============================================
function trackToolUsage(toolName) {
    if (window.gtag) {
        gtag('event', 'tool_used', {
            'tool_name': toolName
        });
    }
}

// ============================================
// Document Ready
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips or other global features here
    console.log('CalcZone BR - Tool loaded successfully');
});
