import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardReaderComponent } from './card-reader/card-reader.component';
import { EditInfoPageComponent } from './edit-info-page/edit-info-page.component';
import { UserInfoPageComponent } from './user-info-page/user-info-page.component';

const routes: Routes = [
  { path: 'editinfo', component: EditInfoPageComponent },
  { path: 'userinfo', component: UserInfoPageComponent },
  { path: 'readuser', component: CardReaderComponent },
  { path: '', redirectTo: '/readuser', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
