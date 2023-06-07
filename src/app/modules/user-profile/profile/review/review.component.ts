import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ProfileService } from '../../profile.service';
import { Review } from '../../model/review';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ReviewComponent implements OnInit{

  id: any;
  rating1: number = 0;
  rating2: number = 0;
  review1: string = "";
  review2: string = "";
  touched1: boolean = false;
  touched2: boolean = false;
  starCount: number = 5;
  color: string = 'accent';


  ratingArr: number[] = [];


  constructor(private route: ActivatedRoute, private service: ProfileService, private router: Router){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];

    });

    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }

  }

  onClick1(rating:number) {
    this.rating1 =rating;
    this.touched1 = true;
    return false;
  }

  onClick2(rating:number) {
    this.rating2 =rating;
    this.touched2 = true;
    return false;
  }

  showIcon1(index:number) {
    if (this.rating1 >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  showIcon2(index:number) {
    if (this.rating2 >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }


  sendReviews(){
    if(this.touched1){
      this.sendDriverReview();
    }

    if(this.touched2){
      this.sendVehicleReview();
    }

    this.router.navigate(['profile/history']);
  }


  sendDriverReview(){
    let reviewBody: Review = {
      rating : this.rating1,
      comment: this.review1,
    }

    this.service.sendReviewDriver(reviewBody, this.id).subscribe((result)=>{

    })

    
  }
  sendVehicleReview(){
    let reviewBody: Review = {
      rating : this.rating2,
      comment: this.review2,
    }

    this.service.sendReviewVehicle(reviewBody, this.id).subscribe((result)=>{

    })

  }


}
export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}



