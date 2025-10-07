import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './usage-log.reducer';

export const UsageLogDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const usageLogEntity = useAppSelector(state => state.usageLog.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="usageLogDetailsHeading">Usage Log</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{usageLogEntity.id}</dd>
          <dt>
            <span id="dateTime">Date Time</span>
          </dt>
          <dd>{usageLogEntity.dateTime ? <TextFormat value={usageLogEntity.dateTime} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="purpose">Purpose</span>
          </dt>
          <dd>{usageLogEntity.purpose}</dd>
          <dt>
            <span id="duration">Duration</span>
          </dt>
          <dd>{usageLogEntity.duration}</dd>
          <dt>User</dt>
          <dd>{usageLogEntity.user ? usageLogEntity.user.id : ''}</dd>
          <dt>Room</dt>
          <dd>{usageLogEntity.room ? usageLogEntity.room.id : ''}</dd>
          <dt>Asset</dt>
          <dd>{usageLogEntity.asset ? usageLogEntity.asset.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/usage-log" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Kembali</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/usage-log/${usageLogEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Ubah</span>
        </Button>
      </Col>
    </Row>
  );
};

export default UsageLogDetail;
