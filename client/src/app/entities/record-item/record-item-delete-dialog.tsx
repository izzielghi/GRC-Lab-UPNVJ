import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { deleteEntity, getEntity } from './record-item.reducer';

export const RecordItemDeleteDialog = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, []);

  const recordItemEntity = useAppSelector(state => state.recordItem.entity);
  const updateSuccess = useAppSelector(state => state.recordItem.updateSuccess);

  const handleClose = () => {
    navigate('/record-item');
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(recordItemEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="recordItemDeleteDialogHeading">
        Konfirmasi proses penghapusan
      </ModalHeader>
      <ModalBody id="eLabApp.recordItem.delete.question">Apakah anda yakin ingin menghapus Record Item {recordItemEntity.id}?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Batal
        </Button>
        <Button id="jhi-confirm-delete-recordItem" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Hapus
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default RecordItemDeleteDialog;
