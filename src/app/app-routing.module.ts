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
import { BackofficeComponent } from './components/backoffice-seccion/backoffice/backoffice.component';
import { BackofficeFamilyComponent } from './components/backoffice-seccion/backoffice-family/backoffice-family.component';
import { BackofficePersonComponent } from './components/backoffice-seccion/backoffice-person/backoffice-person.component';
import { BackofficeCommentComponent } from './components/backoffice-seccion/backoffice-comment/backoffice-comment.component';
import { BackofficePersonEditableComponent } from './components/backoffice-seccion/backoffice-person-editable/backoffice-person-editable.component';
import { BackofficeFamilyDetailComponent } from './components/backoffice-seccion/backoffice-family-detail/backoffice-family-detail.component';
import { BackofficeCommentsEditableComponent } from './components/backoffice-seccion/backoffice-comments-editable/backoffice-comments-editable.component';

const routes: Routes = [

  { path: 'backoffice-comment-detail/:id', component: BackofficeCommentsEditableComponent },
  { path: 'backoffice-family-detail/:id', component: BackofficeFamilyDetailComponent },
  { path: 'backoffice-person-detail/:id', component: BackofficePersonEditableComponent },
  { path: 'backoffice-person', component: BackofficePersonComponent },
  { path: 'backoffice-family', component: BackofficeFamilyComponent },
  { path: 'backoffice-comment', component: BackofficeCommentComponent },
  { path: 'backoffice', component: BackofficeComponent },
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
