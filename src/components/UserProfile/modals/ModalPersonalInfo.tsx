import './Modal.css';
import { CustomerUpdateAction } from '@commercetools/platform-sdk';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CustomerRepository } from '../../../services/CustomerRepository';
import showToast from '../../../utils/notifications';
import { emailProps, minBirthDate, nameProps } from '../../../utils/validation';
import BaseButton from '../../Button/Button';
import Label from '../../Label/Label';

type FormFields = {
  birthDate: Date;
  email: string;
  firstName: string;
  lastName: string;
};

function ModalPersonalInfo(modalProps: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    mode: 'all',
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const actions: CustomerUpdateAction[] = [
      {
        action: 'changeEmail',
        email: data.email,
      },
      {
        action: 'setFirstName',
        firstName: data.firstName,
      },
      {
        action: 'setLastName',
        lastName: data.lastName,
      },
      {
        action: 'setDateOfBirth',
        dateOfBirth: data.birthDate.toString(),
      },
    ];

    const response: unknown = await CustomerRepository.updateCustomer(
      modalProps.customerId,
      modalProps.customerVersion,
      actions,
    );

    if (response instanceof Error) {
      showToast(response.message, true);
    } else {
      showToast('User information successfully updated', false);
      modalProps.closeModal();
    }
  };

  return (
    <div className="shadow">
      <div className="modal-container">
        <BaseButton
          classes="button buttonX"
          text="X"
          type="button"
          callback={modalProps.closeModal}
        />
        <h2 className="modal-h2">Edit Personal Information</h2>
        <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-input-wrapper">
            <Label classes="label" text="First Name" for="firstName" />
            <input
              {...register('firstName', nameProps('First name'))}
              className="input"
              type="text"
              id="firstName"
              defaultValue={modalProps.customerName}
            />
            <div
              className="error_message modal_error"
              data-testid="name_error_message"
            >
              {errors.firstName?.message ?? ''}
            </div>
          </div>
          <div className="modal-input-wrapper">
            <Label classes="label" text="Last Name" for="lastName" />
            <input
              {...register('lastName', nameProps('Last name'))}
              className="input"
              id="lastName"
              type="text"
              defaultValue={modalProps.customerLastName}
            />
            <div
              className="error_message modal_error"
              data-testid="lastName_error_message"
            >
              {errors.lastName?.message ?? ''}
            </div>
          </div>
          <div className="modal-input-wrapper">
            <Label classes="label" text="Date of Birth" for="birthDate" />
            <input
              {...register('birthDate', {
                required: 'Date of birth is required',
              })}
              className="input"
              id="birthDate"
              type="date"
              min="1900-01-01"
              max={minBirthDate()}
              defaultValue={modalProps.customerBirthDate}
            />
            <div className="error_message modal_error">
              {errors.birthDate?.message ?? ''}
            </div>
          </div>
          <div className="modal-input-wrapper">
            <Label classes="label" text="Email" for="email" />
            <input
              {...register('email', emailProps)}
              className="input"
              id="email"
              type="text"
              defaultValue={modalProps.email}
            />
            <div
              className="error_message modal_error"
              data-testid="email_error_message"
            >
              {errors.email?.message ?? ''}
            </div>
          </div>
          <div className="button-wrapper modal_button-wrapper">
            <BaseButton
              classes="button"
              text="Cancel"
              type="button"
              callback={modalProps.closeModal}
            />
            <BaseButton classes="button" text="Save" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

interface ModalProps {
  closeModal: () => void;
  customerBirthDate: string;
  customerId: string;
  customerLastName: string;
  customerName: string;
  customerVersion: number;
  email: string;
}

export default ModalPersonalInfo;
