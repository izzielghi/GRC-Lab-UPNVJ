import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './compliance-record.reducer';

export const ComplianceRecordDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const complianceRecordEntity = useAppSelector(state => state.complianceRecord.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="complianceRecordDetailsHeading">Compliance Record</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{complianceRecordEntity.id}</dd>
          <dt>
            <span id="dateTime">Date Time</span>
          </dt>
          <dd>
            {complianceRecordEntity.dateTime ? (
              <TextFormat value={complianceRecordEntity.dateTime} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="isCompleted">Is Completed</span>
          </dt>
          <dd>{complianceRecordEntity.isCompleted ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/compliance-record" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Kembali</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/compliance-record/${complianceRecordEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Ubah</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ComplianceRecordDetail;
