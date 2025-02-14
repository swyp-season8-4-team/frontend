export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateEmailCode = (code: string) => {
  const codeRegex = /^\d{6}$/;
  return codeRegex.test(code);
};