import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getSOPS } from 'app/entities/sop/sop.reducer';
import { createEntity, getEntity, updateEntity } from './compliance-checklist.reducer';

export const ComplianceChecklistUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const sOPS = useAppSelector(state => state.sOP.entities);
  const complianceChecklistEntity = useAppSelector(state => state.complianceChecklist.entity);
  const loading = useAppSelector(state => state.complianceChecklist.loading);
  const updating = useAppSelector(state => state.complianceChecklist.updating);
  const updateSuccess = useAppSelector(state => state.complianceChecklist.updateSuccess);

  const handleClose = () => {
    navigate('/compliance-checklist');
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
      ...complianceChecklistEntity,
      ...values,
      sop: sOPS.find(it => it.id.toString() === values.sop?.toString()),
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
          ...complianceChecklistEntity,
          sop: complianceChecklistEntity?.sop?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="eLabApp.complianceChecklist.home.createOrEditLabel" data-cy="ComplianceChecklistCreateUpdateHeading">
            Buat atau edit Compliance Checklist
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
                <ValidatedField name="id" required readOnly id="compliance-checklist-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Name"
                id="compliance-checklist-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: 'Inputan ini diperlukan.' },
                }}
              />
              <ValidatedField
                label="Description"
                id="compliance-checklist-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField id="compliance-checklist-sop" name="sop" data-cy="sop" label="Sop" type="select">
                <option value="" key="0" />
                {sOPS
                  ? sOPS.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.title}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/compliance-checklist" replace color="info">
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

export default ComplianceChecklistUpdate;
