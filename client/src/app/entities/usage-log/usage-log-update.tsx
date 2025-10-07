import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, FormText, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm, isNumber } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntities as getRooms } from 'app/entities/room/room.reducer';
import { getEntities as getAssets } from 'app/entities/asset/asset.reducer';
import { createEntity, getEntity, updateEntity } from './usage-log.reducer';

export const UsageLogUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const rooms = useAppSelector(state => state.room.entities);
  const assets = useAppSelector(state => state.asset.entities);
  const usageLogEntity = useAppSelector(state => state.usageLog.entity);
  const loading = useAppSelector(state => state.usageLog.loading);
  const updating = useAppSelector(state => state.usageLog.updating);
  const updateSuccess = useAppSelector(state => state.usageLog.updateSuccess);

  const handleClose = () => {
    navigate('/usage-log');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
    dispatch(getRooms({}));
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
    values.dateTime = convertDateTimeToServer(values.dateTime);
    if (values.duration !== undefined && typeof values.duration !== 'number') {
      values.duration = Number(values.duration);
    }

    const entity = {
      ...usageLogEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user?.toString()),
      room: rooms.find(it => it.id.toString() === values.room?.toString()),
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
          dateTime: displayDefaultDateTime(),
        }
      : {
          ...usageLogEntity,
          dateTime: convertDateTimeFromServer(usageLogEntity.dateTime),
          user: usageLogEntity?.user?.id,
          room: usageLogEntity?.room?.id,
          asset: usageLogEntity?.asset?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="eLabApp.usageLog.home.createOrEditLabel" data-cy="UsageLogCreateUpdateHeading">
            Buat atau edit Usage Log
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="usage-log-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Date Time"
                id="usage-log-dateTime"
                name="dateTime"
                data-cy="dateTime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'Inputan ini diperlukan.' },
                }}
              />
              <ValidatedField
                label="Purpose"
                id="usage-log-purpose"
                name="purpose"
                data-cy="purpose"
                type="text"
                validate={{
                  required: { value: true, message: 'Inputan ini diperlukan.' },
                }}
              />
              <ValidatedField
                label="Duration"
                id="usage-log-duration"
                name="duration"
                data-cy="duration"
                type="text"
                validate={{
                  min: { value: 1, message: 'Inputan ini harus minimal 1.' },
                  validate: v => isNumber(v) || 'Inputan ini harus angka.',
                }}
              />
              <ValidatedField id="usage-log-user" name="user" data-cy="user" label="User" type="select">
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="usage-log-room" name="room" data-cy="room" label="Room" type="select">
                <option value="" key="0" />
                {rooms
                  ? rooms.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="usage-log-asset" name="asset" data-cy="asset" label="Asset" type="select" required>
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/usage-log" replace color="info">
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

export default UsageLogUpdate;
