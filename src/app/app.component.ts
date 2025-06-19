import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [IonApp, IonRouterOutlet, SplashScreenComponent, CommonModule],
})
export class AppComponent {
  showSplash = true;

  splashBeendet() {
    this.showSplash = false;
  }
}
