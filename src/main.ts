import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// todo guardy tam gdzie trzeba
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
