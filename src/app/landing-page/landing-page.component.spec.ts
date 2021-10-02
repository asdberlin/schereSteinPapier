import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GameService } from '../services/game/game.service';

import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let router: Router;
  let gameServiceSpy: jasmine.SpyObj<GameService>

  beforeEach(async () => {
    const gameSpy = jasmine.createSpyObj('GameService', ['setName']);
    await TestBed.configureTestingModule({
      declarations: [ LandingPageComponent ],
      imports: [ RouterTestingModule, FormsModule ],
      providers: [ {
        provide: GameService,
        useValue: gameSpy
      } ]
    })
    .compileComponents();
    gameServiceSpy = TestBed.inject(GameService) as jasmine.SpyObj<GameService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set name', () => {
    component.name = 'Tom'
    expect(component.name).toEqual('Tom');
  });

  it('should redirect to /game', () => {
    const navSpy = spyOn(router, 'navigate');
    component.name = 'Tom';
    component.startGame();
    expect(gameServiceSpy.setName).toHaveBeenCalledWith('Tom');
    expect(navSpy).toHaveBeenCalledWith(['/game']);
  });
});
