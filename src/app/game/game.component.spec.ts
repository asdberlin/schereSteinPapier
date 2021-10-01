import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select stone', () => {
    component.changeSelection('Stein');
    expect(component.selected).toEqual('Stein');
  });

  it('should select scissors', () => {
    component.changeSelection('Schere');
    expect(component.selected).toEqual('Schere');

  });

  it('should select paper', () => {
    component.changeSelection('Papier');
    expect(component.selected).toEqual('Papier');
  });

  it('should select computerinput randomly', () => {
    component.generateComputerSelection();
    if (component.randomNumber === 0) {
      expect(component.compSelected).toEqual('Stein');
    } else if (component.randomNumber === 1) {
      expect(component.compSelected).toEqual('Schere');
    } else {
      expect(component.compSelected).toEqual('Papier');
    }
  });

  it('should detect the winner for stone selected', () => {
    component.selected = 'Stein';
    component.generateComputerSelection();
    component.detectWinner();
    if (component.compSelected === 'Stein') {
      expect(component.result).toEqual('draw');
    } else if (component.compSelected === 'Schere') {
      expect(component.result).toEqual('win');
    } else {
      expect(component.result).toEqual('lose');
    }
  });

  it('should detect the winner for scissors selected', () => {
    component.selected = 'Schere';
    component.generateComputerSelection();
    component.detectWinner();
    if (component.compSelected === 'Stein') {
      expect(component.result).toEqual('lose');
    } else if (component.compSelected === 'Schere') {
      expect(component.result).toEqual('draw');
    } else {
      expect(component.result).toEqual('win');
    }
  });

  it('should detect the winner for paper selected', () => {
    component.selected = 'Papier';
    component.generateComputerSelection();
    component.detectWinner();
    if (component.compSelected === 'Stein') {
      expect(component.result).toEqual('win');
    } else if (component.compSelected === 'Schere') {
      expect(component.result).toEqual('lose');
    } else {
      expect(component.result).toEqual('draw');
    }
  });
});
