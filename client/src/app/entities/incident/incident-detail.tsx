import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './incident.reducer';

export const IncidentDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const incidentEntity = useAppSelector(state => state.incident.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="incidentDetailsHeading">Incident</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{incidentEntity.id}</dd>
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{incidentEntity.title}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{incidentEntity.description}</dd>
          <dt>
            <span id="type">Type</span>
          </dt>
          <dd>{incidentEntity.type}</dd>
          <dt>
            <span id="date">Date</span>
          </dt>
          <dd>{incidentEntity.date ? <TextFormat value={incidentEntity.date} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="mitigationAction">Mitigation Action</span>
          </dt>
          <dd>{incidentEntity.mitigationAction}</dd>
          <dt>User</dt>
          <dd>{incidentEntity.user ? incidentEntity.user.id : ''}</dd>
          <dt>Asset</dt>
          <dd>{incidentEntity.asset ? incidentEntity.asset.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/incident" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Kembali</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/incident/${incidentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Ubah</span>
        </Button>
      </Col>
    </Row>
  );
};

export default IncidentDetail;
