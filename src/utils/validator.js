function validateRegisterInput(name, staffId, password, confirmPassword) {
  if (name.length < 0) return false;
  if (staffId.length < 0) return false;
  if (password.length < 6) return false;
  if (confirmPassword.length < 6) return false;
  if (password !== confirmPassword) return false;

  return true;
}

export { validateRegisterInput as validateRegisterInput };
