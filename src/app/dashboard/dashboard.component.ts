import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { NavigationExtras, Router } from '@angular/router';
import { DialogService } from './confirmation-dialog/dialog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  rows = [];
  columns = [
    { prop: 'title', name: 'Title' },
    { prop: 'subject', name: 'Subject' },
    { prop: 'time', name: 'Time' },
    { prop: 'totalMarks', name: 'Total Marks' },

  ];

  temp = [];
  table: any;

  sortOrders = [];
  quiz: any;

  constructor(private authService: AuthService, private router: Router, private dialogService :DialogService) { }

  ngOnInit() {

    this.authService.notifyDelete.subscribe((data) => {
      if (data==='delete')
      this.getQuiz()
    }
    )
    this.getQuiz();
  }

  addQuiz(){
    this.router.navigateByUrl('/newquiz');
  }

  getQuiz() {
    this.authService.getQuiz().subscribe((data) => {
      console.log(data);
      if (data['success'] === true) {
        this.quiz = data['msg'];
        this.sortOrders = [];
        this.sortOrders.push({ 'show': 'All', 'value': this.rows.length });
        this.temp = [...this.quiz];
        this.rows = this.temp;
      } else {
        console.log('error');
      }
    })
  }
deleteQuiz(quiz :any){
//   this.authService.deleteQuiz(quiz._id).subscribe((data) => {
// this.getQuiz()
//   })

  this.dialogService.confirm(quiz._id,'Please confirm..', 'Do you really want to ... ?')
  .then((confirmed) => console.log('User confirmed:', confirmed))
  .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

}

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      // console.log(d);
      return d.title.toLowerCase().indexOf(val) !== -1 || d.subject.toLowerCase().indexOf(val) !== -1;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
  editQuiz(quiz:any){
    const navigationExtras: NavigationExtras = {state: {data: quiz}};
    this.router.navigate(['/editQuiz'], navigationExtras);
  }

}
