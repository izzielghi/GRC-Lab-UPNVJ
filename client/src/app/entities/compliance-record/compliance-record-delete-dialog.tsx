import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { deleteEntity, getEntity } from './compliance-record.reducer';

export const ComplianceRecordDeleteDialog = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, []);

  const complianceRecordEntity = useAppSelector(state => state.complianceRecord.entity);
  const updateSuccess = useAppSelector(state => state.complianceRecord.updateSuccess);

  const handleClose = () => {
    navigate('/compliance-record');
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(complianceRecordEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="complianceRecordDeleteDialogHeading">
        Konfirmasi proses penghapusan
      </ModalHeader>
      <ModalBody id="eLabApp.complianceRecord.delete.question">
        Apakah anda yakin ingin menghapus Compliance Record {complianceRecordEntity.id}?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Batal
        </Button>
        <Button id="jhi-confirm-delete-complianceRecord" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Hapus
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ComplianceRecordDeleteDialog;
