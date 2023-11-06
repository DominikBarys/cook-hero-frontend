import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CookHero-fe';

  constructor(private notifier: NotifierService) {}

  ngOnInit(): void {
    this.notifier.notify('success', 'Welcome to CookHero!');
  }
}
