const loginValidation = (data, res) => {
  const { email, password } = data;
  if (!email) {
    res.status(400).send('Email cannot be empty!');
    return false;
  }
  if (!email.includes('@')) {
    res.status(400).send('Invalid email!');
    return false;
  }
  if (!password) {
    res.status(400).send('Password cannot be empty!');
    return false;
  }
  if (password.length < 6) {
    res.status(400).send('Password length cannot be less than 6 characters');
  }

  return true;
};

const registerValidation = (data, res) => {
  const { email, password, confirmPassword, lastName, firstName } = data;
  if (!email) {
    res.status(400).send('Email is required');
    return false;
  }
  if (!firstName) {
    res.status(400).send('First name is required');
    return false;
  }
  if (!lastName) {
    res.status(400).send('Last name is required');
    return false;
  }
  if (!email.includes('@')) {
    res.status(400).send('Invalid email');
    return false;
  }
  if (password != confirmPassword) {
    res.status(400).send('The two password must match!');
    return false;
  }
  if (password.length < 6) {
    res.status(400).send('Input at least 6 character length for password');
    return false;
  }
  return true;
};

module.exports = { loginValidation, registerValidation };
