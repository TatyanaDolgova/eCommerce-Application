const emailRegexp = new RegExp('^[\\-a-zA-z]+@[\\-a-zA-z]+.[\\-a-zA-z]+$');
// const passwordRegexp = new RegExp(
//   '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$',
// );
// const passwordRegexp = {
//     hasNumber: new RegExp(@"[0-9]+"),
//     hasUpperChar = new Regex(@"[A-Z]+"),
//     hasMiniMaxChars = new Regex(@".{8,15}"),
//     hasLowerChar = new Regex(@"[a-z]+"),
//     hasSymbols = new Regex(@"[!@#$%^&*()_+=\[{\]};:<>|./?,-]"),
// }

function validateEmail(email: string) {
  if (!emailRegexp.test(email)) {
    return 'Email address must be properly formatted (e.g., user@example.com) and should not contain leading or trailing whitespace';
  }

  return undefined;
}

function validatePassword(password: string) {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }

  return undefined;
}

export function validateLoginForm(email: string, password: string) {
  let mistake;

  if (validateEmail(email)) {
    mistake = validateEmail(email);
  }

  if (validatePassword(password)) {
    mistake = validatePassword(password);
  }

  return mistake;
}
