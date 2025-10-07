import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, FormText, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntities as getAssets } from 'app/entities/asset/asset.reducer';
import { createEntity, getEntity, updateEntity } from './maintenance-record.reducer';

export const MaintenanceRecordUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const assets = useAppSelector(state => state.asset.entities);
  const maintenanceRecordEntity = useAppSelector(state => state.maintenanceRecord.entity);
  const loading = useAppSelector(state => state.maintenanceRecord.loading);
  const updating = useAppSelector(state => state.maintenanceRecord.updating);
  const updateSuccess = useAppSelector(state => state.maintenanceRecord.updateSuccess);

  const handleClose = () => {
    navigate('/maintenance-record');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
    dispatch(getAssets({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    if (values.cost !== undefined && typeof values.cost !== 'number') {
      values.cost = Number(values.cost);
    }

    const entity = {
      ...maintenanceRecordEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user?.toString()),
      asset: assets.find(it => it.id.toString() === values.asset?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...maintenanceRecordEntity,
          user: maintenanceRecordEntity?.user?.id,
          asset: maintenanceRecordEntity?.asset?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="eLabApp.maintenanceRecord.home.createOrEditLabel" data-cy="MaintenanceRecordCreateUpdateHeading">
            Buat atau edit Maintenance Record
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="maintenance-record-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Date"
                id="maintenance-record-date"
                name="date"
                data-cy="date"
                type="date"
                validate={{
                  required: { value: true, message: 'Inputan ini diperlukan.' },
                }}
              />
              <ValidatedField
                label="Description"
                id="maintenance-record-description"
                name="description"
                data-cy="description"
                type="textarea"
                validate={{
                  required: { value: true, message: 'Inputan ini diperlukan.' },
                }}
              />
              <ValidatedField label="Cost" id="maintenance-record-cost" name="cost" data-cy="cost" type="text" />
              <ValidatedField
                label="Next Service Date"
                id="maintenance-record-nextServiceDate"
                name="nextServiceDate"
                data-cy="nextServiceDate"
                type="date"
              />
              <ValidatedField id="maintenance-record-user" name="user" data-cy="user" label="User" type="select">
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="maintenance-record-asset" name="asset" data-cy="asset" label="Asset" type="select" required>
                <option value="" key="0" />
                {assets
                  ? assets.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>Inputan ini diperlukan.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/maintenance-record" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Kembali</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
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

export default MaintenanceRecordUpdate;
