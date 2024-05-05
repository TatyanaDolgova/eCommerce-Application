const emailRegexp = new RegExp('^[\\-a-zA-z]+@[\\-a-zA-z]+.[\\-a-zA-z]+$');
// const passwordRegexp = new RegExp(
//   '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$',
// );

export function validateLoginForm(email: string, password: string) {
  if (!emailRegexp.test(email)) {
    return 'Wrong email.';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  //   if (!passwordRegexp.test(password)) {
  //     return 'Wrong password';
  //   }

  return undefined;
}
