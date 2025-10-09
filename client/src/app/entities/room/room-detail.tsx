import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './room.reducer';

export const RoomDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();
  const account = useAppSelector(state => state.authentication.account);
  const isAdmin = account?.authorities?.includes('ROLE_ADMIN');

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const roomEntity = useAppSelector(state => state.room.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="roomDetailsHeading">Room</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{roomEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{roomEntity.name}</dd>
          <dt>
            <span id="code">Code</span>
          </dt>
          <dd>{roomEntity.code}</dd>
          <dt>
            <span id="capacity">Capacity</span>
          </dt>
          <dd>{roomEntity.capacity}</dd>
          <dt>
            <span id="locationDetails">Location Details</span>
          </dt>
          <dd>{roomEntity.locationDetails}</dd>
        </dl>
        <Button tag={Link} to="/room" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Kembali</span>
        </Button>
        &nbsp;
        {isAdmin && (
          <Button tag={Link} to={`/room/${roomEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Ubah</span>
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default RoomDetail;
