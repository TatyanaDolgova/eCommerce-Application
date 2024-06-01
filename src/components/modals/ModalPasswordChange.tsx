import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CustomerRepository } from '../../services/CustomerRepository';
import showToast from '../../utils/notifications';
import { passwordProps } from '../../utils/validation';
import BaseButton from '../Button/Button';
import Input from '../Input/Input';
import Label from '../Label/Label';

type FormFields = {
  newPassword: string;
  password: string;
};

function ModalPassword(props: ModalPasswordProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ mode: 'all' });
  const [passwordInputType, setPasswordInputType] = useState('password');
  const [newPasswordInputType, setNewPasswordInputType] = useState('password');

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const response: unknown = await CustomerRepository.changeCustomerPassword(
      props.customerId,
      props.customerVersion,
      data.password,
      data.newPassword,
    );

    if (response instanceof Error) {
      showToast(response.message, true);
    } else {
      const loginData = {
        email: props.email,
        password: data.newPassword,
      };
      const login = await CustomerRepository.createLoggedInCustomer(loginData);

      if (login instanceof Error) {
        showToast(login.message, true);
      } else {
        showToast('Password is changed', false);
        props.closeModal();
      }
    }
  };

  const showPassword = () => {
    if (passwordInputType === 'password') {
      setPasswordInputType('text');
    } else {
      setPasswordInputType('password');
    }
  };
  const showNewPassword = () => {
    if (newPasswordInputType === 'password') {
      setNewPasswordInputType('text');
    } else {
      setNewPasswordInputType('password');
    }
  };

  return (
    <div className="shadow">
      <div className="modal-container">
        <BaseButton
          classes="button buttonX"
          text="X"
          type="button"
          callback={props.closeModal}
        />
        <h2 className="modal-h2">Change Password</h2>
        <form
          className="modal-form password-modal_form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Label classes="label" for="oldPasswordInput" text="Password" />
          <div className="input-wrapper modal_password-wrapper">
            <div className="password-wrapper">
              <input
                {...register('password', passwordProps)}
                className="input registration_input"
                id="oldPasswordInput"
                type={passwordInputType}
                placeholder="Enter your password"
              />
              <Input
                classes="input show_password_input"
                type="checkbox"
                dataTestId="password_checkbox"
                callback={showPassword}
              ></Input>
            </div>
            {errors.password?.message && (
              <div
                className="error_message modal_error"
                data-testid="password_error_message"
              >
                {errors.password.message}
              </div>
            )}
          </div>
          <Label classes="label" for="newPasswordInput" text="New Password" />
          <div className="input-wrapper modal_password-wrapper">
            <div className="password-wrapper">
              <input
                {...register('newPassword', passwordProps)}
                className="input registration_input"
                id="newPasswordInput"
                type={newPasswordInputType}
                placeholder="Enter your new password"
              />
              <Input
                classes="input show_password_input"
                type="checkbox"
                dataTestId="new_password_checkbox"
                callback={showNewPassword}
              ></Input>
            </div>
            <div
              className="error_message modal_error"
              data-testid="newPassword_error_message"
            >
              {errors.newPassword?.message ?? ''}
            </div>
          </div>
          <div className="button-wrapper modal_button-wrapper">
            <BaseButton
              classes="button"
              text="Cancel"
              type="button"
              callback={props.closeModal}
            />
            <BaseButton classes="button" text="Save" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

interface ModalPasswordProps {
  closeModal: () => void;
  customerId: string;
  customerVersion: number;
  email: string;
}

export default ModalPassword;
