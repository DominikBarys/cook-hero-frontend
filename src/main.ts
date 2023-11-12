import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// todo od aktywacji bez effects
// todo prawdopodobnie trzeba bedzie zmienic model usera aby przechowywal uuid
// todo resetowanie hasla nie dziala, bo nie ma uuid w body
// todo przetestować czy register form dziala poprawnie bo tam troche mieszałem
// todo dodać guarda na te nowe rzeczy
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

//todo LATER:
// todo potestować czy jak dam cookie na httpOnly=false to zobacze go w przegladarce //to jednak chyba dziala
// todo wgl potestowac cookiesy
