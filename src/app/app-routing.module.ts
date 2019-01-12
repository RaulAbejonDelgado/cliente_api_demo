import { PersonaDetalleComponent } from './components/persona-detalle/persona-detalle.component';
import { ComentariosDetalleComponent } from './components/comentarios-detalle/comentarios-detalle.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { NewCommentComponent } from './components/new-comment/new-comment.component';
import { FamiliasComponent } from './components/familias/familias.component';
import { PersonasComponent } from './components/personas/personas.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { ComentariosGuard } from './guards/comentarios.guard';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { FamiliaDetalleComponent } from './components/familia-detalle/familia-detalle.component';
import { PerilComponent } from './components/peril/peril.component';

const routes: Routes = [
  
  { path: 'perfil', component: PerilComponent },
  { path: 'persona-detalle/:id', component: PersonaDetalleComponent },
  { path: 'familia-detalle/:id', component: FamiliaDetalleComponent },
  { path: 'comentario-detalle/:id', component: ComentariosDetalleComponent },
  { path: 'comentarios', component: ComentariosComponent },
  { path: 'comentario-nuevo', component: NewCommentComponent, canActivate: [ComentariosGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'personas', component: PersonasComponent },
  { path: 'familias', component: FamiliasComponent },
  { path: 'inicio', component: HomeComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
