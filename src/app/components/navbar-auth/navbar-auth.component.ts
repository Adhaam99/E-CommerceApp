import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../core/services/flowbite.service';

@Component({
  selector: 'app-navbar-auth',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar-auth.component.html',
  styleUrl: './navbar-auth.component.scss'
})
export class NavbarAuthComponent {

  constructor(private _FlowbiteService:FlowbiteService){}

  ngOnInit(): void {
    
    this._FlowbiteService.loadFlowbite( ()=>{} )
  }
}
