import { Component } from '@angular/core';
import { SettingsService } from '../services/settings/settings.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  public selected = '';
  public compSelected = '';
  public randomNumber = 0;
  public result = '';
  public winner = '';
  public selections = {player: '', computer: ''};

  constructor(private readonly settingsService: SettingsService) { }

  changeSelection(selection: string) {
    this.selected = selection;
    this.selections.player = selection;
    this.generateComputerSelection();
    this.detectWinner();
  }

  generateComputerSelection() {
    this.randomNumber = Math.random() * 3;
    this.randomNumber = Math.floor(this.randomNumber);
    if (this.randomNumber === 0) {
      this.compSelected = 'Stein';
    } else if (this.randomNumber === 1) {
      this.compSelected = 'Schere';
    } else {
      this.compSelected = 'Papier';
    }
    this.selections.computer = this.compSelected;
  }

  detectWinner() {
    if (this.selected === 'Stein' && this.compSelected === 'Stein') {
      this.result = 'draw';
    } else if (this.selected === 'Stein' && this.compSelected === 'Schere') {
      this.result = 'win';
    } else if (this.selected === 'Stein' && this.compSelected === 'Papier') {
      this.result = 'lose';
    } else if (this.selected === 'Schere' && this.compSelected === 'Stein') {
      this.result = 'lose';
    } else if (this.selected === 'Schere' && this.compSelected === 'Schere') {
      this.result = 'draw';
    } else if (this.selected === 'Schere' && this.compSelected === 'Papier') {
      this.result = 'win';
    } else if (this.selected === 'Papier' && this.compSelected === 'Stein') {
      this.result = 'win';
    } else if (this.selected === 'Papier' && this.compSelected === 'Schere') {
      this.result = 'lose';
    } else {
      this.result = 'draw';
    }
    if (this.result === 'win') {
      this.winner = this.settingsService.name;
    } else if (this.result === 'lose') {
      this.winner = 'der Computer';
    }
  }

}
