import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutoriel',
  templateUrl: './tutoriel.component.html',
  styleUrls: ['./tutoriel.component.css']
})
export class TutorielComponent implements OnInit {
  myimage1:string="assets/myimage1.jpg;"
  science:string="assets/science.png;"


  constructor() { }

  ngOnInit() {
  }

}
