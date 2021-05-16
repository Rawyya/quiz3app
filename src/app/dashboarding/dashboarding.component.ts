import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-dashboarding',
  templateUrl: './dashboarding.component.html',
  styleUrls: ['./dashboarding.component.css']
})
export class DashboardingComponent implements OnInit {
  results: any;
  socre: any;
  marks: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getResults().subscribe((data:any)=>{
    this.results =data.msg
      this.results.map(e=>{
this.socre =this.socre +e.score
this.marks =this.marks +e.totalMarks
      })
    })
  }

}
