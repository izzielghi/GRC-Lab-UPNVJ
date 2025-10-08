import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useLocation } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { TextFormat, getPaginationState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities, reset } from './booking.reducer';

export const Booking = () => {
  const dispatch = useAppDispatch();
  const pageLocation = useLocation();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const bookingList = useAppSelector(state => state.booking.entities);
  const loading = useAppSelector(state => state.booking.loading);
  const links = useAppSelector(state => state.booking.links);
  const totalItems = useAppSelector(state => state.booking.totalItems);
  const updateSuccess = useAppSelector(state => state.booking.updateSuccess);

  // GANTI SEMUA KODE DARI SINI...
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
    setPaginationState(prevState => ({
      ...prevState,
      activePage: 1,
    }));
  };

  useEffect(() => {
    // Saat komponen pertama kali dimuat, reset semuanya.
    resetAll();
  }, []);

  useEffect(() => {
    // Setelah update berhasil (create/edit), reset semuanya.
    if (updateSuccess) {
      resetAll();
    }
  }, [updateSuccess]);

  useEffect(() => {
    // useEffect UTAMA: Ambil data setiap kali paginationState berubah.
    // Karena resetAll() mengubah paginationState, ini akan otomatis
    // mengambil data baru setelah reset.
    getAllEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  const handleLoadMore = () => {
    if ((window as any).pageYOffset > 0 && paginationState.activePage - 1 < links.next) {
      setPaginationState(prevState => ({
        ...prevState,
        activePage: prevState.activePage + 1,
      }));
    }
  };

  const sort = p => () => {
    dispatch(reset());
    setPaginationState(prevState => ({
      ...prevState,
      activePage: 1,
      order: prevState.order === ASC ? DESC : ASC,
      sort: p,
    }));
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
  // ...SAMPAI SEBELUM BARIS 'return ('

  // Kode 'return (...)' Anda tidak perlu diubah

  return (
    <div>
      <h2 id="booking-heading" data-cy="BookingHeading">
        Bookings
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/booking/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Buat Booking baru
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        <InfiniteScroll
          dataLength={bookingList ? bookingList.length : 0}
          next={handleLoadMore}
          hasMore={paginationState.activePage - 1 < links.next}
          loader={<div className="loader">Loading ...</div>}
        >
          {bookingList && bookingList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={sort('id')}>
                    ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                  </th>
                  <th className="hand" onClick={sort('startTime')}>
                    Start Time <FontAwesomeIcon icon={getSortIconByFieldName('startTime')} />
                  </th>
                  <th className="hand" onClick={sort('endTime')}>
                    End Time <FontAwesomeIcon icon={getSortIconByFieldName('endTime')} />
                  </th>
                  <th className="hand" onClick={sort('purpose')}>
                    Purpose <FontAwesomeIcon icon={getSortIconByFieldName('purpose')} />
                  </th>
                  <th className="hand" onClick={sort('status')}>
                    Status <FontAwesomeIcon icon={getSortIconByFieldName('status')} />
                  </th>
                  <th>
                    User <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    Room <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {bookingList.map((booking, i) => (
                  <tr key={`entity-${i}`} data-cy="entityTable">
                    <td>
                      <Button tag={Link} to={`/booking/${booking.id}`} color="link" size="sm">
                        {booking.id}
                      </Button>
                    </td>
                    <td>{booking.startTime ? <TextFormat type="date" value={booking.startTime} format={APP_DATE_FORMAT} /> : null}</td>
                    <td>{booking.endTime ? <TextFormat type="date" value={booking.endTime} format={APP_DATE_FORMAT} /> : null}</td>
                    <td>{booking.purpose}</td>
                    <td>{booking.status}</td>
                    <td>{booking.user ? booking.user.login : ''}</td>
                    <td>{booking.room ? <Link to={`/room/${booking.room.id}`}>{booking.room.name}</Link> : ''}</td>
                    <td className="text-end">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`/booking/${booking.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Lihat</span>
                        </Button>
                        <Button tag={Link} to={`/booking/${booking.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Ubah</span>
                        </Button>
                        <Button
                          onClick={() => (window.location.href = `/booking/${booking.id}/delete`)}
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
            !loading && <div className="alert alert-warning">No Bookings found</div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Booking;
