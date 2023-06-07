import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryComponent } from './history/history.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { InfoComponent } from './info/info.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { UpdateComponent } from './update/update.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MaterialModule } from 'src/app/material/material/material.module';
import { DirectivesModule } from '../directives/directives.module';
import { MatSortModule } from '@angular/material/sort';
import { ReviewComponent } from './review/review.component';

@NgModule({
  declarations: [
    ProfileComponent,
    HistoryComponent,
    FavoritesComponent,
    InfoComponent,
    UpdateComponent,
    ChangePasswordComponent,
    ReviewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    DirectivesModule,
    MatSortModule
  ]
})
export class ProfileModule {}
