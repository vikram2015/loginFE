import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationRoutingModule } from './navigation-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SideNavComponent],
  imports: [CommonModule, NavigationRoutingModule],
  exports: [HeaderComponent, FooterComponent, SideNavComponent],
})
export class NavigationModule {}
