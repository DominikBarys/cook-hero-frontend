import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// todo dialogi w wirtualnej lodówce
// todo podpowiadanie usera w admin panelu (endpoint auth/all)?
// todo stylowanie admin panela
// todo initialize uuid in creator panel to correct save author
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
