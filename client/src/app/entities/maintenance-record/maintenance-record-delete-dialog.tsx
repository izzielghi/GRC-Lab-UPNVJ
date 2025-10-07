import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { deleteEntity, getEntity } from './maintenance-record.reducer';

export const MaintenanceRecordDeleteDialog = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, []);

  const maintenanceRecordEntity = useAppSelector(state => state.maintenanceRecord.entity);
  const updateSuccess = useAppSelector(state => state.maintenanceRecord.updateSuccess);

  const handleClose = () => {
    navigate('/maintenance-record');
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(maintenanceRecordEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="maintenanceRecordDeleteDialogHeading">
        Konfirmasi proses penghapusan
      </ModalHeader>
      <ModalBody id="eLabApp.maintenanceRecord.delete.question">
        Apakah anda yakin ingin menghapus Maintenance Record {maintenanceRecordEntity.id}?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Batal
        </Button>
        <Button id="jhi-confirm-delete-maintenanceRecord" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Hapus
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default MaintenanceRecordDeleteDialog;
