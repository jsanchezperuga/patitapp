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

export function validatePostTitle(title) {
  let error = false;
  let message = "";
  if (title.length === 0) {
    error = true;
    message = "El titulo no puede estar vacio";
  } else if (title.length < 6) {
    error = true;
    message = "El titulo es muy corto (min 6 caracteres)";
  } else if (title.length > 30) {
    error = true;
    message = "El titulo es muy largo (max 30 caracteres)"
  }

  return [error, message]
}

export function validatePostContactName(contactName) {
  let error = false;
  let message = "";
  if (contactName.length === 0) {
    error = true;
    message = "El contacto no puede estar vacio";
  } else if (contactName.length < 4) {
    error = true;
    message = "El contacto es muy corto (min 4 caracteres)";
  } else if (contactName.length > 20) {
    error = true;
    message = "El contacto es muy largo (max 20 caracteres)"
  }

  return [error, message]
}

export function validatePostArea(area) {
  let error = false;
  let message = "";
  if (area.length === 0) {
    error = true;
    message = "La zona no puede estar vacia";
  } else if (area.length < 4) {
    error = true;
    message = "La zona es muy corta (min 4 caracteres)";
  } else if (area.length > 42) {
    error = true;
    message = "La zona es muy larga (max 42 caracteres)"
  }

  return [error, message]
}

export function validatePostContactNumber(contactNumber) {
  let error = false;
  let message = "";
  if (contactNumber.length === 0) {
    error = true;
    message = "El numero de contacto no puede estar vacio";
  } else if (contactNumber.length !== 10) {
    error = true;
    message = "El numero de contacto debe tener 10 caracteres";
  } else if (contactNumber.slice(0, 2) !== "11") {
    error = true;
    message = "El numero de contacto debe comenzar con 11"
  }

  return [error, message]
}