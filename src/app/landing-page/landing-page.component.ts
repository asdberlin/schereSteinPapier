import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../services/settings/settings.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent {

  public name: string = '';

  constructor(private readonly router: Router, private readonly settingsService: SettingsService) { }

  startGame() {
    this.settingsService.name = this.name;
    this.router.navigate(['/game']);
  }

}
