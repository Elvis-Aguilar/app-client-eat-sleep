import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { AlertStore } from 'app/store/alert.store';
import { ReviewsService } from '../../services/reviews.service';
import { RestaurantService } from '../../services/restaurant.service';
import { HandlerError } from '@shared/utils/handlerError';
import { UrlsUtils } from '@shared/utils/urls';
import { NewReview, Review } from '../../models/reviews.interface';
import { Dishes } from '../../models/restaurant.interface';
import { Session } from 'app/modules/session/models/auth';
import { NgClass, CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-opinions-dishes',
  imports: [NgClass, CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './opinions-dishes.component.html',
})
export class OpinionsDishesComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly alertStore = inject(AlertStore);
  private readonly reviewsService = inject(ReviewsService);
  private readonly router = inject(Router);
  private readonly restaurantService = inject(RestaurantService);

  // hangleerError
  private HandlerError = HandlerError;

  // utils
  urlsUtils = UrlsUtils;

  // arreglo de reviews by id del hotel
  reviews = signal<Review[]>([]);

  dishe = signal<Dishes | null>(null);

  pinionId!: string;
  roomImageUrl: string = '';
  session: Session = this.localStorageService.getState().session;

  newReview = signal<NewReview>({
    comment: '',
    rating: 0,
    customerId: this.session.customerId,
    refenceId: this.pinionId,
    typeReference: 'dishes',
  });

  constructor() {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.pinionId = params.get('id')!;
      this.newReview().refenceId = this.pinionId;
      this.getDisheById();
      this.getReviewsByDisheId();
    });

    this.roomImageUrl = this.urlsUtils.getRandomUrlDish();
  }

  getDisheById() {
    this.restaurantService.getDishById(this.pinionId).subscribe({
      next: (dishe) => {
        this.dishe.set(dishe);
      },
      error: (error) => {
        this.dishe.set(null);
        const msgDefault = 'Error al obtener la información de la habitacion. ';
        this.HandlerError.handleError(error, this.alertStore, msgDefault);
      },
    });
  }

  getReviewsByDisheId() {
    this.reviewsService.getAllDishes(this.pinionId).subscribe({
      next: (reviews) => {
        this.reviews.set(reviews);
      },
      error: (error) => {
        this.reviews.set([]);
        // TODO: manejar el error
      },
    });
  }

  cleanForm() {
    this.newReview.set({
      comment: '',
      rating: 0,
      customerId: this.session.customerId,
      refenceId: this.pinionId,
      typeReference: 'room',
    });
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

    this.reviewsService.saveReview(this.newReview()).subscribe({
      next: () => {
        this.alertStore.addAlert({
          message: `Gracias por su opinión.`,
          type: 'success',
        });
        // limpiar el formulario
        this.cleanForm();
        // actualizar la lista de opiniones
        this.getReviewsByDisheId();
      },
      error: (error) => {
        const msgDefault = 'Error al enviar la opinión. ';
        this.HandlerError.handleError(error, this.alertStore, msgDefault);
      },
    });
  }
}
