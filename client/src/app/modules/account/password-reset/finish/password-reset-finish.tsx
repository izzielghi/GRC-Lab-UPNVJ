import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { handlePasswordResetFinish, reset } from '../password-reset.reducer';

export const PasswordResetFinishPage = () => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const key = searchParams.get('key');

  const [password, setPassword] = useState('');

  useEffect(
    () => () => {
      dispatch(reset());
    },
    [],
  );

  const handleValidSubmit = ({ newPassword }) => dispatch(handlePasswordResetFinish({ key, newPassword }));

  const updatePassword = event => setPassword(event.target.value);

  const getResetForm = () => {
    return (
      <ValidatedForm onSubmit={handleValidSubmit}>
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
          data-cy="resetPassword"
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
          data-cy="confirmResetPassword"
        />
        <Button color="success" type="submit" data-cy="submit">
          Validasi password baru
        </Button>
      </ValidatedForm>
    );
  };

  const successMessage = useAppSelector(state => state.passwordReset.successMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="4">
          <h1>Reset password</h1>
          <div>{key ? getResetForm() : null}</div>
        </Col>
      </Row>
    </div>
  );
};

export default PasswordResetFinishPage;
