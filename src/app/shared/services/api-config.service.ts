import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";

@Injectable({
    providedIn: 'root'
})
export class ApiConfigService {

    private readonly API_BASE = environment.API_ROOT;
    private readonly API_BASE_AUTH = `${this.API_BASE}/auth-identity/v1`;
    private readonly API_BASE_HOTEL = `${this.API_BASE}/hotel/v1`;
    public readonly API_BASE_REVIEWS = `${this.API_BASE}/reviews/v1`;

    
    
    public readonly API_AUTH = `${this.API_BASE_AUTH}/auth`;
    
    // Hotel endpoints
    public readonly API_HOTEL = `${this.API_BASE_HOTEL}/hotels`;
    public readonly API_HOTEL_ROOMS = `${this.API_BASE_HOTEL}/rooms`;
    public readonly API_HOTEL_RESERVATIONS = `${this.API_BASE_HOTEL}/reservations`;

    // reviews
    public readonly API_REVIEWS = `${this.API_BASE_REVIEWS}/reviews`;
    public readonly API_REVIEWS_HOTEL = `${this.API_REVIEWS}/hotel`;
    

    
}