import './RegistrationForm.css';

import { MyCustomerDraft } from '@commercetools/platform-sdk';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { UserContext, UserData } from '../../app-context/UserContext';
import { CustomerRepository } from '../../services/CustomerRepository';
import { serverErrorMessages } from '../../utils/ErrorHandler';
import showToast from '../../utils/notifications';
import {
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
  city2: string;
  country: string;
  country2: string;
  defaultBilling: boolean;
  defaultShipping: boolean;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  postalCode: string;
  postalCode2: string;
  street: string;
  street2: string;
  useSameAddress: boolean;
};

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormFields>({
    defaultValues: {
      city2: '',
      country: 'US',
      country2: 'US',
      email: '',
      password: '',
      postalCode2: '',
      street2: '',
    },
    mode: 'all',
  });
  const [billingCountry, setBillingCountry] = useState('US');
  const [billingCity, setBillingCity] = useState('');
  const [billingPostCode, setBillingPostCode] = useState('');
  const [billingStreet, setBillingStreet] = useState('');
  const [disabledClass, setDisabledClass] = useState('');
  const { updateState } = useContext(UserContext);

  function setSameAddress() {
    setBillingCity(getValues('city'));
    setBillingPostCode(getValues('postalCode'));
    setBillingStreet(getValues('street'));
    setBillingCountry(getValues('country'));
    setValue('city2', getValues('city'), { shouldValidate: true });
    setValue('street2', getValues('street'), { shouldValidate: true });
    setValue('country2', getValues('country'));
    setValue('postalCode2', getValues('postalCode'), { shouldValidate: true });
  }

  const navigate = useNavigate();
  const redirectToMain = () => navigate('/home');

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const customerDraft: MyCustomerDraft = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.birthDate.toString(),
      addresses: [
        {
          country: data.country,
          city: data.city,
          postalCode: data.postalCode,
          streetName: data.street,
        },
        {
          country: data.country2,
          city: data.city2,
          postalCode: data.postalCode2,
          streetName: data.street2,
        },
      ],
      defaultShippingAddress: data.defaultShipping ? 0 : undefined,
      defaultBillingAddress: data.defaultBilling ? 1 : undefined,
    };

    const response = await CustomerRepository.createCustomer(customerDraft);

    if (response instanceof Error) {
      if (
        response.message === serverErrorMessages.registrationError.errorMessage
      ) {
        showToast(serverErrorMessages.registrationError.userMessage, true);
      } else if (
        response.message === serverErrorMessages.inputError.errorMessage
      ) {
        showToast(serverErrorMessages.inputError.userMessage, true);
      } else if (
        response.message === serverErrorMessages.serverError.errorMessage
      ) {
        showToast(serverErrorMessages.serverError.userMessage, true);
      } else {
        showToast(response.message, true);
      }
    } else {
      showToast('User is successfully registered', false);
      const loginData = {
        email: data.email,
        password: data.password,
      };
      const login = await CustomerRepository.createLoggedInCustomer(loginData);

      if (login instanceof Error) {
        if (login.message === serverErrorMessages.loginError.errorMessage) {
          showToast(serverErrorMessages.loginError.userMessage, true);
        }
      } else {
        const userState: UserData = {
          loginStatus: true,
        };

        updateState({ user: userState });
        redirectToMain();
      }
    }
  };

  watch();

  return (
    <form
      className="login_form registration-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="registration_h1">Get Started</h1>
      <p>
        Already have an account?
        <Link className="login-link" data-testid="login-link" to="/login">
          Sign In
        </Link>
      </p>
      <div className="inputs-container">
        <Label classes="label" for="emailInput" text="Email" />
        <div className="input-wrapper">
          <input
            {...register('email', emailProps)}
            className="input registration_input"
            id="emailInput"
            type="text"
            placeholder="Enter your email"
          />
          {errors.email && (
            <div className="error_message registration_error">
              {errors.email.message}
            </div>
          )}
        </div>
        <Label classes="label" for="passwordInput" text="Password" />
        <div className="input-wrapper">
          <input
            {...register('password', passwordProps)}
            className="input registration_input"
            id="passwordInput"
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <div className="error_message registration_error">
              {errors.password.message}
            </div>
          )}
        </div>
        <Label classes="label" for="fnameInput" text="First Name" />
        <div className="input-wrapper">
          <input
            {...register('firstName', nameProps('First name'))}
            className="input registration_input"
            id="fnameInput"
            type="text"
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <div className="error_message registration_error">
              {errors.firstName.message}
            </div>
          )}
        </div>
        <Label classes="label" for="lnameInput" text="Last Name" />
        <div className="input-wrapper">
          <input
            {...register('lastName', nameProps('Last name'))}
            className="input registration_input"
            id="lnameInput"
            type="text"
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <div className="error_message registration_error">
              {errors.lastName.message}
            </div>
          )}
        </div>
        <Label classes="label" for="birthDateInput" text="Date of Birth" />
        <div className="input-wrapper">
          <input
            {...register('birthDate', {
              required: 'Date of birth is required',
            })}
            className="input registration_input"
            id="birthDateInput"
            type="date"
            min="1900-01-01"
            max={minBirthDate()}
          />
          {errors.birthDate && (
            <div className="error_message registration_error">
              {errors.birthDate.message}
            </div>
          )}
        </div>
        <fieldset className="fieldset">
          <legend>Shipping address</legend>
          <div className="input-wrapper">
            <input
              {...register('street', {
                required: 'Street is required',
              })}
              className="input"
              id="addressInput"
              type="text"
              placeholder="Street"
              onChange={(e) => {
                if (getValues('useSameAddress')) {
                  setBillingStreet(e.target.value);
                  setValue('street2', e.target.value, { shouldValidate: true });
                }
              }}
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
              onChange={(e) => {
                if (getValues('useSameAddress')) {
                  setBillingCity(e.target.value);
                  setValue('city2', e.target.value, { shouldValidate: true });
                }
              }}
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
              onChange={(e) => {
                if (getValues('useSameAddress')) {
                  setBillingPostCode(e.target.value);
                  setValue('postalCode2', e.target.value, {
                    shouldValidate: true,
                  });
                }
              }}
            />
            {errors.postalCode && (
              <div className="error_message">{errors.postalCode.message}</div>
            )}
          </div>
          <div className="input-wrapper">
            <select
              {...register('country')}
              id="country"
              name="country"
              className="select"
              onChange={(e) => {
                if (getValues('useSameAddress')) {
                  setBillingCountry(e.target.value);
                  setValue('country2', e.target.value, {
                    shouldValidate: true,
                  });
                }
              }}
            >
              <option value="US">USA</option>
              <option value="RU">Russia</option>
              <option value="HR">Croatia</option>
            </select>
            {errors.country && (
              <div className="error_message">{errors.country.message}</div>
            )}
          </div>
          <div className="input-wrapper">
            <input
              {...register('defaultShipping')}
              type="checkbox"
              id="defaultShipping"
              name="defaultShipping"
            ></input>
            <Label
              classes="label"
              for="defaultShipping"
              text="Use this as the default shipping address"
            ></Label>
          </div>
        </fieldset>
        <fieldset className="fieldset">
          <legend>Billing address</legend>
          <div className="input-wrapper">
            <input
              {...register('street2', {
                required: 'Street is required',
              })}
              className={`input ${disabledClass}`}
              id="street2"
              data-testid="street2"
              type="text"
              placeholder="Street"
              value={billingStreet}
              onChange={(e) => {
                if (!getValues('useSameAddress')) {
                  setBillingStreet(e.target.value);
                }
              }}
            />
            {errors.street2 && (
              <div className="error_message">{errors.street2.message}</div>
            )}
          </div>
          <div className="input-wrapper">
            <input
              {...register('city2', nameProps('City'))}
              className={`input ${disabledClass}`}
              data-testid="city2"
              type="text"
              placeholder="City"
              value={billingCity}
              onChange={(e) => {
                if (!getValues('useSameAddress')) {
                  setBillingCity(e.target.value);
                }
              }}
            />
            {errors.city2 && (
              <div className="error_message">{errors.city2.message}</div>
            )}
          </div>
          <div className="input-wrapper">
            <input
              {...register('postalCode2', postCodeProps(`${billingCountry}`))}
              className={`input ${disabledClass}`}
              data-testid="postcode2"
              type="text"
              placeholder="Postal Code"
              value={billingPostCode}
              onChange={(e) => {
                if (!getValues('useSameAddress')) {
                  setBillingPostCode(e.target.value);
                }
              }}
            />
            {errors.postalCode2 && (
              <div className="error_message">{errors.postalCode2.message}</div>
            )}
          </div>
          <div className="input-wrapper">
            <select
              {...register('country2')}
              id="country2"
              data-testid="country2"
              name="country2"
              className={`select ${disabledClass}`}
              value={billingCountry}
              onChange={(e) => {
                if (!getValues('useSameAddress')) {
                  setBillingCountry(e.target.value);
                }
              }}
            >
              <option value="US">USA</option>
              <option value="RU">Russia</option>
              <option value="HR">Croatia</option>
            </select>
            {errors.country2 && (
              <div className="error_message">{errors.country2.message}</div>
            )}
          </div>
          <div className="input-wrapper">
            <input
              {...register('defaultBilling')}
              type="checkbox"
              id="defaultBilling"
              name="defaultBilling"
            ></input>
            <Label
              classes="label"
              for="defaultBilling"
              text="Use this as the default billing address"
            ></Label>
          </div>
        </fieldset>
      </div>
      <div className="input_wrapper sameAddress">
        <input
          {...register('useSameAddress')}
          type="checkbox"
          id="useSameAddress"
          name="useSameAddress"
          onChange={(e) => {
            if (e.target.checked) {
              setSameAddress();
              setDisabledClass('disabled-input');
            } else {
              setDisabledClass('');
            }
          }}
        ></input>
        <Label
          classes="label"
          for="useSameAddress"
          text="Use the same address for both shipping and billing"
        ></Label>
      </div>
      <BaseButton classes="button" text="Sign up" type="submit" />
    </form>
  );
}

export default RegistrationForm;
