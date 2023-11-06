import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from './modules/core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { HomeModule } from './modules/home/home.module';
import { authenticationReducer } from './modules/authentication/store/authentication.reducer';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

const notifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 16,
    },
    vertical: {
      position: 'top',
      distance: 80,
      gap: 10,
    },
  },
  theme: 'material',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    AuthenticationModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ authentication: authenticationReducer }, {}),
    EffectsModule.forRoot([]),
    NotifierModule.withConfig(notifierOptions),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
