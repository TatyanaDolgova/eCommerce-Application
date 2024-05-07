import './RegistrationForm.css';

import BaseButton from '../Button/Button';
import Input from '../Input/Input';
import Label from '../Label/Label';
import Select from '../Select/Select';

function submitForm() {
  console.log('clicked');
}

function RegistrationForm() {
  return (
    <form className="login_form registration-form">
      <h1>Get Started</h1>
      <div className="inputs-container">
        <Label classes="label" for="emailInput" text="Email" />
        <Input
          classes="input"
          id="emailInput"
          type="email"
          placeholder="Enter your email"
        />
        <Label classes="label" for="passwordInput" text="Password" />
        <Input
          classes="input"
          id="passwordInput"
          type="password"
          placeholder="Enter your password"
        />
        <Label classes="label" for="fnameInput" text="First Name" />
        <Input
          classes="input"
          id="fnameInput"
          type="text"
          placeholder="Enter your first name"
        />
        <Label classes="label" for="lnameInput" text="Last Name" />
        <Input
          classes="input"
          id="lnameInput"
          type="text"
          placeholder="Enter your last name"
        />
        <Label classes="label" for="birthDateInput" text="Date of Birth" />
        <Input
          classes="input"
          id="birthDateInput"
          type="date"
          max="2011-01-01"
        />
        <Label
          classes="label address-label"
          for="addressInput"
          text="Address"
        />
        <Input
          classes="input"
          id="addressInput"
          type="text"
          placeholder="Street"
        />
        <Input classes="input" type="text" placeholder="City" />
        <Input classes="input" type="text" placeholder="Postal Code" />
        <Select
          classes="select"
          name="addressCountry"
          id="addressCountry"
          options={['US', 'Croatia', 'Russia']}
        ></Select>
      </div>
      <BaseButton
        callback={submitForm}
        classes="button"
        text="Sign up"
        type="button"
      />
    </form>
  );
}

export default RegistrationForm;
