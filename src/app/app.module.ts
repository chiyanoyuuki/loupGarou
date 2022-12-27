import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GestionJoueursComponent } from './gestion-joueurs/gestion-joueurs.component';
import { GestionRolesComponent } from './gestion-roles/gestion-roles.component';
import { RoleToChoseComponent } from './role-to-chose/role-to-chose.component';
import { AttributionRolesComponent } from './attribution-roles/attribution-roles.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NuitJoueurComponent } from './nuit-joueur/nuit-joueur.component';
import { CarteJoueurComponent } from './carte-joueur/carte-joueur.component';
import { RolesJoueurComponent } from './roles-joueur/roles-joueur.component';
import { NuitComponent } from './nuit/nuit.component';
import { VotesComponent } from './votes/votes.component';

@NgModule({
  declarations: [
    AppComponent,
    GestionJoueursComponent,
    GestionRolesComponent,
    RoleToChoseComponent,
    AttributionRolesComponent,
    NuitJoueurComponent,
    CarteJoueurComponent,
    RolesJoueurComponent,
    NuitComponent,
    VotesComponent,
  ],
  imports: [BrowserModule, FormsModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
