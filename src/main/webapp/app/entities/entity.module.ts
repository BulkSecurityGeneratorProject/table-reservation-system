import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TableReservationHotelTableModule } from './hotel-table/hotel-table.module';
import { TableReservationHotelModule } from './hotel/hotel.module';
import { TableReservationStaffModule } from './staff/staff.module';
import { TableReservationBookingModule } from './booking/booking.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [

        TableReservationHotelTableModule,
        TableReservationHotelModule,
        TableReservationStaffModule,
        TableReservationBookingModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TableReservationEntityModule {}
