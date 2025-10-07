import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ChecklistItem from './checklist-item';
import ChecklistItemDetail from './checklist-item-detail';
import ChecklistItemUpdate from './checklist-item-update';
import ChecklistItemDeleteDialog from './checklist-item-delete-dialog';

const ChecklistItemRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ChecklistItem />} />
    <Route path="new" element={<ChecklistItemUpdate />} />
    <Route path=":id">
      <Route index element={<ChecklistItemDetail />} />
      <Route path="edit" element={<ChecklistItemUpdate />} />
      <Route path="delete" element={<ChecklistItemDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ChecklistItemRoutes;
