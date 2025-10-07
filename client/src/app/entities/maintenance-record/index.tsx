import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import MaintenanceRecord from './maintenance-record';
import MaintenanceRecordDetail from './maintenance-record-detail';
import MaintenanceRecordUpdate from './maintenance-record-update';
import MaintenanceRecordDeleteDialog from './maintenance-record-delete-dialog';

const MaintenanceRecordRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<MaintenanceRecord />} />
    <Route path="new" element={<MaintenanceRecordUpdate />} />
    <Route path=":id">
      <Route index element={<MaintenanceRecordDetail />} />
      <Route path="edit" element={<MaintenanceRecordUpdate />} />
      <Route path="delete" element={<MaintenanceRecordDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default MaintenanceRecordRoutes;
