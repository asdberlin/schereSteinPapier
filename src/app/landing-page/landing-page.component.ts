import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game/game.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent {

  public name: string = '';

  constructor(private readonly router: Router, private readonly gameService: GameService) { }

  startGame() {
    this.gameService.setName(this.name);
    this.router.navigate(['/game']);
  }

}
