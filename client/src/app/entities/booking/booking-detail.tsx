import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './booking.reducer';

export const BookingDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const bookingEntity = useAppSelector(state => state.booking.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bookingDetailsHeading">Booking</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{bookingEntity.id}</dd>
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{bookingEntity.title}</dd>
          <dt>
            <span id="startTime">Start Time</span>
          </dt>
          <dd>{bookingEntity.startTime ? <TextFormat value={bookingEntity.startTime} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="endTime">End Time</span>
          </dt>
          <dd>{bookingEntity.endTime ? <TextFormat value={bookingEntity.endTime} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="purpose">Purpose</span>
          </dt>
          <dd>{bookingEntity.purpose}</dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{bookingEntity.status}</dd>
          <dt>
            <span id="notes">Notes</span>
          </dt>
          <dd>{bookingEntity.notes}</dd>
          <dt>Compliance Record</dt>
          <dd>{bookingEntity.complianceRecord ? bookingEntity.complianceRecord.id : ''}</dd>
          <dt>User</dt>
          <dd>{bookingEntity.user ? bookingEntity.user.login : ''}</dd>
          <dt>Asset</dt>
          <dd>
            {bookingEntity.assets
              ? bookingEntity.assets.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.name}</a>
                    {bookingEntity.assets && i === bookingEntity.assets.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Room</dt>
          <dd>
            {bookingEntity.rooms
              ? bookingEntity.rooms.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.name}</a>
                    {bookingEntity.rooms && i === bookingEntity.rooms.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/booking" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Kembali</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/booking/${bookingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Ubah</span>
        </Button>
      </Col>
    </Row>
  );
};

export default BookingDetail;
