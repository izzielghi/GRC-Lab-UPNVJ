import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, FormText, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getChecklistItems } from 'app/entities/checklist-item/checklist-item.reducer';
import { getEntities as getComplianceRecords } from 'app/entities/compliance-record/compliance-record.reducer';
import { createEntity, getEntity, updateEntity } from './record-item.reducer';

export const RecordItemUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const checklistItems = useAppSelector(state => state.checklistItem.entities);
  const complianceRecords = useAppSelector(state => state.complianceRecord.entities);
  const recordItemEntity = useAppSelector(state => state.recordItem.entity);
  const loading = useAppSelector(state => state.recordItem.loading);
  const updating = useAppSelector(state => state.recordItem.updating);
  const updateSuccess = useAppSelector(state => state.recordItem.updateSuccess);

  const handleClose = () => {
    navigate('/record-item');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }

    dispatch(getChecklistItems({}));
    dispatch(getComplianceRecords({}));
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
      ...recordItemEntity,
      ...values,
      item: checklistItems.find(it => it.id.toString() === values.item?.toString()),
      record: complianceRecords.find(it => it.id.toString() === values.record?.toString()),
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
          ...recordItemEntity,
          item: recordItemEntity?.item?.id,
          record: recordItemEntity?.record?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="eLabApp.recordItem.home.createOrEditLabel" data-cy="RecordItemCreateUpdateHeading">
            Buat atau edit Record Item
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="record-item-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Is Compliant"
                id="record-item-isCompliant"
                name="isCompliant"
                data-cy="isCompliant"
                check
                type="checkbox"
              />
              <ValidatedField id="record-item-item" name="item" data-cy="item" label="Item" type="select" required>
                <option value="" key="0" />
                {checklistItems
                  ? checklistItems.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.description}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>Inputan ini diperlukan.</FormText>
              <ValidatedField id="record-item-record" name="record" data-cy="record" label="Record" type="select" required>
                <option value="" key="0" />
                {complianceRecords
                  ? complianceRecords.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>Inputan ini diperlukan.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/record-item" replace color="info">
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

export default RecordItemUpdate;
