import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// todo initialize uuid in creator panel to correct save author
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
