import { Component, inject, signal } from '@angular/core';
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

  // lista de urls de imagenes
  listUrls: string[] = [
    'https://www.momondo.es/himg/63/d1/0a/expediav2-51060-3d808d-232963.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy_EEIqfQXlCdC484ypMPgIBqoFL5exw-0Ag&s',
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/87/22/be/hotel-victorias.jpg?w=1200&h=-1&s=1',
    'https://cdn0.uncomo.com/es/posts/1/9/2/servicios_de_cafeteria_47291_12_600.jpg',
    'https://media-cdn.tripadvisor.com/media/photo-s/2b/52/75/c5/caption.jpg',
    'https://image-tc.galaxy.tf/wijpeg-dmgseqrawzguu07plej7lstz4/garden-view-double-room_standard.jpg?crop=134%2C0%2C1653%2C1240'
  ];

  // arreglo de hoteles
  hotels = signal<Hotel[]>([]);

  ngOnInit(): void {
    this.getAllHotels();
  }

  // funcion para obtener una url aleatoria
  getRandomUrl(): string {
    const randomIndex = Math.floor(Math.random() * this.listUrls.length);
    return this.listUrls[randomIndex];
  }


  getAllHotels() {
    this.hotelService.getAllHotels().subscribe({
      next: (hotels) => {
        this.hotels.set(hotels);
      },
      error: (error) => {
        console.error('Error fetching hotels:', error);
      }
    });
  }

}
