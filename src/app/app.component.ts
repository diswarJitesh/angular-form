import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userForm: FormGroup;
  users: User[] = [];
  formSubmission: boolean = false;

  ngOnInit() {
    let users = localStorage.getItem("users");
    if (users) {
      this.users = JSON.parse(users);
      console.log(this.users)
    }
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      age: new FormControl('', [Validators.required, Validators.pattern(/[0-9]/)]),
    })
  }

  formSubmitted(): void {
    console.log(this.userForm)
    if (this.userForm.valid) {
      let user = this.userForm.value;
      user.id = this.getRandom();
      this.users.push(user);
      localStorage.setItem("users", JSON.stringify(this.users));
      this.formSubmission = false
      this.userForm.reset();
    } else {
      this.formSubmission = true;
    }

  }
  userById(index, user: User): string {
    return user.id;
  }

  getRandom(): string {
    return new Date().getTime().toString() + Math.floor(Math.random() * 1000000);
  }
  
  getControls(field: string): AbstractControl {
    return this.userForm.controls[field];
  }
}
