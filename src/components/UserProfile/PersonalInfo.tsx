import { useEffect, useState } from 'react';

import { CustomerRepository } from '../../services/CustomerRepository';
import BaseButton from '../Button/Button';

import ModalPassword from './ModalPasswordChange';
import ModalPersonalInfo from './ModalPersonalInfo';

function PersonalInfo() {
  const [customerName, setCustomerName] = useState('');
  const [customerLastName, setCustomerLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [customerVersion, setCustomerVersion] = useState(1);
  const [modalPasswordOpen, setModalPasswordOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function openModalPassword() {
    setModalPasswordOpen(true);
  }

  function closeModalPassword() {
    setModalPasswordOpen(false);
  }

  useEffect(() => {
    async function getCustomer() {
      try {
        const customer = await CustomerRepository.getCustomerInformation();

        if (customer.body.firstName) {
          setCustomerName(customer.body.firstName);
        }
        if (customer.body.lastName) {
          setCustomerLastName(customer.body.lastName);
        }
        if (customer.body.dateOfBirth) {
          setBirthDate(customer.body.dateOfBirth);
        }
        setEmail(customer.body.email);
        setCustomerId(customer.body.id);
        setCustomerVersion(customer.body.version);
      } catch (error) {
        throw new Error('error fetching customer');
      }
    }
    void getCustomer();
  });

  return (
    <fieldset className="fieldset user-profile_fieldset">
      <legend className="legend">Personal Info</legend>
      <div className="field-wrapper">
        <div className="label">First Name</div>
        <div className="info">{customerName}</div>
      </div>
      <div className="field-wrapper">
        <div className="label">Last Name</div>
        <div className="info">{customerLastName}</div>
      </div>
      <div className="field-wrapper">
        <div className="label">Date of Birth</div>
        <div className="info">{birthDate}</div>
      </div>
      <div className="field-wrapper">
        <div className="label">Email</div>
        <div className="info">{email}</div>
      </div>
      <BaseButton
        classes="button address_button"
        text="Edit"
        type="button"
        callback={openModal}
      />
      {modalOpen && (
        <ModalPersonalInfo
          closeModal={closeModal}
          customerName={customerName}
          customerLastName={customerLastName}
          customerBirthDate={birthDate}
          email={email}
          customerId={customerId}
          customerVersion={customerVersion}
        />
      )}
      <BaseButton
        classes="button"
        text="Change password"
        type="button"
        callback={openModalPassword}
      />
      {modalPasswordOpen && (
        <ModalPassword
          closeModal={closeModalPassword}
          customerId={customerId}
          customerVersion={customerVersion}
        />
      )}
    </fieldset>
  );
}

export default PersonalInfo;
