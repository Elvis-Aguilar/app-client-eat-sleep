import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-reservation',
  imports: [],
  templateUrl: './modal-reservation.component.html',
})
export class ModalReservationComponent {
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
