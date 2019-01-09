import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { NewCommentComponent } from './components/new-comment/new-comment.component';
import { FamiliasComponent } from './components/familias/familias.component';
import { PersonasComponent } from './components/personas/personas.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [

  { path: 'login',component: LoginComponent},
  { path: 'registro',component: RegistroComponent},
  { path: 'personas',component: PersonasComponent},
  { path: 'familias',component: FamiliasComponent},
  { path: 'comentario-nuevo',component: NewCommentComponent},
  { path: 'inicio',component: HomeComponent},
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
