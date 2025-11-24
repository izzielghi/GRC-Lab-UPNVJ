import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, FormText, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getComplianceRecords } from 'app/entities/compliance-record/compliance-record.reducer';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntities as getAssets } from 'app/entities/asset/asset.reducer';
import { getEntities as getRooms } from 'app/entities/room/room.reducer';
import { BookingStatus } from 'app/shared/model/enumerations/booking-status.model';
import { createEntity, getEntity, updateEntity } from './booking.reducer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

export const BookingUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const complianceRecords = useAppSelector(state => state.complianceRecord.entities);
  const users = useAppSelector(state => state.userManagement.users);
  const assets = useAppSelector(state => state.asset.entities);
  const rooms = useAppSelector(state => state.room.entities);
  const bookingEntity = useAppSelector(state => state.booking.entity);
  const loading = useAppSelector(state => state.booking.loading);
  const updating = useAppSelector(state => state.booking.updating);
  const updateSuccess = useAppSelector(state => state.booking.updateSuccess);
  const bookingStatusValues = Object.keys(BookingStatus);
  const authorities = useAppSelector(state => state.authentication.account.authorities);
  const isAdmin = hasAnyAuthority(authorities, ['ROLE_ADMIN']);
  const account = useAppSelector(state => state.authentication.account);

  const handleClose = () => {
    navigate('/booking');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }

    dispatch(getComplianceRecords({}));
    dispatch(getUsers({}));
    dispatch(getAssets({}));
    dispatch(getRooms({}));
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

    const entity = {
      ...bookingEntity,
      ...values,
      startTime: convertDateTimeToServer(values.startTime),
      endTime: convertDateTimeToServer(values.endTime),
      complianceRecord: values.complianceRecord ? { id: values.complianceRecord } : null,
      assets: bookingEntity?.assets?.map(e => (e && e.id ? e.id.toString() : null)).filter(Boolean),
      rooms: bookingEntity?.rooms?.map(e => (e && e.id ? e.id.toString() : null)).filter(Boolean),
      status: isNew ? BookingStatus.PENDING : values.status,
    };

    if (isNew) {
      entity.user = account;
      dispatch(createEntity(entity));
    } else {
      delete entity.user;
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          startTime: displayDefaultDateTime(),
          endTime: displayDefaultDateTime(),
          status: 'PENDING',
        }
      : {
          ...bookingEntity,
          startTime: convertDateTimeFromServer(bookingEntity.startTime),
          endTime: convertDateTimeFromServer(bookingEntity.endTime),
          complianceRecord: bookingEntity?.complianceRecord?.id,
          assets: bookingEntity?.assets?.map(e => e.id.toString()),
          rooms: bookingEntity?.rooms?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="eLabApp.booking.home.createOrEditLabel" data-cy="BookingCreateUpdateHeading">
            Buat atau edit Booking
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="booking-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Title"
                id="booking-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{
                  required: { value: true, message: 'Inputan ini diperlukan.' },
                }}
              />
              <ValidatedField
                label="Start Time"
                id="booking-startTime"
                name="startTime"
                data-cy="startTime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'Inputan ini diperlukan.' },
                }}
              />
              <ValidatedField
                label="End Time"
                id="booking-endTime"
                name="endTime"
                data-cy="endTime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'Inputan ini diperlukan.' },
                }}
              />
              <ValidatedField
                label="Purpose"
                id="booking-purpose"
                name="purpose"
                data-cy="purpose"
                type="text"
                validate={{
                  required: { value: true, message: 'Inputan ini diperlukan.' },
                }}
              />
              {isAdmin && (
                <ValidatedField label="Status" id="booking-status" name="status" data-cy="status" type="select">
                  <option value="" key="0" />
                  {bookingStatusValues.map(bookingStatus => (
                    <option value={bookingStatus} key={bookingStatus}>
                      {bookingStatus}
                    </option>
                  ))}
                </ValidatedField>
              )}
              <ValidatedField label="Notes" id="booking-notes" name="notes" data-cy="notes" type="text" />
              <ValidatedField
                id="booking-complianceRecord"
                name="complianceRecord"
                data-cy="complianceRecord"
                label="Compliance Record"
                type="select"
              >
                <option value="" key="0" />
                {complianceRecords
                  ? complianceRecords.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField label="Asset" id="booking-asset" data-cy="asset" type="select" multiple name="assets">
                <option value="" key="0" />
                {assets
                  ? assets.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField label="Room" id="booking-room" data-cy="room" type="select" multiple name="rooms">
                <option value="" key="0" />
                {rooms
                  ? rooms.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/booking" replace color="info">
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

export default BookingUpdate;
