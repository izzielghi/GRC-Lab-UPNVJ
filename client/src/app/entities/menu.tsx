import React from 'react';

import MenuItem from 'app/shared/layout/menus/menu-item';

import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

const EntitiesMenu = (props: any) => {
  return (
    <>
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
      <MenuItem icon="asterisk" to="/room">
        Room
      </MenuItem>
      <MenuItem icon="asterisk" to="/asset">
        Asset
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
      <MenuItem icon="asterisk" to="/compliance-record">
        Compliance Record
      </MenuItem>
      <MenuItem icon="asterisk" to="/record-item">
        Record Item
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};
export default EntitiesMenu;
