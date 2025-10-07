import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, FormText, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntities as getAssets } from 'app/entities/asset/asset.reducer';
import { IncidentType } from 'app/shared/model/enumerations/incident-type.model';
import { createEntity, getEntity, updateEntity } from './incident.reducer';

export const IncidentUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const assets = useAppSelector(state => state.asset.entities);
  const incidentEntity = useAppSelector(state => state.incident.entity);
  const loading = useAppSelector(state => state.incident.loading);
  const updating = useAppSelector(state => state.incident.updating);
  const updateSuccess = useAppSelector(state => state.incident.updateSuccess);
  const incidentTypeValues = Object.keys(IncidentType);

  const handleClose = () => {
    navigate('/incident');
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
    values.date = convertDateTimeToServer(values.date);

    const entity = {
      ...incidentEntity,
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
      ? {
          date: displayDefaultDateTime(),
        }
      : {
          type: 'DAMAGE_TO_ASSET',
          ...incidentEntity,
          date: convertDateTimeFromServer(incidentEntity.date),
          user: incidentEntity?.user?.id,
          asset: incidentEntity?.asset?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="eLabApp.incident.home.createOrEditLabel" data-cy="IncidentCreateUpdateHeading">
            Buat atau edit Incident
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="incident-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Title"
                id="incident-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{
                  required: { value: true, message: 'Inputan ini diperlukan.' },
                }}
              />
              <ValidatedField
                label="Description"
                id="incident-description"
                name="description"
                data-cy="description"
                type="textarea"
                validate={{
                  required: { value: true, message: 'Inputan ini diperlukan.' },
                }}
              />
              <ValidatedField label="Type" id="incident-type" name="type" data-cy="type" type="select">
                {incidentTypeValues.map(incidentType => (
                  <option value={incidentType} key={incidentType}>
                    {incidentType}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Date"
                id="incident-date"
                name="date"
                data-cy="date"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'Inputan ini diperlukan.' },
                }}
              />
              <ValidatedField
                label="Mitigation Action"
                id="incident-mitigationAction"
                name="mitigationAction"
                data-cy="mitigationAction"
                type="textarea"
              />
              <ValidatedField id="incident-user" name="user" data-cy="user" label="User" type="select">
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="incident-asset" name="asset" data-cy="asset" label="Asset" type="select" required>
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/incident" replace color="info">
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

export default IncidentUpdate;
