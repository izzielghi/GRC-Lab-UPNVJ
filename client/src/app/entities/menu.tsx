import React from 'react';

import MenuItem from 'app/shared/layout/menus/menu-item';

import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

const EntitiesMenu = (props: any) => {
  return (
    <>
      {/* ========================================================= */}
      {/* 1. FITUR UTAMA MAHASISWA (ROLE_USER) */}
      {/* ========================================================= */}
      {/* Menu yang boleh diakses semua ROLE_USER (Mahasiswa/Teknisi) */}
      <MenuItem icon="plus-circle" to="/usage-log">
        Peminjaman Alat & Ruang Lab {/* Ubah label agar lebih jelas */}
      </MenuItem>
      <MenuItem icon="plus-circle" to="/incident">
        Pelaporan Insiden
      </MenuItem>
      <MenuItem icon="list" to="/compliance-checklist">
        Checklist Kepatuhan
      </MenuItem>
      <MenuItem icon="book" to="/sop">
        Dokumentasi SOP
      </MenuItem>
      <MenuItem icon="database" to="/asset">
        Informasi Aset
      </MenuItem>
      <MenuItem icon="asterisk" to="/room">
        Room
      </MenuItem>

      {/* ========================================================= */}
      {/* 2. FITUR ADMINISTRASI/MANAJEMEN (Hanya ROLE_ADMIN) */}
      {/* ========================================================= */}
      {hasAnyAuthority(props.isAuthenticated, [AUTHORITIES.ADMIN]) && (
        <>
          <MenuItem icon="tools" to="/maintenance-record">
            Maintenance Record
          </MenuItem>
          {/* Biasanya Checklist Item adalah detail yang hanya dilihat admin/teknisi */}
          <MenuItem icon="check-square" to="/checklist-item">
            Checklist Item Detail
          </MenuItem>
        </>
      )}
      <MenuItem icon="asterisk" to="/asset">
        Asset
      </MenuItem>
      <MenuItem icon="asterisk" to="/usage-log">
        Usage Log
      </MenuItem>
      <MenuItem icon="asterisk" to="/maintenance-record">
        Maintenance Record
      </MenuItem>
      <MenuItem icon="asterisk" to="/incident">
        Incident
      </MenuItem>
      <MenuItem icon="asterisk" to="/sop">
        SOP
      </MenuItem>
      <MenuItem icon="asterisk" to="/compliance-checklist">
        Compliance Checklist
      </MenuItem>
      <MenuItem icon="asterisk" to="/checklist-item">
        Checklist Item
      </MenuItem>
      <MenuItem icon="asterisk" to="/booking">
        Booking
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};
export default EntitiesMenu;
