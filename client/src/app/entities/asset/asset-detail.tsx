import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './asset.reducer';

export const AssetDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();
  const account = useAppSelector(state => state.authentication.account);
  const isAdmin = account?.authorities?.includes('ROLE_ADMIN');

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const assetEntity = useAppSelector(state => state.asset.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="assetDetailsHeading">Asset</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{assetEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{assetEntity.name}</dd>
          <dt>
            <span id="code">Code</span>
          </dt>
          <dd>{assetEntity.code}</dd>
          <dt>
            <span id="location">Location</span>
          </dt>
          <dd>{assetEntity.location}</dd>
          <dt>
            <span id="condition">Condition</span>
          </dt>
          <dd>{assetEntity.condition}</dd>
          <dt>
            <span id="purchaseDate">Purchase Date</span>
          </dt>
          <dd>
            {assetEntity.purchaseDate ? <TextFormat value={assetEntity.purchaseDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="warrantyEndDate">Warranty End Date</span>
          </dt>
          <dd>
            {assetEntity.warrantyEndDate ? (
              <TextFormat value={assetEntity.warrantyEndDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>S OP</dt>
          <dd>
            {assetEntity.sOPS
              ? assetEntity.sOPS.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {assetEntity.sOPS && i === assetEntity.sOPS.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/asset" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Kembali</span>
        </Button>
        &nbsp;
        {isAdmin && (
          <Button tag={Link} to={`/asset/${assetEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Ubah</span>
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default AssetDetail;
