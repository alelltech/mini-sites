export const formatCurrency = (value, currency = 'BRL') => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
  }).format(value);
};

export const calculatePercentage = (value, percentage) => {
  return (value * percentage) / 100;
};

export const calculateDiscount = (originalPrice, discountPercent) => {
  const discount = calculatePercentage(originalPrice, discountPercent);
  return originalPrice - discount;
};

export const calculateCompoundInterest = (principal, rate, time, compounds = 1) => {
  return principal * Math.pow(1 + rate / (100 * compounds), compounds * time);
};

export const validateCPF = (cpf) => {
  const cleanCPF = cpf.replace(/\D/g, '');
  if (cleanCPF.length !== 11) return false;
  
  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false;

  return true;
};

export const validateCNPJ = (cnpj) => {
  const cleanCNPJ = cnpj.replace(/\D/g, '');
  if (cleanCNPJ.length !== 14) return false;

  if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;

  let size = cleanCNPJ.length - 2;
  let numbers = cleanCNPJ.substring(0, size);
  let digits = cleanCNPJ.substring(size);
  let sum = 0;
  let position = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * position--;
    if (position < 2) position = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  size = size + 1;
  numbers = cleanCNPJ.substring(0, size);
  sum = 0;
  position = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * position--;
    if (position < 2) position = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
};
