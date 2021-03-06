import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils } from 'ng-jhipster';

import { IHotel } from 'app/shared/model/hotel.model';
import { HotelService } from './hotel.service';

@Component({
    selector: 'jhi-hotel-update',
    templateUrl: './hotel-update.component.html'
})
export class HotelUpdateComponent implements OnInit {
    private _hotel: IHotel;
    isSaving: boolean;
    openTime: string;
    closeTime: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private hotelService: HotelService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ hotel }) => {
            this.hotel = hotel;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.hotel, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.hotel.openTime = moment(this.openTime, DATE_TIME_FORMAT);
        this.hotel.closeTime = moment(this.closeTime, DATE_TIME_FORMAT);
        if (this.hotel.id !== undefined) {
            this.subscribeToSaveResponse(this.hotelService.update(this.hotel));
        } else {
            this.subscribeToSaveResponse(this.hotelService.create(this.hotel));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHotel>>) {
        result.subscribe((res: HttpResponse<IHotel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get hotel() {
        return this._hotel;
    }

    set hotel(hotel: IHotel) {
        this._hotel = hotel;
        this.openTime = moment(hotel.openTime).format(DATE_TIME_FORMAT);
        this.closeTime = moment(hotel.closeTime).format(DATE_TIME_FORMAT);
    }
}
