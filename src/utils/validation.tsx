const emailRegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{1,8}$/);

export const passwordRegExp = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,25}$/,
);

export const passwordProps = {
  required: 'Password is required.',
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters long.',
  },
  pattern: {
    value: passwordRegExp,
    message:
      'Password must contain at least one uppercase and one lowercase letter, one digit and one special character.',
  },
};

export const emailProps = {
  required: 'Email is required',
  pattern: {
    value: emailRegExp,
    message:
      'Email address must be properly formatted (e.g., user@example.com) and should not contain whitespace.',
  },
};

export const nameProps = (field: string) => {
  return {
    required: `${field} is required`,
    pattern: {
      value: /^[a-zA-Z]*$/,
      message: `${field} should not contain numbers or special characters`,
    },
  };
};

export const minBirthDate = () => {
  const date = new Date();
  const year = date.getFullYear() - 13;
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const postCodeProps = (countryValue: string) => {
  return {
    required: 'Postal code is required',
    validate: (value: string) => {
      const USRegexp = /^[0-9]{5}$/;
      const RussiaRegexp = /^[0-9]{6}$/;

      if (
        (countryValue === 'US' || countryValue === 'Croatia') &&
        !USRegexp.test(value)
      ) {
        return `The postcode for ${countryValue} should contain 5 digits`;
      } else if (countryValue === 'Russia' && !RussiaRegexp.test(value)) {
        return 'The postcode for Russia should contain 6 digits';
      } else {
        return true;
      }
    },
  };
};

export const countryProps = {
  required: 'Country is required',
  validate: (value: string) => {
    if (value === 'Russia' || value === 'US' || value === 'Croatia') {
      return true;
    } else {
      return 'Country should be Russia, Croatia or US';
    }
  },
};
