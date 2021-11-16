export function validateEmail(email) {
  let error = false;
  let message = "";
  if (email.length === 0) {
    error = true;
    message = "El email no puede estar vacio";
  } else if (!/^([a-zA-Z0-9_.]+)@([a-zA-Z0-9-]+)\.([a-zA-Z]{2,4})$/.test(email)) {
    error = true;
    message = "El email no tiene un formato valido";
  }

  return [error, message];
}

export function validatePassword(password) {
  let error = false;
  let message = "";
  if (password.length === 0) {
    error = true;
    message = "La contraseña no puede estar vacia";
  } else if (password.length < 6) {
    error = true;
    message = "La contraseña es muy corta (min 6 caracteres)";
  } else if (password.length > 20) {
    error = true;
    message = "La contraseña es muy larga (max 20 caracteres)";
  } else if (!/\d{3}/.test(password)) {
    error = true;
    message = "La contraseña debe tener por lo menos 3 numeros"
  }

  return [error, message]
}