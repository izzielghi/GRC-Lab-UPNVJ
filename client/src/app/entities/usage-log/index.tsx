import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import UsageLog from './usage-log';
import UsageLogDetail from './usage-log-detail';
import UsageLogUpdate from './usage-log-update';
import UsageLogDeleteDialog from './usage-log-delete-dialog';

const UsageLogRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<UsageLog />} />
    <Route path="new" element={<UsageLogUpdate />} />
    <Route path=":id">
      <Route index element={<UsageLogDetail />} />
      <Route path="edit" element={<UsageLogUpdate />} />
      <Route path="delete" element={<UsageLogDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default UsageLogRoutes;
