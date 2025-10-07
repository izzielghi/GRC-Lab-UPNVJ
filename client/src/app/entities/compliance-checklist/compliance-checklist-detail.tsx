import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './compliance-checklist.reducer';

export const ComplianceChecklistDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const complianceChecklistEntity = useAppSelector(state => state.complianceChecklist.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="complianceChecklistDetailsHeading">Compliance Checklist</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{complianceChecklistEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{complianceChecklistEntity.name}</dd>
          <dt>
            <span id="dateTime">Date Time</span>
          </dt>
          <dd>
            {complianceChecklistEntity.dateTime ? (
              <TextFormat value={complianceChecklistEntity.dateTime} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="isCompleted">Is Completed</span>
          </dt>
          <dd>{complianceChecklistEntity.isCompleted ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/compliance-checklist" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Kembali</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/compliance-checklist/${complianceChecklistEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Ubah</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ComplianceChecklistDetail;
