import { Component, OnInit } from '@angular/core';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import { PhaserService } from '../services/phaser.service';
import Boot from '../scenes/Boot';
import Preloader from '../scenes/Preloader';
import MainMenu from '../scenes/MainMenu';
import Settings from '../scenes/Settings';
import Story from '../scenes/Story';
import Character from '../scenes/Character';
import Difficulty from '../scenes/Difficulty';
import Rank from '../scenes/Rank';
import Game from '../scenes/Game';
import LevelEnd from '../scenes/LevelEnd';
import Award from '../scenes/Award';
import EndScene from '../scenes/EndScene';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() {}

  /**
   * Angular life cycle on init
   */
  ngOnInit(): void {
    setTimeout(this.init, 500);
  }

  /**
   * Initialize the view.
   */
  async init(): Promise<void> {
    const options = {
      dom: {
        createContainer: true,
      },
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
          gravity: { y: 400 },
        },
      },
      plugins: {
        scene: [
          {
            key: 'rexUI',
            plugin: RexUIPlugin,
            mapping: 'rexUI'
          }
        ],
      },
      debug: false,
    };
    await PhaserService.init('phaser-game', [Boot, Preloader, MainMenu, Settings, Story, Character, Difficulty, Rank, Game, LevelEnd, Award, EndScene], options);
  }

}
