import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentFormComponent } from './component-form/component-form.component';
import { ComponentTableComponent } from './component-table/component-table.component';
import { HomeComponent } from './home/home.component';
import { CreditCardSimulatorComponent } from './credit-card-simulator/credit-card-simulator.component';
registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    ComponentFormComponent,
    ComponentTableComponent,
    HomeComponent,
    CreditCardSimulatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
