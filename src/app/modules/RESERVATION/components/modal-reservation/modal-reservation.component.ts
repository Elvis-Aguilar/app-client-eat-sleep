import {
  Component,
  EventEmitter,
  inject,
  input,
  Output,
  signal,
} from '@angular/core';
import { Reservation } from '../../models/reservation.interface';
import { Promotion } from '../../models/promotion.interface';
import { ReservationService } from '../../services/Reservation.service';
import { PromotionService } from '../../services/Promotion.service';
import { Session } from 'app/modules/session/models/auth';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-reservation',
  imports: [DatePipe],
  templateUrl: './modal-reservation.component.html',
})
export class ModalReservationComponent {
  // output
  @Output() close = new EventEmitter<void>();

  // input
  roomId = input.required<string>();

  //iject services
  private readonly reservationService = inject(ReservationService);
  private readonly promotionService = inject(PromotionService);
  private readonly localStorageService = inject(LocalStorageService);

  // catalogos
  reservations = signal<Reservation[]>([]);
  promotionRoom = signal<Promotion | null>(null);
  promotionCustomer = signal<Promotion | null>(null);

  session: Session = this.localStorageService.getState().session;

  ngOnInit(): void {
    this.getPromotionByRoomId();
    this.getReservationsByRoomId();
    this.getPromotionByCustomerId(this.session.customerId);
  }

  onClose() {
    this.close.emit();
  }

  // get promotion by room id
  getPromotionByRoomId() {
    this.promotionService.getAllPromotionsByRoomId(this.roomId()).subscribe({
      next: (promotions) => {
        if (promotions.length > 0) {
          this.promotionRoom.set(promotions[0]);
        } else {
          this.promotionRoom.set(null);
        }
      },
      error: (error) => {
        console.error('Error fetching promotions by room ID:', error);
        this.promotionRoom.set(null);
      },
    });
  }

  // get promotion by customer id
  getPromotionByCustomerId(customerId: string) {
    this.promotionService.getAllPromotionsByCustomerId(customerId).subscribe({
      next: (promotions) => {
        if (promotions.length > 0) {
          this.promotionCustomer.set(promotions[0]);
        } else {
          this.promotionCustomer.set(null);
        }
      },
      error: (error) => {
        console.error('Error fetching promotions by customer ID:', error);
        this.promotionCustomer.set(null);
      },
    });
  }

  // get reservation by room id
  getReservationsByRoomId() {
    this.reservationService
      .getAllReservationCurrentByRoomId(this.roomId())
      .subscribe({
        next: (reservations) => {
          this.reservations.set(reservations);
        },
        error: (error) => {
          console.error('Error fetching reservations by room ID:', error);
          this.reservations.set([]);
        },
      });
  }


  // save reservation
}
