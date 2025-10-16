import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, FormText, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { createUser, getRoles, getUser, reset, updateUser } from './user-management.reducer';

const roleDisplayMap = {
  ROLE_ADMIN: 'Admin',
  ROLE_USER: 'User',
};

export const UserManagementUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { login } = useParams<'login'>();
  const isNew = login === undefined;
  const [selectedRoles, setSelectedRoles] = useState([]);
  const handleClose = () => {
    navigate('/admin/user-management');
  };
  const user = useAppSelector(state => state.userManagement.user);

  useEffect(() => {
    dispatch(getRoles());
    if (!isNew) {
      dispatch(getUser(login));
    }
    // ...
  }, [login]);

  useEffect(() => {
    if (!isNew && user && user.authorities) {
      setSelectedRoles(user.authorities);
    }
  }, [user]);

  const saveUser = values => {
    // Gabungkan data form dengan peran yang kita kelola secara manual
    const finalUserData = {
      ...values,
      authorities: selectedRoles,
    };

    if (isNew) {
      dispatch(createUser(finalUserData)); // Kirim data yang sudah lengkap
    } else {
      dispatch(updateUser(finalUserData)); // Kirim data yang sudah lengkap
    }
    handleClose();
  };

  const isInvalid = false;
  const loading = useAppSelector(state => state.userManagement.loading);
  const updating = useAppSelector(state => state.userManagement.updating);
  const authorities = useAppSelector(state => state.userManagement.authorities);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>Buat atau ubah pengguna</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm onSubmit={saveUser} defaultValues={user}>
              {user.id ? <ValidatedField type="text" name="id" required readOnly label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                type="text"
                name="login"
                label="Login"
                validate={{
                  required: {
                    value: true,
                    message: 'Username anda diperlukan.',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                    message: 'Your username is invalid.',
                  },
                  minLength: {
                    value: 1,
                    message: 'Username anda diperlukan minimal 1 karakter.',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Username anda tidak boleh lebih dari 50 karakter.',
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="firstName"
                label="Nama Depan"
                validate={{
                  maxLength: {
                    value: 50,
                    message: 'Inputan ini tidak boleh lebih dari 50 karakter.',
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="lastName"
                label="Nama Belakang"
                validate={{
                  maxLength: {
                    value: 50,
                    message: 'Inputan ini tidak boleh lebih dari 50 karakter.',
                  },
                }}
              />
              <FormText>This field cannot be longer than 50 characters.</FormText>
              <ValidatedField
                name="email"
                label="Email"
                placeholder="Email anda"
                type="email"
                validate={{
                  required: {
                    value: true,
                    message: 'Email anda diperlukan.',
                  },
                  minLength: {
                    value: 5,
                    message: 'Email anda diperlukan setidaknya minimal 5 karakter.',
                  },
                  maxLength: {
                    value: 254,
                    message: 'Email anda tidak boleh lebih dari 50 karakater.',
                  },
                  validate: v => isEmail(v) || 'Email anda tidak valid.',
                }}
              />
              <div className="mb-3">
                <label className="form-label">Profil</label>
                <div>
                  {authorities.map(role => (
                    <div className="form-check" key={role}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`role-${role}`}
                        value={role}
                        checked={selectedRoles.includes(role)}
                        onChange={() => {
                          // Logika untuk menambah/menghapus peran dari state
                          if (selectedRoles.includes(role)) {
                            setSelectedRoles(selectedRoles.filter(r => r !== role));
                          } else {
                            setSelectedRoles([...selectedRoles, role]);
                          }
                        }}
                      />
                      <label className="form-check-label" htmlFor={`role-${role}`}>
                        {roleDisplayMap[role] || role}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <Button tag={Link} to="/admin/user-management" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Kembali</span>
              </Button>
              &nbsp;
              <Button color="primary" type="submit" disabled={isInvalid || updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Simpan
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserManagementUpdate;
