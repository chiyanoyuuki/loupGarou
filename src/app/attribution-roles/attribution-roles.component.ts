import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { DodoService } from '../dodo.service';

@Component({
  selector: 'app-attribution-roles',
  templateUrl: './attribution-roles.component.html',
  styleUrls: ['./attribution-roles.component.scss'],
})
export class AttributionRolesComponent implements OnInit {
  @Input() data: any;

  constructor(private dodoService: DodoService) {}

  ngOnInit(): void {
    this.data.index = -1;
    this.reinit();
    this.distribuer();
    this.comblerAvecVillageois();
    this.ajouterCartesVoleurs();
    this.dodoService.zoom(this.data);
  }

  public reinit() {
    for (let i = 0; i < this.data.joueurs.length; i++) {
      this.data.joueurs[i] = { nom: this.data.joueurs[i].nom };
    }
    console.log(this.data);
  }

  public distribuer() {
    for (let i = 0; i < this.data.roles.length; i++) {
      let role = this.data.roles[i];
      let count = role.count;
      for (let j = 0; j < count; j++) {
        let joueursWoRole = this.data.joueurs.filter(
          (joueur: any) => !joueur.role
        );
        let rdm = Math.floor(Math.random() * joueursWoRole.length);
        let joueur = joueursWoRole[rdm];
        joueur.role = JSON.parse(JSON.stringify(role));
        if (role.image == 'voleur')
          joueur.alias = JSON.parse(JSON.stringify(role));
        let tmp = this.data.roles.find(
          (role: any) => role.nom == joueur.role.nom
        ).count;
        if (tmp > 1 && joueur.role.nom != 'Tueur') {
          joueur.numero =
            '' +
            this.data.joueurs.filter((j: any) => j.role.nom == joueur.role.nom)
              .length;
        }
      }
    }
  }

  public comblerAvecVillageois() {
    for (let j = 0; j < this.data.cartesRestantes; j++) {
      let joueursWoRole = this.data.joueurs.filter(
        (joueur: any) => !joueur.role
      );
      let rdm = Math.floor(Math.random() * joueursWoRole.length);
      let joueur = joueursWoRole[rdm];
      joueur.role = JSON.parse(
        JSON.stringify(
          this.data.roles.find((role: any) => role.nom == 'Innocent')
        )
      );
    }
  }

  public ajouterCartesVoleurs() {
    let voleurs = this.data.joueurs.filter(
      (joueur: any) => joueur.role.image == 'voleur'
    );

    if (voleurs) {
      for (let x = 0; x < voleurs.length; x++) {
        let role = voleurs[x].role;
        role.reste = [];
        for (let i = 0; i < 2; i++) {
          {
            let tmp = this.data.roles.filter(
              (r: any) =>
                !role.reste!.includes(r) &&
                r.nom != 'Innocent' &&
                r.nom != 'Switcheur' &&
                r.image != 'voleur'
            );
            let rdm = Math.floor(Math.random() * tmp.length);
            role.reste[i] = tmp[rdm];
          }
        }
      }
    }
  }

  public clickDodo() {
    this.dodoService.dodo(this.data);
  }
}
