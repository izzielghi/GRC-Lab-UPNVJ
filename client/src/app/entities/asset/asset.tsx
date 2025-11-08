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

import { getEntities, reset } from './asset.reducer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

export const Asset = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );
  const [sorting, setSorting] = useState(false);

  const assetList = useAppSelector(state => state.asset.entities);
  const loading = useAppSelector(state => state.asset.loading);
  const links = useAppSelector(state => state.asset.links);
  const updateSuccess = useAppSelector(state => state.asset.updateSuccess);

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

  const authorities = useAppSelector(state => state.authentication.account.authorities);

  return (
    <div>
      <h2 id="asset-heading" data-cy="AssetHeading">
        Assets
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          {hasAnyAuthority(authorities, ['ROLE_ADMIN']) && (
            <Link to="/asset/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
              <FontAwesomeIcon icon="plus" />
              &nbsp; Buat Asset baru
            </Link>
          )}
        </div>
      </h2>
      <div className="table-responsive">
        <InfiniteScroll
          dataLength={assetList ? assetList.length : 0}
          next={handleLoadMore}
          hasMore={paginationState.activePage - 1 < links.next}
          loader={<div className="loader">Loading ...</div>}
        >
          {assetList && assetList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={sort('id')}>
                    ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                  </th>
                  <th className="hand" onClick={sort('name')}>
                    Name <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
                  </th>
                  <th className="hand" onClick={sort('code')}>
                    Code <FontAwesomeIcon icon={getSortIconByFieldName('code')} />
                  </th>
                  <th className="hand" onClick={sort('condition')}>
                    Condition <FontAwesomeIcon icon={getSortIconByFieldName('condition')} />
                  </th>
                  <th className="hand" onClick={sort('purchaseDate')}>
                    Purchase Date <FontAwesomeIcon icon={getSortIconByFieldName('purchaseDate')} />
                  </th>
                  <th className="hand" onClick={sort('warrantyEndDate')}>
                    Warranty End Date <FontAwesomeIcon icon={getSortIconByFieldName('warrantyEndDate')} />
                  </th>
                  <th className="hand" onClick={sort('description')}>
                    Description <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                  </th>
                  <th>
                    Location <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {assetList.map((asset, i) => (
                  <tr key={`entity-${i}`} data-cy="entityTable">
                    <td>{asset.id}</td>
                    <td>{asset.name}</td>
                    <td>{asset.code}</td>
                    <td>{asset.condition}</td>
                    <td>
                      {asset.purchaseDate ? <TextFormat type="date" value={asset.purchaseDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                    </td>
                    <td>
                      {asset.warrantyEndDate ? (
                        <TextFormat type="date" value={asset.warrantyEndDate} format={APP_LOCAL_DATE_FORMAT} />
                      ) : null}
                    </td>
                    <td>{asset.description}</td>
                    <td>{asset.location ? <Link to={`/room/${asset.location.id}`}>{asset.location.name}</Link> : ''}</td>
                    <td className="text-end">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`/asset/${asset.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Lihat</span>
                        </Button>
                        {hasAnyAuthority(authorities, ['ROLE_ADMIN']) && (
                          <Button tag={Link} to={`/asset/${asset.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Ubah</span>
                          </Button>
                        )}
                        {hasAnyAuthority(authorities, ['ROLE_ADMIN']) && (
                          <Button
                            onClick={() => (window.location.href = `/asset/${asset.id}/delete`)}
                            color="danger"
                            size="sm"
                            data-cy="entityDeleteButton"
                          >
                            <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Hapus</span>
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !loading && <div className="alert alert-warning">No Assets found</div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Asset;
