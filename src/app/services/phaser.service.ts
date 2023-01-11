import { Injectable, ModuleWithProviders, NgModule, NgZone, Optional, SkipSelf } from '@angular/core';
import * as Phaser from 'phaser';

/**
 * A singleton service for intializing the Phaser game
 * 
 * @link https://github.com/openforge/ionic-phaser-game-template/blob/master/libs/shared/phaser-singleton/src/lib/phaser-singleton.module.ts
 */
@NgModule({})
export class PhaserService {
  /**
   * The currently active game
   */
  public static activeGame: Phaser.Game;
  /**
   * Angular zone
   */
  private static zone: NgZone;

  /**
   * Our default settings
   */
  private static defaults: any = {
    type: Phaser.AUTO,
    scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH,
      height: 960,
      mode: Phaser.Scale.FIT,
      width: 640,
    },
    plugins: {
      global: [],
    },
    fps: {
      forceSetTimeOut: true,
    },
    render: {
      transparent: false,
    },
  };

  /**
   * Build the class
   *
   * @param _ngZone       Angular's zone
   * @param parentModule  The parent module
   */
  constructor(
    private _ngZone: NgZone,
    @Optional() @SkipSelf() parentModule?: PhaserService,
  ) {
    if (parentModule) {
      console.error('Phaser Singleton is already loaded. Import it in the AppModule only');
    } else {
      PhaserService.zone = this._ngZone;
    }
  }

  /**
   * This function is required for singleton instance
   *
   * @returns PhaserService & List of Providers
   */
  public static forRoot(): ModuleWithProviders<PhaserService> {
    return {
      ngModule: PhaserService,
      providers: [],
    };
  }

  /**
   * Destroy the active game if exists
   */
  public static destroyActiveGame(): void {
    if (PhaserService.activeGame) {
      //* Param 1: Set to true if you would like the parent canvas element removed from the DOM.
      //* Param 2: Set to false  If you do need to create another game instance on the same page
      PhaserService.activeGame.destroy(true, false);
    }
  }

  public static async init(id: string, scenes: Array<any>, additionalConfig: any = {}): Promise<void> {
    /**
     * * Phaser by default runs at 60 FPS, and each frame that triggers change detection in Angular which causes
     * * Performance to go out the door.  NgZone's runOutsideAngular will prevent Phaser from automatically hitting change detection
     * * https://angular.io/guide/zone
     */
    PhaserService.zone.runOutsideAngular(() => {
      const options = {...PhaserService.defaults, ...additionalConfig};
      options.parent = id;
      options.scene = scenes;
      PhaserService.activeGame = new Phaser.Game(options);
    });
  }

}
