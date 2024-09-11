import {
  Component,
  HostListener,
  inject,
  RendererFactory2,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss',
})
export class BlankLayoutComponent {
  private readonly _Renderer2 = inject(RendererFactory2).createRenderer(
    null,
    null
  );

  toTop = () => {
    scrollTo(0, 0);
  };

  showBtn: boolean = false;
  showNavbar: boolean = false;

  @HostListener('window:scroll') scrollToTop() {
    let scrollTop = document.documentElement.scrollTop;

    if (scrollTop > 500) {
      this.showBtn = true;
    } else {
      this.showBtn = false;
    }
  }
}
