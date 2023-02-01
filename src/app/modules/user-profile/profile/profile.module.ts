import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryComponent } from './history/history.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { InfoComponent } from './info/info.component';
import { AppRoutingModule } from 'src/app/app-routing.module';




@NgModule({
  declarations: [ProfileComponent, HistoryComponent, FavoritesComponent, InfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ]
})
export class ProfileModule { }
