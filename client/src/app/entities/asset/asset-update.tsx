import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getSOPS } from 'app/entities/sop/sop.reducer';
import { AssetCondition } from 'app/shared/model/enumerations/asset-condition.model';
import { createEntity, getEntity, updateEntity } from './asset.reducer';

export const AssetUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const sOPS = useAppSelector(state => state.sOP.entities);
  const assetEntity = useAppSelector(state => state.asset.entity);
  const loading = useAppSelector(state => state.asset.loading);
  const updating = useAppSelector(state => state.asset.updating);
  const updateSuccess = useAppSelector(state => state.asset.updateSuccess);
  const assetConditionValues = Object.keys(AssetCondition);

  const handleClose = () => {
    navigate('/asset');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }

    dispatch(getSOPS({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }

    const entity = {
      ...assetEntity,
      ...values,
      sOPS: mapIdList(values.sOPS),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          condition: 'GOOD',
          ...assetEntity,
          sOPS: assetEntity?.sOPS?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="eLabApp.asset.home.createOrEditLabel" data-cy="AssetCreateUpdateHeading">
            Buat atau edit Asset
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="asset-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Name"
                id="asset-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: 'Inputan ini diperlukan.' },
                }}
              />
              <ValidatedField
                label="Code"
                id="asset-code"
                name="code"
                data-cy="code"
                type="text"
                validate={{
                  required: { value: true, message: 'Inputan ini diperlukan.' },
                }}
              />
              <ValidatedField label="Location" id="asset-location" name="location" data-cy="location" type="text" />
              <ValidatedField label="Condition" id="asset-condition" name="condition" data-cy="condition" type="select">
                {assetConditionValues.map(assetCondition => (
                  <option value={assetCondition} key={assetCondition}>
                    {assetCondition}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label="Purchase Date" id="asset-purchaseDate" name="purchaseDate" data-cy="purchaseDate" type="date" />
              <ValidatedField
                label="Warranty End Date"
                id="asset-warrantyEndDate"
                name="warrantyEndDate"
                data-cy="warrantyEndDate"
                type="date"
              />
              <ValidatedField label="S OP" id="asset-sOP" data-cy="sOP" type="select" multiple name="sOPS">
                <option value="" key="0" />
                {sOPS
                  ? sOPS.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/asset" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Kembali</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Simpan
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AssetUpdate;
