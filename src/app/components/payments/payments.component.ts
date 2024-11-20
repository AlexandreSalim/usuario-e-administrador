import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent {

  isWalletBlocked = false;

  private _router = inject(Router); 
  private _activatedRoute = inject(ActivatedRoute)

navigate(path: string) {
    this._router.navigate([path], { relativeTo: this._activatedRoute }).then((success) => {
      if(success === null) return;
      
      if(success) {
        this.isWalletBlocked = false;
      } else {
        this._router.navigate(['/dashboard/payments'])
        this.isWalletBlocked = true;
      }
    })
}

}
