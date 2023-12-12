import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PhotosListComponent } from './components/photos-list/photos-list.component';
import { PhotoFormComponent } from './components/photo-form/photo-form.component';
import { PhotoPreviewComponent } from './components/photo-preview/photo-preview.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MyPhotosComponent } from './components/my-photos/my-photos.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';
import { SharedService } from './services/shared.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PhotosListComponent,
    PhotoFormComponent,
    PhotoPreviewComponent,
    LoginComponent,
    RegisterComponent,
    MyPhotosComponent,
    SearchResultsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ToastrModule.forRoot()
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
