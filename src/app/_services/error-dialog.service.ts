import { Injectable, Injector } from '@angular/core';
import { ErrorDialogComponent } from '@app/shared/error-dialog/error-dialog.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {
/*  private opened = false;
  private dialogRef?: NgbModalRef;
  
  constructor(private modalService: NgbModal) { }

  openDialog(message: string, status?: number): void {
    if (!this.opened) {
      this.opened = true;
      this.dialogRef = this.modalService.open(ErrorDialogComponent);
      this.dialogRef.componentInstance.message = message;
      this.dialogRef.componentInstance.status = status;

      this.dialogRef?.closed.subscribe(() => {
        this.opened = false;
      });
    }
  }

  hideDialog() {
    this.dialogRef?.close();
  }    
*/
private opened = false;
private dialogRef?: NgbModalRef;
private modalService?: NgbModal;

constructor(private injector: Injector) { }

openDialog(message: string, status?: number): void {
  if (!this.opened) {
    this.opened = true;
    this.modalService = this.injector.get(NgbModal);
    this.dialogRef = this.modalService.open(ErrorDialogComponent);
    this.dialogRef.componentInstance.message = message;
    this.dialogRef.componentInstance.status = status;

    this.dialogRef?.closed.subscribe(() => {
      this.opened = false;
    });
  }
}

hideDialog() {
  this.dialogRef?.close();
}    

}
