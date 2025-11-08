import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './record-item.reducer';

export const RecordItemDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const recordItemEntity = useAppSelector(state => state.recordItem.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="recordItemDetailsHeading">Record Item</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{recordItemEntity.id}</dd>
          <dt>
            <span id="isCompliant">Is Compliant</span>
          </dt>
          <dd>{recordItemEntity.isCompliant ? 'true' : 'false'}</dd>
          <dt>Item</dt>
          <dd>{recordItemEntity.item ? recordItemEntity.item.description : ''}</dd>
          <dt>Record</dt>
          <dd>{recordItemEntity.record ? recordItemEntity.record.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/record-item" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Kembali</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/record-item/${recordItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Ubah</span>
        </Button>
      </Col>
    </Row>
  );
};

export default RecordItemDetail;
