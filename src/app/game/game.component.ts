import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public selected = '';
  public winner = '';
  public wins = 0;
  public loses = 0;
  public draws = 0;
  public selections = {player: '', computer: ''};

  constructor(private readonly gameService: GameService, private router: Router) { }

  ngOnInit() {
    this.getResults();
    this.gameService.getName();
  }

  changeSelection(selection: string) {
    this.selected = selection;
    this.selections.player = selection;
    this.selections.computer = this.gameService.generateComputerSelection();
    this.winner = this.gameService.detectWinner(selection);
    this.getResults();
  }

  getResults() {
    const results = this.gameService.getStatistics();
    this.wins = results.wins;
    this.loses = results.loses;
    this.draws = results.draws;
  }

  clearData() {
    this.gameService.clearData();
    this.router.navigate(['/']);
  }
}
