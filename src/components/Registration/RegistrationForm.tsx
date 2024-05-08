import './RegistrationForm.css';

import { SubmitHandler, useForm } from 'react-hook-form';

import {
  countryProps,
  emailProps,
  minBirthDate,
  nameProps,
  passwordProps,
  postCodeProps,
} from '../../utils/validation';
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
            {...register('email', emailProps)}
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
            {...register('password', passwordProps)}
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
            {...register('firstName', nameProps('First name'))}
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
            {...register('lastName', nameProps('Last name'))}
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
            {...register('city', nameProps('City'))}
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
            {...register('postalCode', postCodeProps(getValues('country')))}
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
            {...register('country', countryProps)}
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
