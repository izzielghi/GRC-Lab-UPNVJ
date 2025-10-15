import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './compliance-checklist.reducer';
import axios from 'axios';

export const ComplianceChecklistDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  const [checklistItems, setChecklistItems] = useState([]);

  // 2. Gunakan 'useEffect' untuk mengambil data saat komponen dimuat
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`/api/compliance-checklists/${id}/items`);
        setChecklistItems(response.data);
      } catch (error) {
        console.error('Gagal mengambil checklist items:', error);
      }
    };

    // Panggil fungsi di atas
    fetchItems();
  }, [id]); // Jalankan setiap kali ID berubah

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const complianceChecklistEntity = useAppSelector(state => state.complianceChecklist.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="complianceChecklistDetailsHeading">Compliance Checklist</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{complianceChecklistEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{complianceChecklistEntity.name}</dd>
          <dt>
            <span id="dateTime">Date Time</span>
          </dt>
          <dd>
            {complianceChecklistEntity.dateTime ? (
              <TextFormat value={complianceChecklistEntity.dateTime} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="isCompleted">Is Completed</span>
          </dt>
          <dd>{complianceChecklistEntity.isCompleted ? 'true' : 'false'}</dd>
        </dl>
        <hr />
        <h4>Daftar Item Checklist</h4>
        {checklistItems && checklistItems.length > 0 ? (
          <ul className="list-group mb-4">
            {checklistItems.map((item, i) => (
              <li key={`item-${i}`} className="list-group-item d-flex justify-content-between align-items-center">
                {item.description}
                <span className={`badge bg-${item.isCompliant ? 'success' : 'danger'} rounded-pill`}>
                  {item.isCompliant ? 'Sesuai' : 'Tidak Sesuai'}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="alert alert-info">Belum ada item yang ditambahkan untuk checklist ini.</div>
        )}
        <Button tag={Link} to="/compliance-checklist" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Kembali</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/compliance-checklist/${complianceChecklistEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Ubah</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ComplianceChecklistDetail;
