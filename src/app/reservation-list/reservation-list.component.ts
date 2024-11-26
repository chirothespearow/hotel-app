import { Component,OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';
@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent {
  constructor(private reservationService : ReservationService){

  }

  ngOnInit(){
    this.reservations = this.reservationService.getReservations()
  }

  deleteReservation(id:string){
    this.reservationService.deleteReservation(id)
  }
  reservations: Reservation[] = []
}
