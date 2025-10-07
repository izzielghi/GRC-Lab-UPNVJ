import React, { useEffect } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { reset, saveAccountSettings } from './settings.reducer';

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.settings.successMessage);

  useEffect(() => {
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  const handleValidSubmit = values => {
    dispatch(
      saveAccountSettings({
        ...account,
        ...values,
      }),
    );
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="settings-title">
            Pengaturan pengguna untuk [<strong>{account.login}</strong>]
          </h2>
          <ValidatedForm id="settings-form" onSubmit={handleValidSubmit} defaultValues={account}>
            <ValidatedField
              name="firstName"
              label="Nama depan"
              id="firstName"
              placeholder="Nama depan anda"
              validate={{
                required: { value: true, message: 'Nama depan anda diperlukan.' },
                minLength: { value: 1, message: 'Nama depan anda diperlukan minimal 1 karakter' },
                maxLength: { value: 50, message: 'Nama depan anda tidak boleh lebih dari 50 karakter' },
              }}
              data-cy="firstname"
            />
            <ValidatedField
              name="lastName"
              label="Nama belakang"
              id="lastName"
              placeholder="Nama belakang anda"
              validate={{
                required: { value: true, message: 'Nama belakang diperlukan.' },
                minLength: { value: 1, message: 'Nama belakang diperlukan minimal 1 karakter' },
                maxLength: { value: 50, message: 'Nama belakang anda tidak boleh lebih dari 50 karakter' },
              }}
              data-cy="lastname"
            />
            <ValidatedField
              name="email"
              label="Email"
              placeholder="Email anda"
              type="email"
              validate={{
                required: { value: true, message: 'Email anda diperlukan.' },
                minLength: { value: 5, message: 'Email anda diperlukan setidaknya minimal 5 karakter.' },
                maxLength: { value: 254, message: 'Email anda tidak boleh lebih dari 50 karakater.' },
                validate: v => isEmail(v) || 'Email anda tidak valid.',
              }}
              data-cy="email"
            />
            <Button color="primary" type="submit" data-cy="submit">
              Simpan
            </Button>
          </ValidatedForm>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
