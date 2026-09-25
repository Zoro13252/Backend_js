const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

function result(valid, message = '') {
  return { valid, message };
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isPositiveInteger(value) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0;
}

function isNonNegativeNumber(value) {
  const number = Number(value);
  return value !== '' && Number.isFinite(number) && number >= 0;
}

function isValidEmail(email) {
  return typeof email === 'string' && emailPattern.test(email.trim());
}

function isValidPassword(password) {
  return typeof password === 'string' && passwordPattern.test(password);
}

function validateProduct(data = {}, isUpdate = false) {
  if (!isUpdate || data.name !== undefined) {
    if (!isNonEmptyString(data.name)) {
      return result(false, 'Name is required and must be a non-empty string');
    }
  }

  if (!isUpdate || data.price !== undefined) {
    if (!isNonNegativeNumber(data.price)) {
      return result(false, 'Price must be a non-negative number');
    }
  }

  if (data.description !== undefined && typeof data.description !== 'string') {
    return result(false, 'Description must be a string');
  }

  if (data.quantity !== undefined && !Number.isInteger(Number(data.quantity))) {
    return result(false, 'Quantity must be an integer');
  }

  if (data.quantity !== undefined && Number(data.quantity) < 0) {
    return result(false, 'Quantity must be a non-negative integer');
  }

  return result(true);
}

function validateOrder(data = {}, isUpdate = false) {
  if (!isUpdate || data.userId !== undefined) {
    if (!isPositiveInteger(data.userId)) {
      return result(false, 'userId must be a positive integer');
    }
  }

  if (!isUpdate || data.products !== undefined) {
    if (!Array.isArray(data.products) || data.products.length === 0) {
      return result(false, 'Products must be a non-empty array');
    }
  }

  if (data.status !== undefined && !isNonEmptyString(data.status)) {
    return result(false, 'Status must be a non-empty string');
  }

  if (data.total !== undefined && !isNonNegativeNumber(data.total)) {
    return result(false, 'Total must be a non-negative number');
  }

  return result(true);
}

function validateUser(data = {}, isUpdate = false) {
  if (!isUpdate || data.name !== undefined) {
    if (!isNonEmptyString(data.name)) {
      return result(false, 'Name is required and must be a non-empty string');
    }
  }

  if (!isUpdate || data.email !== undefined) {
    if (!isValidEmail(data.email)) {
      return result(false, 'Email must be a valid email address');
    }
  }

  if (!isUpdate || data.password !== undefined) {
    if (!isValidPassword(data.password)) {
      return result(false, 'Password must be at least 8 characters and contain uppercase, lowercase, and a digit');
    }
  }

  return result(true);
}

export {
  isValidEmail,
  isValidPassword,
  validateOrder,
  validateProduct,
  validateUser,
};
