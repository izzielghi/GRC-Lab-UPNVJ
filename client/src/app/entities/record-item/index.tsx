import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import RecordItem from './record-item';
import RecordItemDetail from './record-item-detail';
import RecordItemUpdate from './record-item-update';
import RecordItemDeleteDialog from './record-item-delete-dialog';

const RecordItemRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<RecordItem />} />
    <Route path="new" element={<RecordItemUpdate />} />
    <Route path=":id">
      <Route index element={<RecordItemDetail />} />
      <Route path="edit" element={<RecordItemUpdate />} />
      <Route path="delete" element={<RecordItemDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default RecordItemRoutes;
