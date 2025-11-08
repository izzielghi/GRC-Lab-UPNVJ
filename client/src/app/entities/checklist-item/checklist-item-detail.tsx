import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './checklist-item.reducer';

export const ChecklistItemDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const checklistItemEntity = useAppSelector(state => state.checklistItem.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="checklistItemDetailsHeading">Checklist Item</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{checklistItemEntity.id}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{checklistItemEntity.description}</dd>
          <dt>Checklist</dt>
          <dd>{checklistItemEntity.checklist ? checklistItemEntity.checklist.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/checklist-item" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Kembali</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/checklist-item/${checklistItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Ubah</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ChecklistItemDetail;
