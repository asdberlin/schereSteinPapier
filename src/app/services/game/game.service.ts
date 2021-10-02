import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public name: string = '';
  public selected = '';
  public compSelected = '';
  public randomNumber = 0;
  public result = '';
  public winner = '';
  private draw = 0;
  private win = 0;
  private lose = 0;

  generateComputerSelection(): string {
    this.randomNumber = Math.floor(Math.random() * 3);
    if (this.randomNumber === 0) {
      this.compSelected = 'Stein';
    } else if (this.randomNumber === 1) {
      this.compSelected = 'Schere';
    } else {
      this.compSelected = 'Papier';
    }
    return this.compSelected;
  }

  detectWinner(selected: string): string {
    this.selected = selected;
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
      this.winner = this.name;
      this.win++;
    } else if (this.result === 'lose') {
      this.winner = 'der Computer';
      this.lose++;
    } else {
      this.winner = 'draw';
      this.draw++;
    }
    this.setStatistics();
    return this.winner;
  }

  getStatistics() {
    let statistics;
    if (localStorage.getItem('statistics')) {
      statistics = JSON.parse(localStorage.getItem('statistics') as string);
      this.win = statistics.wins;
      this.lose = statistics.loses;
      this.draw = statistics.draws;
    } else {
      statistics = {wins: this.win, loses: this.lose, draws: this.draw}
    }
    return statistics;
  }

  setStatistics() {
    const statistics = {wins: this.win, loses: this.lose, draws: this.draw};
    localStorage.setItem('statistics', JSON.stringify(statistics));
  }

  getName() {
    if (localStorage.getItem('name')) {
      this.name = localStorage.getItem('name') as string;
    }
  }

  setName(name: string) {
    localStorage.setItem('name', name);
    this.name = name;
  }

  clearData() {
    this.win = 0;
    this.lose = 0;
    this.draw = 0;
    localStorage.clear();
  }
}
