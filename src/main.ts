import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// todo od aktywacji bez effects
// todo buguje sie po zmianie nazwy
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
