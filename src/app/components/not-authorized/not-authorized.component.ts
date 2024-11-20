import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Data, Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-not-authorized',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './not-authorized.component.html',
  styleUrl: './not-authorized.component.scss'
})
export class NotAuthorizedComponent {

  data$: Observable<Data> = of();

  private _activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.data$ = this._activatedRoute.data;
  }

}


// forma que eu fiz: 
// mensagemError: string = '';

// private _activatedRoute = inject(ActivatedRoute);

// ngOnInit() {
//   this.mensagemError = this._activatedRoute.snapshot.data['type'];
// }