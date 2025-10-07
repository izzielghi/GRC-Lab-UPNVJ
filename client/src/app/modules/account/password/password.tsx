import React, { useEffect, useState } from 'react';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Button, Col, Row } from 'reactstrap';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { reset, savePassword } from './password.reducer';

export const PasswordPage = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reset());
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, []);

  const handleValidSubmit = ({ currentPassword, newPassword }) => {
    dispatch(savePassword({ currentPassword, newPassword }));
  };

  const updatePassword = event => setPassword(event.target.value);

  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.password.successMessage);
  const errorMessage = useAppSelector(state => state.password.errorMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    } else if (errorMessage) {
      toast.error(errorMessage);
    }
    dispatch(reset());
  }, [successMessage, errorMessage]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="password-title">
            Password untuk [<strong>{account.login}</strong>]
          </h2>
          <ValidatedForm id="password-form" onSubmit={handleValidSubmit}>
            <ValidatedField
              name="currentPassword"
              label="Password sekarang"
              placeholder="Password sekarang"
              type="password"
              validate={{
                required: { value: true, message: 'Password anda diperlukan.' },
              }}
              data-cy="currentPassword"
            />
            <ValidatedField
              name="newPassword"
              label="Password baru"
              placeholder="Ketik password baru anda disini"
              type="password"
              validate={{
                required: { value: true, message: 'Password anda diperlukan.' },
                minLength: { value: 4, message: 'Password anda diperlukan setidaknya minimal 4 karakter.' },
                maxLength: { value: 50, message: 'Password anda tidak boleh lebih dari 50 karakter.' },
              }}
              onChange={updatePassword}
              data-cy="newPassword"
            />
            <PasswordStrengthBar password={password} />
            <ValidatedField
              name="confirmPassword"
              label="Konfirmasi password baru"
              placeholder="Ketik konfirmasi password baru anda disini"
              type="password"
              validate={{
                required: { value: true, message: 'Konfirmasi password anda diperlukan.' },
                minLength: { value: 4, message: 'Konfirmasi Password anda diperlukan setidaknya minimal 4 karakter.' },
                maxLength: { value: 50, message: 'Konfirmasi Password anda tidak boleh lebih dari 50 karakter.' },
                validate: v => v === password || 'Password dan konfirmasi password tidak sama!',
              }}
              data-cy="confirmPassword"
            />
            <Button color="success" type="submit" data-cy="submit">
              Simpan
            </Button>
          </ValidatedForm>
        </Col>
      </Row>
    </div>
  );
};

export default PasswordPage;
