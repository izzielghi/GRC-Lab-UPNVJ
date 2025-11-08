import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ComplianceRecord from './compliance-record';
import ComplianceRecordDetail from './compliance-record-detail';
import ComplianceRecordUpdate from './compliance-record-update';
import ComplianceRecordDeleteDialog from './compliance-record-delete-dialog';

const ComplianceRecordRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ComplianceRecord />} />
    <Route path="new" element={<ComplianceRecordUpdate />} />
    <Route path=":id">
      <Route index element={<ComplianceRecordDetail />} />
      <Route path="edit" element={<ComplianceRecordUpdate />} />
      <Route path="delete" element={<ComplianceRecordDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ComplianceRecordRoutes;
