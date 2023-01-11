import { Component, OnDestroy } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';
import { PhaserService } from './services/phaser.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {

  constructor(platform: Platform) {
    platform.ready().then(() => {
      SplashScreen.hide();
      StatusBar.hide();
    });
  }

  /**
   * Handle the deconstruction of the class
   */
  ngOnDestroy(): void {
    PhaserService.destroyActiveGame();
  }


}
