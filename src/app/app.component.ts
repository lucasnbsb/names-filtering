import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './shared/services/user.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { BehaviorSubject, Observable, combineLatest, debounceTime, distinctUntilChanged, distinctUntilKeyChanged, forkJoin, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe, AsyncPipe, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  usersService = inject(UserService)
  
  filter$: Observable<string | null>
  users$ = this.usersService.getUsers();

  usersOnScreen$ = new BehaviorSubject<any[]>([])

  formGroup = new FormGroup({
    name: new FormControl('')
  })
  
  constructor(){
    this.filter$ = this.formGroup.get('name')!.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      debounceTime(300)
    );

    combineLatest([this.filter$, this.users$]).subscribe(([filter, users]) => {
      console.log(filter)
      if(!users){
        return;
      }
      users = (users as any[]).filter((user) => {
        if(!filter){
          return true;
        }
        return (user.name as string).startsWith(filter);
      })
      this.usersOnScreen$.next(users)
    })
    
  }

  ngOnInit(): void {
   
  }
}
