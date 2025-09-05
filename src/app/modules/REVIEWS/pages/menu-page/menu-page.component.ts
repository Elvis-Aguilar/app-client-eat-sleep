import { Component, inject, signal } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlsUtils } from '@shared/utils/urls';
import { Dishes } from '../../models/restaurant.interface';
import { CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-menu-page',
  imports: [CurrencyPipe],
  templateUrl: './menu-page.component.html',
})
export class MenuPageComponent {
  private readonly router = inject(Router);
  private readonly restaurantService = inject(RestaurantService);
  private readonly route = inject(ActivatedRoute);

  // utils
  urlsUtils = UrlsUtils;

  pinionId!: string;
  dishes = signal<Dishes[]>([]);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.pinionId = params.get('id')!;
      this.getAllDishesByRestaurantId();
    });
  }

  getAllDishesByRestaurantId() {
    this.restaurantService.getAllDishesByRestaurantId(this.pinionId).subscribe({
      next: (dishes) => {
        this.dishes.set(dishes);
        this.addImageRandomDish();
      },
      error: (error) => {
        console.error('Error fetching dishes:', error);
      },
    });
  }

  addImageRandomDish() {
    this.dishes.update((currentHotels) =>
      currentHotels.map((hotel) => ({
        ...hotel,
        urlImage: this.urlsUtils.getRandomUrlDish(),
      }))
    );
  }

  clickGoOpinionsDishes(disehId: string) {
    this.router.navigate(['reviews/opinions/dishes', disehId]);
  }
}
