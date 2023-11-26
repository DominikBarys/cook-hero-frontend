import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// todo modale w wirtualnej lodówce
// todo podpowiadanie usera w admin panelu (endpoint auth/all)
// todo stylowanie admin panela
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
