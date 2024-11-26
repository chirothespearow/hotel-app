import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];
  //CRUD
  constructor(){
    let savedReservations = localStorage.getItem("reservations")
    this.reservations = savedReservations ? JSON.parse(savedReservations) : []
  }
  getReservations():Reservation[]{
    return this.reservations;
  }

  getReservation(id:string): Reservation | undefined{
    return this.reservations.find(res => res.id === id);
  }
  
  createReservation(reservation:Reservation){
    reservation.id = Date.now().toString();
    console.log(reservation);
    this.reservations.push(reservation);
    localStorage.setItem("reservations",JSON.stringify(this.reservations))
  }

  deleteReservation(id:string){
    let index = this.reservations.findIndex((r) => r.id === id);
    this.reservations.splice(index,1)
    localStorage.setItem("reservations",JSON.stringify(this.reservations))
  }

  updateReservation(id:string,updatedReservation : Reservation){
    let index = this.reservations.findIndex(res => res.id === id);
    updatedReservation.id = id
    this.reservations[index] = updatedReservation;
    localStorage.setItem("reservations",JSON.stringify(this.reservations))
  }
}
