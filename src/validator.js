function validatePassword(password, config) {
  const errors = [];

  if (password.length < config.minLength) {
    errors.push(`Минимальная длина: ${config.minLength}`);
  }

  if (config.requireNumbers && !/\d/.test(password)) {
    errors.push("Нужна хотя бы одна цифра");
  }

  if (config.requireSpecial && !/[!@#$%^&*]/.test(password)) {
    errors.push("Нужен спецсимвол");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = { validatePassword };
