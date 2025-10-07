import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { deleteEntity, getEntity } from './compliance-checklist.reducer';

export const ComplianceChecklistDeleteDialog = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, []);

  const complianceChecklistEntity = useAppSelector(state => state.complianceChecklist.entity);
  const updateSuccess = useAppSelector(state => state.complianceChecklist.updateSuccess);

  const handleClose = () => {
    navigate('/compliance-checklist');
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(complianceChecklistEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="complianceChecklistDeleteDialogHeading">
        Konfirmasi proses penghapusan
      </ModalHeader>
      <ModalBody id="eLabApp.complianceChecklist.delete.question">
        Apakah anda yakin ingin menghapus Compliance Checklist {complianceChecklistEntity.id}?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Batal
        </Button>
        <Button id="jhi-confirm-delete-complianceChecklist" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Hapus
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ComplianceChecklistDeleteDialog;
