import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlsUtils } from '@shared/utils/urls';
import { Hotel } from 'app/modules/RESERVATION/models/hotel.interface';
import { HotelService } from 'app/modules/RESERVATION/services/hotel.service';
import { NewReview } from '../../models/reviews.interface';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { Session } from 'app/modules/session/models/auth';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertStore } from 'app/store/alert.store';

@Component({
  selector: 'app-opinions-page',
  imports: [NgClass, CommonModule, FormsModule],
  templateUrl: './opinions-page.component.html',
})
export class OpinionsPageComponent {
  // inyectar el servicios
  private readonly hotelService = inject(HotelService);
  private readonly route = inject(ActivatedRoute);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly alertStore = inject(AlertStore);

  // utils
  urlsUtils = UrlsUtils;

  // arreglo de hoteles
  hotel = signal<Hotel | null>(null);

  pinionId!: string;
  hotelImageUrl: string = '';
  session: Session = this.localStorageService.getState().session;
  newReview = signal<NewReview>({
    comment: '',
    rating: 0,
    customerId: this.session.customerId,
    refenceId: '',
    typeReference: 'hotel',
  });

  constructor() {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.pinionId = params.get('id')!;
      this.newReview().refenceId = this.pinionId;
    });

    this.hotelImageUrl = this.urlsUtils.getRandomUrl();
  }

  saveReview() {
    if (
      this.newReview().comment.trim() === '' ||
      this.newReview().rating === 0
    ) {
      this.alertStore.addAlert({
        message: `Por favor, complete todos los campos antes de enviar la opinión.`,
        type: 'info',
      });
      return;
    }
  }

  // get opiniones de un hotel segun su id
}
