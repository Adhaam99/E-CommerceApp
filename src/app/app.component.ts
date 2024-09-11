import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

ngOnInit(): void {
  initFlowbite()
}
  
}
