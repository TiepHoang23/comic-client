import { Component } from '@angular/core';
// import { OverlayContainer } from '@angular/cdk/overlay';
import { map } from 'rxjs/operators';

import { themes } from '../../core/constants';
import { ThemeService } from '@services/theme.service';



@Component({
  selector: 'app-content-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  currentTheme: string = 'dark';

  currentActiveTheme$ = this.themeService.getDarkTheme().pipe(
    map((isDarkTheme: boolean) => {
      console.log(isDarkTheme);

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

  constructor(private themeService: ThemeService) { }

  // ngOnInit(): void {
  //   if (this.overlayContainer) {
  //     this.overlayContainer
  //       .getContainerElement()
  //       .classList.add(this.currentTheme);
  //   }
  // }
}
