import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarAuthComponent } from "../../components/navbar-auth/navbar-auth.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarAuthComponent, FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
