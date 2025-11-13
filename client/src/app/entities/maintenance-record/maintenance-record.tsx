import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useLocation } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { TextFormat, getPaginationState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities, reset } from './maintenance-record.reducer';

export const MaintenanceRecord = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );
  const [sorting, setSorting] = useState(false);

  const maintenanceRecordList = useAppSelector(state => state.maintenanceRecord.entities);
  const loading = useAppSelector(state => state.maintenanceRecord.loading);
  const links = useAppSelector(state => state.maintenanceRecord.links);
  const updateSuccess = useAppSelector(state => state.maintenanceRecord.updateSuccess);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  const resetAll = () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({}));
  };

  useEffect(() => {
    resetAll();
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      resetAll();
    }
  }, [updateSuccess]);

  useEffect(() => {
    getAllEntities();
  }, [paginationState.activePage]);

  const handleLoadMore = () => {
    if ((window as any).pageYOffset > 0) {
      setPaginationState({
        ...paginationState,
        activePage: paginationState.activePage + 1,
      });
    }
  };

  useEffect(() => {
    if (sorting) {
      getAllEntities();
      setSorting(false);
    }
  }, [sorting]);

  const sort = p => () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
    setSorting(true);
  };

  const handleSyncList = () => {
    resetAll();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const order = paginationState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    }
    return order === ASC ? faSortUp : faSortDown;
  };

  return (
    <div>
      <h2 id="maintenance-record-heading" data-cy="MaintenanceRecordHeading">
        Maintenance Records
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/maintenance-record/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Buat Maintenance Record baru
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        <InfiniteScroll
          dataLength={maintenanceRecordList ? maintenanceRecordList.length : 0}
          next={handleLoadMore}
          hasMore={paginationState.activePage - 1 < links.next}
          loader={<div className="loader">Loading ...</div>}
        >
          {maintenanceRecordList && maintenanceRecordList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={sort('id')}>
                    ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                  </th>
                  <th className="hand" onClick={sort('date')}>
                    Date <FontAwesomeIcon icon={getSortIconByFieldName('date')} />
                  </th>
                  <th className="hand" onClick={sort('description')}>
                    Description <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                  </th>
                  <th className="hand" onClick={sort('cost')}>
                    Cost <FontAwesomeIcon icon={getSortIconByFieldName('cost')} />
                  </th>
                  <th className="hand" onClick={sort('nextServiceDate')}>
                    Next Service Date <FontAwesomeIcon icon={getSortIconByFieldName('nextServiceDate')} />
                  </th>
                  <th>
                    Maintainer <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    Asset <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {maintenanceRecordList.map((maintenanceRecord, i) => (
                  <tr key={`entity-${i}`} data-cy="entityTable">
                    <td>{maintenanceRecord.id}</td>
                    <td>
                      {maintenanceRecord.date ? (
                        <TextFormat type="date" value={maintenanceRecord.date} format={APP_LOCAL_DATE_FORMAT} />
                      ) : null}
                    </td>
                    <td>{maintenanceRecord.description}</td>
                    <td>
                      {maintenanceRecord.cost
                        ? Number(maintenanceRecord.cost).toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })
                        : ''}
                    </td>
                    <td>
                      {maintenanceRecord.nextServiceDate ? (
                        <TextFormat type="date" value={maintenanceRecord.nextServiceDate} format={APP_LOCAL_DATE_FORMAT} />
                      ) : null}
                    </td>
                    <td>{maintenanceRecord.maintainer ? maintenanceRecord.maintainer.login : ''}</td>
                    <td>{maintenanceRecord.asset ? maintenanceRecord.asset.name : ''}</td>
                    <td className="text-end">
                      <div className="btn-group flex-btn-group-container">
                        <Button
                          tag={Link}
                          to={`/maintenance-record/${maintenanceRecord.id}`}
                          color="info"
                          size="sm"
                          data-cy="entityDetailsButton"
                        >
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Lihat</span>
                        </Button>
                        <Button
                          tag={Link}
                          to={`/maintenance-record/${maintenanceRecord.id}/edit`}
                          color="primary"
                          size="sm"
                          data-cy="entityEditButton"
                        >
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Ubah</span>
                        </Button>
                        <Button
                          onClick={() => (window.location.href = `/maintenance-record/${maintenanceRecord.id}/delete`)}
                          color="danger"
                          size="sm"
                          data-cy="entityDeleteButton"
                        >
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Hapus</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !loading && <div className="alert alert-warning">No Maintenance Records found</div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default MaintenanceRecord;
