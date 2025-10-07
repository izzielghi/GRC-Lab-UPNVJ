import React, { useEffect, useState } from 'react';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { Alert, Button, Col, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { handleRegister, reset } from './register.reducer';

export const RegisterPage = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    [],
  );

  const handleValidSubmit = ({ username, email, firstPassword }) => {
    dispatch(handleRegister({ login: username, email, password: firstPassword, langKey: 'en' }));
  };

  const updatePassword = event => setPassword(event.target.value);

  const successMessage = useAppSelector(state => state.register.successMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1 id="register-title" data-cy="registerTitle">
            Pendaftaran
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <ValidatedForm id="register-form" onSubmit={handleValidSubmit}>
            <ValidatedField
              name="username"
              label="Username"
              placeholder="Username anda"
              validate={{
                required: { value: true, message: 'Username anda diperlukan.' },
                pattern: {
                  value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                  message: 'Your username is invalid.',
                },
                minLength: { value: 1, message: 'Username anda diperlukan minimal 1 karakter.' },
                maxLength: { value: 50, message: 'Username anda tidak boleh lebih dari 50 karakter.' },
              }}
              data-cy="username"
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
            <ValidatedField
              name="firstPassword"
              label="Password baru"
              placeholder="Ketik password baru anda disini"
              type="password"
              onChange={updatePassword}
              validate={{
                required: { value: true, message: 'Password anda diperlukan.' },
                minLength: { value: 4, message: 'Password anda diperlukan setidaknya minimal 4 karakter.' },
                maxLength: { value: 50, message: 'Password anda tidak boleh lebih dari 50 karakter.' },
              }}
              data-cy="firstPassword"
            />
            <PasswordStrengthBar password={password} />
            <ValidatedField
              name="secondPassword"
              label="Konfirmasi password baru"
              placeholder="Ketik konfirmasi password baru anda disini"
              type="password"
              validate={{
                required: { value: true, message: 'Konfirmasi password anda diperlukan.' },
                minLength: { value: 4, message: 'Konfirmasi Password anda diperlukan setidaknya minimal 4 karakter.' },
                maxLength: { value: 50, message: 'Konfirmasi Password anda tidak boleh lebih dari 50 karakter.' },
                validate: v => v === password || 'Password dan konfirmasi password tidak sama!',
              }}
              data-cy="secondPassword"
            />
            <Button id="register-submit" color="primary" type="submit" data-cy="submit">
              Daftar
            </Button>
          </ValidatedForm>
          <p>&nbsp;</p>
          <Alert color="warning">
            <span>Jika anda ingin </span>
            <Link to="/login" className="alert-link">
              masuk
            </Link>
            <span>
              , anda bisa coba menggunakan akun yang sudah ada:
              <br />- Administrator (username=&quot;admin&quot; and password=&quot;admin&quot;) <br />- User (username=&quot;user&quot; and
              password=&quot;user&quot;).
            </span>
          </Alert>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;
