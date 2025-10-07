import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ComplianceChecklist from './compliance-checklist';
import ComplianceChecklistDetail from './compliance-checklist-detail';
import ComplianceChecklistUpdate from './compliance-checklist-update';
import ComplianceChecklistDeleteDialog from './compliance-checklist-delete-dialog';

const ComplianceChecklistRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ComplianceChecklist />} />
    <Route path="new" element={<ComplianceChecklistUpdate />} />
    <Route path=":id">
      <Route index element={<ComplianceChecklistDetail />} />
      <Route path="edit" element={<ComplianceChecklistUpdate />} />
      <Route path="delete" element={<ComplianceChecklistDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ComplianceChecklistRoutes;
