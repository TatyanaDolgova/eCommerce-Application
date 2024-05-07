import './RegistrationForm.css';

import { SubmitHandler, useForm } from 'react-hook-form';

import BaseButton from '../Button/Button';
import Label from '../Label/Label';

type FormFields = {
  birthDate: Date;
  city: string;
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  postalCode: string;
  street: string;
};

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  const minBirthDate = () => {
    const date = new Date();
    const year = date.getFullYear() - 13;
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = (date.getDay() + 1).toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  return (
    <form
      className="login_form registration-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Get Started</h1>
      <div className="inputs-container">
        <Label classes="label" for="emailInput" text="Email" />
        <div className="input-wrapper">
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'This must be a valid email (e.g. blabla@gmail.com)',
              },
            })}
            className="input"
            id="emailInput"
            type="text"
            placeholder="Enter your email"
          />
          {errors.email && (
            <div className="error_message">{errors.email.message}</div>
          )}
        </div>
        <Label classes="label" for="passwordInput" text="Password" />
        <div className="input-wrapper">
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters',
              },
              pattern: {
                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+/,
                message:
                  'Password must contain at least 1 lowercase letter, 1 uppercase letter and 1 digit',
              },
            })}
            className="input"
            id="passwordInput"
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <div className="error_message">{errors.password.message}</div>
          )}
        </div>
        <Label classes="label" for="fnameInput" text="First Name" />
        <div className="input-wrapper">
          <input
            {...register('firstName', {
              required: 'First name is required',
              pattern: {
                value: /^[a-zA-Z]*$/,
                message:
                  'Name should not contain numbers or special characters',
              },
            })}
            className="input"
            id="fnameInput"
            type="text"
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <div className="error_message">{errors.firstName.message}</div>
          )}
        </div>
        <Label classes="label" for="lnameInput" text="Last Name" />
        <div className="input-wrapper">
          <input
            {...register('lastName', {
              required: 'Last name is required',
              pattern: {
                value: /^[a-zA-Z]*$/,
                message:
                  'Name should not contain numbers or special characters',
              },
            })}
            className="input"
            id="lnameInput"
            type="text"
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <div className="error_message">{errors.lastName.message}</div>
          )}
        </div>
        <Label classes="label" for="birthDateInput" text="Date of Birth" />
        <div className="input-wrapper">
          <input
            {...register('birthDate', {
              required: 'Date of birth is required',
            })}
            className="input"
            id="birthDateInput"
            type="date"
            min="1900-01-01"
            max={minBirthDate()}
          />
          {errors.birthDate && (
            <div className="error_message">{errors.birthDate.message}</div>
          )}
        </div>
        <Label
          classes="label address-label"
          for="addressInput"
          text="Address"
        />
        <div className="input-wrapper">
          <input
            {...register('street', {
              required: 'Street is required',
            })}
            className="input"
            id="addressInput"
            type="text"
            placeholder="Street"
          />
          {errors.street && (
            <div className="error_message">{errors.street.message}</div>
          )}
        </div>
        <div className="input-wrapper">
          <input
            {...register('city', {
              required: 'City is required',
              pattern: {
                value: /^[a-zA-Z]*$/,
                message:
                  'City should not contain numbers or special characters',
              },
            })}
            className="input"
            type="text"
            placeholder="City"
          />
          {errors.city && (
            <div className="error_message">{errors.city.message}</div>
          )}
        </div>
        <div className="input-wrapper">
          <input
            {...register('postalCode', {
              required: 'Postal code is required',
              validate: (value) => {
                const USRegexp = /^[0-9]{5}$/;
                const RussiaRegexp = /^[0-9]{6}$/;

                if (
                  (getValues('country') === 'US' ||
                    getValues('country') === 'Croatia') &&
                  !USRegexp.test(value)
                ) {
                  return `The postcode for ${getValues('country')} should contain 5 digits`;
                } else if (
                  getValues('country') === 'Russia' &&
                  !RussiaRegexp.test(value)
                ) {
                  return 'The postcode for Russia should contain 6 digits';
                } else {
                  return true;
                }
              },
            })}
            className="input"
            type="text"
            placeholder="Postal Code"
          />
          {errors.postalCode && (
            <div className="error_message">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="input-wrapper">
          <input
            {...register('country', {
              required: 'Country is required',
              validate: (value) => {
                if (
                  value === 'Russia' ||
                  value === 'US' ||
                  value === 'Croatia'
                ) {
                  return true;
                } else {
                  return 'Country should be Russia, Croatia or US';
                }
              },
            })}
            className="input"
            placeholder="Country"
          ></input>
          {errors.country && (
            <div className="error_message">{errors.country.message}</div>
          )}
        </div>
      </div>
      <BaseButton classes="button" text="Sign up" type="submit" />
    </form>
  );
}

export default RegistrationForm;
