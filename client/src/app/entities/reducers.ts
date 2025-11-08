import asset from 'app/entities/asset/asset.reducer';
import maintenanceRecord from 'app/entities/maintenance-record/maintenance-record.reducer';
import incident from 'app/entities/incident/incident.reducer';
import sOP from 'app/entities/sop/sop.reducer';
import complianceChecklist from 'app/entities/compliance-checklist/compliance-checklist.reducer';
import checklistItem from 'app/entities/checklist-item/checklist-item.reducer';
import room from 'app/entities/room/room.reducer';
import booking from 'app/entities/booking/booking.reducer';
import complianceRecord from 'app/entities/compliance-record/compliance-record.reducer';
import recordItem from 'app/entities/record-item/record-item.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  asset,
  maintenanceRecord,
  incident,
  sOP,
  complianceChecklist,
  checklistItem,
  room,
  booking,
  complianceRecord,
  recordItem,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
