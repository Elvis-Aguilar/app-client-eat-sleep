import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UrlsUtils } from '@shared/utils/urls';
import { Hotel } from 'app/modules/RESERVATION/models/hotel.interface';
import { HotelService } from 'app/modules/RESERVATION/services/hotel.service';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  // inyectar el servicios
  private readonly hotelService = inject(HotelService);
  private readonly route = inject(Router);

  // utils
  urlsUtils = UrlsUtils;

  // arreglo de hoteles
  hotels = signal<Hotel[]>([]);

  ngOnInit(): void {
    this.getAllHotels();
  }

  getAllHotels() {
    this.hotelService.getAllHotels().subscribe({
      next: (hotels) => {
        this.hotels.set(hotels);
        this.addImageRandomHotel();
      },
      error: (error) => {
        console.error('Error fetching hotels:', error);
      },
    });
  }

  addImageRandomHotel() {
    this.hotels.update((currentHotels) =>
      currentHotels.map((hotel) => ({
        ...hotel,
        imageUrl: this.urlsUtils.getRandomUrl(),
      }))
    );
  }

  clickGoOpinions(hotelId: string) {
    this.route.navigate(['reviews/opinions', hotelId]);
  }
}
