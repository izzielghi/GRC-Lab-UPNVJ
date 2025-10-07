import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, FormText, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getComplianceChecklists } from 'app/entities/compliance-checklist/compliance-checklist.reducer';
import { createEntity, getEntity, updateEntity } from './checklist-item.reducer';

export const ChecklistItemUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const complianceChecklists = useAppSelector(state => state.complianceChecklist.entities);
  const checklistItemEntity = useAppSelector(state => state.checklistItem.entity);
  const loading = useAppSelector(state => state.checklistItem.loading);
  const updating = useAppSelector(state => state.checklistItem.updating);
  const updateSuccess = useAppSelector(state => state.checklistItem.updateSuccess);

  const handleClose = () => {
    navigate('/checklist-item');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }

    dispatch(getComplianceChecklists({}));
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
      ...checklistItemEntity,
      ...values,
      checklist: complianceChecklists.find(it => it.id.toString() === values.checklist?.toString()),
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
          ...checklistItemEntity,
          checklist: checklistItemEntity?.checklist?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="eLabApp.checklistItem.home.createOrEditLabel" data-cy="ChecklistItemCreateUpdateHeading">
            Buat atau edit Checklist Item
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="checklist-item-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Description"
                id="checklist-item-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  required: { value: true, message: 'Inputan ini diperlukan.' },
                }}
              />
              <ValidatedField
                label="Is Compliant"
                id="checklist-item-isCompliant"
                name="isCompliant"
                data-cy="isCompliant"
                check
                type="checkbox"
              />
              <ValidatedField id="checklist-item-checklist" name="checklist" data-cy="checklist" label="Checklist" type="select" required>
                <option value="" key="0" />
                {complianceChecklists
                  ? complianceChecklists.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>Inputan ini diperlukan.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/checklist-item" replace color="info">
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

export default ChecklistItemUpdate;
