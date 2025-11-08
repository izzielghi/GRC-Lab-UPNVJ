import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './sop.reducer';

export const SOPDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const sOPEntity = useAppSelector(state => state.sOP.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="sOPDetailsHeading">SOP</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{sOPEntity.id}</dd>
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{sOPEntity.title}</dd>
          <dt>
            <span id="documentPath">Document Path</span>
          </dt>
          <dd>{sOPEntity.documentPath}</dd>
          <dt>
            <span id="version">Version</span>
          </dt>
          <dd>{sOPEntity.version}</dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{sOPEntity.status}</dd>
        </dl>
        <Button tag={Link} to="/sop" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Kembali</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/sop/${sOPEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Ubah</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SOPDetail;
