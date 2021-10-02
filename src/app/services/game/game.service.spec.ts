import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe('gameService', () => {
  let service: GameService;
  let mockLocalStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
    let store = {};
    mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set name to specified value', () => {
    service.setName('Tom');
    expect(service.name).toEqual('Tom');
    expect(localStorage.setItem).toHaveBeenCalledWith('name', 'Tom');
  });

  it('should get name from localStorage', () => {
    service.setName('Tom');
    service.getName();
    expect(localStorage.getItem).toHaveBeenCalledWith('name');
    expect(service.name).toEqual('Tom');
  })
  
  it('should select computerinput randomly', () => {
    service.generateComputerSelection();
    if (service.randomNumber === 0) {
      expect(service.compSelected).toEqual('Stein');
    } else if (service.randomNumber === 1) {
      expect(service.compSelected).toEqual('Schere');
    } else {
      expect(service.compSelected).toEqual('Papier');
    }
  });

  it('should detect the winner for stone selected and computer selects stone', () => {
    service.compSelected = 'Stein';
    service.detectWinner('Stein');
    expect(service.result).toEqual('draw');
    expect(localStorage.setItem).toHaveBeenCalledWith('statistics', '{"wins":0,"loses":0,"draws":1}');
    
  });

  it('should detect the winner for stone selected and computer selects paper', () => {
    service.compSelected = 'Papier';
    service.detectWinner('Stein');
    expect(service.result).toEqual('lose');
    expect(localStorage.setItem).toHaveBeenCalledWith('statistics', '{"wins":0,"loses":1,"draws":0}');
  });

  it('should detect the winner for stone selected and computer selects Schere', () => {
    service.compSelected = 'Schere';
    service.detectWinner('Stein');
    expect(service.result).toEqual('win');
    expect(localStorage.setItem).toHaveBeenCalledWith('statistics', '{"wins":1,"loses":0,"draws":0}');
  });

  it('should detect the winner for scissors selected and computer selects scissors', () => {
    service.compSelected = 'Schere';
    service.detectWinner('Schere');
    expect(service.result).toEqual('draw');
    expect(localStorage.setItem).toHaveBeenCalledWith('statistics', '{"wins":0,"loses":0,"draws":1}');
  });

  it('should detect the winner for scissors selected and computer selects stone', () => {
    service.compSelected = 'Stein';
    service.detectWinner('Schere');
    expect(service.result).toEqual('lose');
    expect(localStorage.setItem).toHaveBeenCalledWith('statistics', '{"wins":0,"loses":1,"draws":0}');
  });

  it('should detect the winner for scissors selected and computer selects paper', () => {
    service.compSelected = 'Papier';
    service.detectWinner('Schere');
    expect(service.result).toEqual('win');
    expect(localStorage.setItem).toHaveBeenCalledWith('statistics', '{"wins":1,"loses":0,"draws":0}');
  });

  it('should detect the winner for paper selected and computer selects paper', () => {
    service.compSelected = 'Papier';
    service.detectWinner('Papier');
    expect(service.result).toEqual('draw');
    expect(localStorage.setItem).toHaveBeenCalledWith('statistics', '{"wins":0,"loses":0,"draws":1}');
  });

  it('should detect the winner for paper selected and computer selects stone', () => {
    service.compSelected = 'Stein';
    service.detectWinner('Papier');
    expect(service.result).toEqual('win');
    expect(localStorage.setItem).toHaveBeenCalledWith('statistics', '{"wins":1,"loses":0,"draws":0}');
  });

  it('should detect the winner for paper selected and computer selects paper', () => {
    service.compSelected = 'Papier';
    service.detectWinner('Papier');
    expect(service.result).toEqual('draw');
    expect(localStorage.setItem).toHaveBeenCalledWith('statistics', '{"wins":0,"loses":0,"draws":1}');
  });

  it('should detect the winner for paper selected and computer selects stone', () => {
    service.compSelected = 'Stein';
    service.detectWinner('Papier');
    expect(service.result).toEqual('win');
    expect(localStorage.setItem).toHaveBeenCalledWith('statistics', '{"wins":1,"loses":0,"draws":0}');
  });

  it('should detect the winner for paper selected and computer selects scissors', () => {
    service.compSelected = 'Schere';
    service.detectWinner('Papier');
    expect(service.result).toEqual('lose');
    expect(localStorage.setItem).toHaveBeenCalledWith('statistics', '{"wins":0,"loses":1,"draws":0}');
  });

  it('should clear localStorage', () => {
    service.clearData();
    expect(localStorage.clear).toHaveBeenCalled();
  });

  it('should setStatistics', () => {
    service.setStatistics();
    expect(localStorage.setItem).toHaveBeenCalledWith('statistics', '{"wins":0,"loses":0,"draws":0}');
  });

  it('should getStatistics from localStorage', () => {
    localStorage.setItem('statistics', '{"wins":0,"loses":0,"draws":0}');
    service.getStatistics();
    expect(localStorage.getItem).toHaveBeenCalledWith('statistics');
  });
});
