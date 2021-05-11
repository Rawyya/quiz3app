
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  @Output() notifyDelete: EventEmitter<any> = new EventEmitter();
  @Input() id: string;
  constructor(private activeModal: NgbActiveModal ,private authService: AuthService) { }

  ngOnInit() {
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
      this.authService.deleteQuiz(this.id).subscribe((data) => {
this.authService.quizDeleted()
console.log(data)
  })

    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}
