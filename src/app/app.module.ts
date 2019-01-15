import { BackofficeGuard } from './guards/backoffice.guard';
import { PersonsService } from './providers/persons.service';
import { CommentsService } from './providers/comments.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { NewCommentComponent } from './components/new-comment/new-comment.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonasComponent } from './components/personas/personas.component';
import { FamiliasComponent } from './components/familias/familias.component';
import { RegistroComponent } from './components/registro/registro.component';
import { FamilysService } from './providers/familys.service';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComentariosGuard } from './guards/comentarios.guard';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { ComentariosDetalleComponent } from './components/comentarios-detalle/comentarios-detalle.component';
import { FamiliaDetalleComponent } from './components/familia-detalle/familia-detalle.component';
import { PersonaDetalleComponent } from './components/persona-detalle/persona-detalle.component';
import { PerilComponent } from './components/peril/peril.component';
import { BackofficeComponent } from './components/backoffice-seccion/backoffice/backoffice.component';
import { BackofficeNavbarComponent } from './components/backoffice-seccion/backoffice-navbar/backoffice-navbar.component';
import { BackofficePersonComponent } from './components/backoffice-seccion/backoffice-person/backoffice-person.component';
import { BackofficeFamilyComponent } from './components/backoffice-seccion/backoffice-family/backoffice-family.component';
import { BackofficeCommentComponent } from './components/backoffice-seccion/backoffice-comment/backoffice-comment.component';
import { BackofficePersonEditableComponent } from './components/backoffice-seccion/backoffice-person-editable/backoffice-person-editable.component';
import { BackofficeFamilyDetailComponent } from './components/backoffice-seccion/backoffice-family-detail/backoffice-family-detail.component';
import { BackofficeCommentsEditableComponent } from './components/backoffice-seccion/backoffice-comments-editable/backoffice-comments-editable.component';
import { NewFamilyComponent } from './components/new-family/new-family.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PageNotFoundComponent,
    NavbarComponent,
    HomeComponent,
    HeaderComponent,
    NewCommentComponent,
    PersonasComponent,
    FamiliasComponent,
    RegistroComponent,
    LoginComponent,
    ComentariosComponent,
    ComentariosDetalleComponent,
    FamiliaDetalleComponent,
    PersonaDetalleComponent,
    PerilComponent,
    BackofficeComponent,
    BackofficeNavbarComponent,
    BackofficePersonComponent,
    BackofficeFamilyComponent,
    BackofficeCommentComponent,
    BackofficePersonEditableComponent,
    BackofficeFamilyDetailComponent,
    BackofficeCommentsEditableComponent,
    NewFamilyComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [

    CommentsService,
    PersonsService,
    FamilysService,
    ComentariosGuard,
    BackofficeGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
