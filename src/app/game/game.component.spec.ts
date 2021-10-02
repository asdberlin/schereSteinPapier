import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
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

  it('should clearData', () => {
    const navSpy = spyOn(router, 'navigate');
    component.clearData();
    expect(navSpy).toHaveBeenCalledWith(['/']);
  })
});
