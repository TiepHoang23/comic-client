import { Component } from '@angular/core';
// import { OverlayContainer } from '@angular/cdk/overlay';
import { map } from 'rxjs/operators';

import { themes } from '../../core/constants';
import { ThemeService } from '../../services/theme.service';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-content-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  imports: [RouterOutlet, FooterComponent, NavComponent],
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  currentTheme: string = 'default-light-theme';

  currentActiveTheme$ = this.themeService.getDarkTheme().pipe(
    map((isDarkTheme: boolean) => {
      const [lightTheme, darkTheme] = themes;

      this.currentTheme = isDarkTheme ? lightTheme.name : darkTheme.name;

      // if (this.overlayContainer) {
      //   const overlayContainerClasses =
      //     this.overlayContainer.getContainerElement().classList;
      //   const themeClassesToRemove = Array.from(overlayContainerClasses).filter(
      //     (item: string) => item.includes('-theme')
      //   );
      //   if (themeClassesToRemove.length) {
      //     overlayContainerClasses.remove(...themeClassesToRemove);
      //   }
      //   overlayContainerClasses.add(this.currentTheme);
      // }

      return this.currentTheme;
    })
  );

  // private overlayContainer;

  constructor(private themeService: ThemeService) {}

  // ngOnInit(): void {
  //   if (this.overlayContainer) {
  //     this.overlayContainer
  //       .getContainerElement()
  //       .classList.add(this.currentTheme);
  //   }
  // }
}
