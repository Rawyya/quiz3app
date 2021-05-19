import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  rows = [];
  columns = [
    { prop: 'student', name: 'Student' },
    { prop: 'date', name: 'Date' },
    { prop: 'score', name: 'score' },
    { prop: 'quiz', name: 'Quiz' },
    { prop: 'totalMarks', name: 'Total Marks' },

  ];

  temp = [];
  table: any;

  sortOrders = [];
  quiz: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getQuiz();
  }

  getQuiz() {
    this.authService.getResults().subscribe((data) => {
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





}
