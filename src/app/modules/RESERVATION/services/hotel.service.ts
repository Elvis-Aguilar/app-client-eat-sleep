import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.interface';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  

  private readonly apiConfigService = inject(ApiConfigService);
  private readonly _http = inject(HttpClient);
  private readonly API_HOTEL = this.apiConfigService.API_HOTEL;

  constructor() { }


  getAllHotels(): Observable<Hotel[]> {
    return this._http.get<Hotel[]>(`${this.API_HOTEL}`);
  }

}
