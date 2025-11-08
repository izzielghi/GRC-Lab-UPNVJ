import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './maintenance-record.reducer';

export const MaintenanceRecordDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const maintenanceRecordEntity = useAppSelector(state => state.maintenanceRecord.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="maintenanceRecordDetailsHeading">Maintenance Record</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{maintenanceRecordEntity.id}</dd>
          <dt>
            <span id="date">Date</span>
          </dt>
          <dd>
            {maintenanceRecordEntity.date ? (
              <TextFormat value={maintenanceRecordEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{maintenanceRecordEntity.description}</dd>
          <dt>
            <span id="cost">Cost</span>
          </dt>
          <dd>{maintenanceRecordEntity.cost}</dd>
          <dt>
            <span id="nextServiceDate">Next Service Date</span>
          </dt>
          <dd>
            {maintenanceRecordEntity.nextServiceDate ? (
              <TextFormat value={maintenanceRecordEntity.nextServiceDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>Maintainer</dt>
          <dd>{maintenanceRecordEntity.maintainer ? maintenanceRecordEntity.maintainer.login : ''}</dd>
          <dt>Asset</dt>
          <dd>{maintenanceRecordEntity.asset ? maintenanceRecordEntity.asset.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/maintenance-record" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Kembali</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/maintenance-record/${maintenanceRecordEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Ubah</span>
        </Button>
      </Col>
    </Row>
  );
};

export default MaintenanceRecordDetail;
