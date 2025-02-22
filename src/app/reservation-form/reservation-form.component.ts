import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit{
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate:['',Validators.required],
      checkOutDate:['',Validators.required],
      guestName:['',Validators.required],
      guestEmail:['',[Validators.required,Validators.email]],
      roomNumber:['',Validators.required]
    })
    
    let id = this.activatedRoute.snapshot.paramMap.get('id')

    if(id){
      let reservation = this.reservationService.getReservation(id)
      if(reservation){
        this.reservationForm.patchValue(reservation)
      }
    }
  }

  constructor(private formBuilder:FormBuilder, private reservationService:ReservationService,private router:Router,private activatedRoute:ActivatedRoute){

  }
  reservationForm: FormGroup = new FormGroup({});
  onSubmit(){
    if(this.reservationForm.valid){
      // console.log("Valid")
      let reservation: Reservation = this.reservationForm.value;
      let id = this.activatedRoute.snapshot.paramMap.get('id')

      if(id){
        this.reservationService.updateReservation(id,reservation)
      }
      else{
        this.reservationService.createReservation(reservation)
      }
    }
    this.router.navigate(['/list'])
  }
}
