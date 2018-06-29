import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITimeSlot } from 'app/shared/model/time-slot.model';
import { TimeSlotService } from './time-slot.service';

@Component({
    selector: 'jhi-time-slot-delete-dialog',
    templateUrl: './time-slot-delete-dialog.component.html'
})
export class TimeSlotDeleteDialogComponent {
    timeSlot: ITimeSlot;

    constructor(private timeSlotService: TimeSlotService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.timeSlotService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'timeSlotListModification',
                content: 'Deleted an timeSlot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-time-slot-delete-popup',
    template: ''
})
export class TimeSlotDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ timeSlot }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TimeSlotDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.timeSlot = timeSlot;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
