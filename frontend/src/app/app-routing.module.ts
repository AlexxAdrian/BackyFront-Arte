import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotosListComponent } from './components/photos-list/photos-list.component';
import { PhotoFormComponent } from './components/photo-form/photo-form.component';
import { PhotoPreviewComponent } from './components/photo-preview/photo-preview.component';
import { MyPhotosComponent } from './components/my-photos/my-photos.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    {
        path: 'photos',
        component: PhotosListComponent,
        canActivate: [AuthGuard]
    },
    
    {
        path: 'photos/new',
        component: PhotoFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'photos/:id',
        component: PhotoPreviewComponent
    },
    {
        path: 'my-photos', 
        component: MyPhotosComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        redirectTo: '/photos',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }