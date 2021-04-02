import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Info } from './shared/info.model';
import { TodoService } from './shared/todo.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //title = 'todo-app2';
  /*
   *
   */
  constructor(public service: TodoService, private dialog: MatDialog) {
  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    this.service.storage.set('myData', this.dataSource.data).subscribe(() => {
      console.log("Data has been set...");
    });
  }

  dataSource: MatTableDataSource<Info> = new MatTableDataSource<Info>();
  displayedColumns: string[] = ['id'];
  isValid = true;
  formData = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  });

  get title() { return this.formData.get('title'); }
  get content() { return this.formData.get('content'); }

  outputData(): void {

    let len = this.dataSource.data.length;
    console.log("len = %d", len);
    for (let i = 0; i < len; i++) {
      console.log("\n*******************");
      console.log(`id = ${this.dataSource.data[i].id}`);
      console.log(`title = ${this.dataSource.data[i].title}`);
      console.log(`content = ${this.dataSource.data[i].content}`);
      console.log(`done = ${this.dataSource.data[i].done}`);
      console.log("*******************");
    }
  }

  ngOnInit(): void {

    this.service.storage.has('myData').subscribe((hasKey: boolean) => {
      console.log(`hasKey = ${hasKey}`);

      if (hasKey) {
        this.service.storage.get('myData').subscribe((myData: Info[]) => {
          this.dataSource.data = myData;

          this.outputData();
        });
      }
    });

  }

  cleanStorage() {
    this.service.storage.clear().subscribe(() => {
      this.dataSource.data = [];
      console.log('local strorage has been cleaned ....');
    });
  }


  getNewID(): number {
    let len = this.dataSource.data.length;
    if (len === 0)
      return 1;
    return this.dataSource.data[len - 1].id + 1;
  }

  findIndexById(id: number): number {
    let len = this.dataSource.data.length;
    for (let i = 0; i < len; i++) {
      if (this.dataSource.data[i].id == id)
        return i;
    }
    return -1;
  }

  changeDone(id: number): void {
    console.log("check button has been clicked !!!! id = " + id);
    let myInd = this.findIndexById(id);
    let isDone = this.dataSource.data[myInd].done;
    this.dataSource.data[myInd].done = isDone ? false : true;

  }


  openDialog(id: number, title: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title1: 'Are you sure?',
        title2: 'You are about to delete ' + title,
        buttonText: {
          ok: 'delete',
          cancel: 'cancel'
        }
      }
    });


    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
      if (res == "delete") {
        console.log(`id = ${id}`);
        let myInd = this.findIndexById(id);
        this.dataSource.data.splice(myInd, 1);
        this.dataSource.data = this.dataSource.data;
      }
    });
  }

  applyFilter(filterValue: string): void {
    //console.log(`filterValue = ${filterValue}`);
    filterValue = filterValue.trim(); // Remove whitespace

    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;


  }




  onSubmit(): void {

    if (this.formData.valid) {
      //console.log(`title = ${this.formData.get('title').value}`);
      //console.log(`content = ${this.formData.get('content').value}`);
      this.dataSource.data.push(new Info(
        this.getNewID(),
        this.formData.get('title').value,
        this.formData.get('content').value,
        false));


      this.dataSource.data = this.dataSource.data;
      //this.resetForm();
      this.formData.markAsPristine();
      this.formData.markAsUntouched();
      this.formData.reset();
    }


  }

}
