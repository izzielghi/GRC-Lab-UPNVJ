import React from 'react';
import { Route } from 'react-router';

import PrivateRoute from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Asset from './asset';
import UsageLog from './usage-log';
import MaintenanceRecord from './maintenance-record';
import Incident from './incident';
import SOP from './sop';
import ComplianceChecklist from './compliance-checklist';
import ChecklistItem from './checklist-item';
import Room from './room';
import Booking from './booking';
import ComplianceRecord from './compliance-record';
import RecordItem from './record-item';

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* ========================================================================= */}
        {/* 1. ROUTE YANG BOLEH DIAKSES SEMUA ORANG (ROLE_USER & ROLE_ADMIN) */}
        {/* ========================================================================= */}
        <Route path="asset/*" element={<Asset />} />
        <Route path="usage-log/*" element={<UsageLog />} />
        <Route path="incident/*" element={<Incident />} />
        <Route path="sop/*" element={<SOP />} />
        <Route path="compliance-checklist/*" element={<ComplianceChecklist />} />
        <Route path="room/*" element={<Room />} />
        {/* jhipster-needle-add-route-import - JHipster will add routes here */}
        {/* ========================================================================= */}
        {/* 2. ROUTE YANG HANYA BOLEH DIAKSES ADMIN (Manajemen Data Inti) */}
        {/* ========================================================================= */}
        <Route
          path="maintenance-record/*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
              <MaintenanceRecord />
            </PrivateRoute>
          }
        />
        <Route
          path="checklist-item/*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
              <ChecklistItem />
            </PrivateRoute>
          }
        />
        <Route path="maintenance-record/*" element={<MaintenanceRecord />} />
        <Route path="checklist-item/*" element={<ChecklistItem />} />
        <Route path="booking/*" element={<Booking />} />
        <Route path="compliance-record/*" element={<ComplianceRecord />} />
        <Route path="record-item/*" element={<RecordItem />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
