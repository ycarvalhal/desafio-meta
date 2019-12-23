import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './contato/list/list.component';
import { EditComponent } from './contato/edit/edit.component';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'edit', component: EditComponent},
  {path: 'edit/:id', component: EditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
