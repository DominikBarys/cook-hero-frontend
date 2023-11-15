import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginator } from './material/custom-mat-paginator';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, RouterLink, SharedModule, HttpClientModule],
  exports: [HeaderComponent, FooterComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginator,
    },
  ],
})
export class CoreModule {}
