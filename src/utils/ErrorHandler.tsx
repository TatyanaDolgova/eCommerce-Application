export const serverErrorMessages = {
  loginError: {
    errorMessage: 'Account with the given credentials not found.',
    userMessage:
      'Customer is not found. Please, try another email or password.',
  },
  registrationError: {
    errorMessage:
      'There is already an existing customer with the provided email.',
    userMessage:
      'Customer with this email already exists. Please, login or try another email.',
  },
  inputError: {
    errorMessage: 'Request body does not contain valid JSON.',
    userMessage:
      'You have submitted incorrect data, please check and submit again',
  },
  serverError: {
    errorMessage: 'Write operations are temporarily unavailable',
    userMessage: 'Server is temporarily unavailable. Please, try again later',
  },
};
