import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { deleteEntity, getEntity } from './checklist-item.reducer';

export const ChecklistItemDeleteDialog = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, []);

  const checklistItemEntity = useAppSelector(state => state.checklistItem.entity);
  const updateSuccess = useAppSelector(state => state.checklistItem.updateSuccess);

  const handleClose = () => {
    navigate('/checklist-item');
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(checklistItemEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="checklistItemDeleteDialogHeading">
        Konfirmasi proses penghapusan
      </ModalHeader>
      <ModalBody id="eLabApp.checklistItem.delete.question">
        Apakah anda yakin ingin menghapus Checklist Item {checklistItemEntity.id}?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Batal
        </Button>
        <Button id="jhi-confirm-delete-checklistItem" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Hapus
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ChecklistItemDeleteDialog;
