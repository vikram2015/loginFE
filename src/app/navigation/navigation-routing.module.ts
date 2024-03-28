import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideNavComponent } from './components/side-nav/side-nav.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'side-nav',
  //   pathMatch: 'full'
  // },
  {
    path: 'side-nav',
    component: SideNavComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
