export const serverErrorMessages = {
  loginError: {
    errorMessage: 'Customer account with the given credentials not found.',
    userMessage:
      'The customer is not found. Please, try another email or password.',
  },
  registrationError: {
    errorMessage:
      'There is already an existing customer with the provided email.',
    userMessage:
      'A customer with this email already exists. Please, log in or try another email.',
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
