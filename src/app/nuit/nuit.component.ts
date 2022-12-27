import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { DodoService } from '../dodo.service';

@Component({
  selector: 'app-nuit',
  templateUrl: './nuit.component.html',
  styleUrls: ['./nuit.component.scss'],
})
export class NuitComponent implements OnInit {
  @Input() data: any;
  public clicked: any;
  public joueurs: any;

  constructor(private dodoService: DodoService) {}

  ngOnInit(): void {
    this.dodoService.sort(this.data);
    this.data.index = 0;
    this.dodoService.randomize(this.data);
    if (this.dodoService.skip(this.data)) {
      this.clickDodo();
    }
    this.getJoueurs();
    this.dodoService.zoom(this.data);
  }

  public getColor(joueur: any) {
    let roleActuel = this.data.joueurs[this.data.index].role;
    let color = 'white';
    if (joueur == this.clicked) color = 'red';
    if (joueur.dying && roleActuel.nom == 'Docteur' && roleActuel.killSkill)
      color = 'red';
    if (
      joueur.dying &&
      roleActuel.nom == 'Docteur' &&
      joueur == this.clicked &&
      roleActuel.healSkill
    )
      color = 'green';
    return color;
  }

  public getJoueurs() {
    let roleActuel = this.data.joueurs[this.data.index].role;
    if (!roleActuel.showPlayers) {
      this.joueurs = [];
      return;
    }
    if (
      roleActuel.nom == 'Docteur' &&
      !roleActuel.healSkill &&
      !roleActuel.killSkill
    ) {
      this.joueurs = [];
      return;
    }

    let joueurs = this.dodoService.getRandomize(this.data);
    joueurs = joueurs.filter((j: any) => !j.dead);

    this.joueurs = joueurs;
  }

  public canSeeRole(joueur: any) {
    let roleActuel = this.data.joueurs[this.data.index].role.nom;
    if (joueur.nom == this.data.joueurs[this.data.index].nom) return true;
    else if (roleActuel == 'Tueur' && joueur.role.nom == 'Tueur') return true;
    return false;
  }

  public clickDodo() {
    let roleActuel = this.data.joueurs[this.data.index].role;
    if (roleActuel.nom == 'Tueur') this.data.tueursPassed = true;

    if (this.clicked) {
      if (roleActuel.nom == 'Tueur') {
        this.tueur();
      } else if (roleActuel.nom == 'Docteur') {
        this.docteur();
      } else if (roleActuel.nom == 'Policier') {
        this.policier();
      }
    }

    this.dodoService.dodo(this.data);
    this.getJoueurs();
    this.clicked = undefined;
  }

  public tueur() {
    this.dodoService.set(this.data, this.clicked, 'dying', true);
  }

  public docteur() {
    let roleActuel = this.data.joueurs[this.data.index].role;
    if (roleActuel.healSkill && this.clicked.dying) {
      this.dodoService.set(this.data, this.clicked, 'dying', false);
      roleActuel.healSkill = false;
    } else if (roleActuel.killSkill) {
      this.dodoService.set(this.data, this.clicked, 'dying', true);
      roleActuel.killSkill = false;
    }
  }

  public policier() {
    this.dodoService.set(this.data, this.clicked, 'chuted', true);
  }
}
