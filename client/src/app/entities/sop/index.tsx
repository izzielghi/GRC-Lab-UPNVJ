import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import SOP from './sop';
import SOPDetail from './sop-detail';
import SOPUpdate from './sop-update';
import SOPDeleteDialog from './sop-delete-dialog';

const SOPRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<SOP />} />
    <Route path="new" element={<SOPUpdate />} />
    <Route path=":id">
      <Route index element={<SOPDetail />} />
      <Route path="edit" element={<SOPUpdate />} />
      <Route path="delete" element={<SOPDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SOPRoutes;
