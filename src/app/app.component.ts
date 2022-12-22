import { Component } from '@angular/core';
import { Joueur, Role } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public totalCards!: number;
  public joueurSelected!: Joueur;
  public voteEnded!: boolean;
  public add: boolean = false;
  public start: string = "ajoutJoueurs";
  public interval: any;
  public persoClicked?: Joueur;
  public winners?: string;
  public loupPassed = false;
  public select: string[] = [];
  public tour: number = 0;
  //public start: string = "dodo";
  public idx: number = 0;
  public timer: number = 180;
  public over = false;
  public kamikaze?: Joueur;
  public tmpRoles: Role[] =
    [
      {
        showPlayers: true,
        nom: "Tueur",
        image: "tueur",
        description: "Vous pouvez tuer un autre joueur durant la nuit",
        role: "Les loups se mettent d'accord pour donner le numéro d'un joueur qu'ils tueront cette nuit",
        nb: 1,
        order: 3
      },
      {
        nom: "Innocent",
        image: "innocent",
        description: "Vous ne jouez pas la nuit, mais participez au vote du village la journée",
        nb: 0,
        order: 999
      },
      {
        showPlayers: true,
        nom: "Docteur",
        image: "docteur",
        description: "Vous pouvez aider un joueur blessé ou donner un médicament douteux à un autre joueur durant la nuit",
        role: "Vous pouvez effectuer une seule des actions suivantes si vous le souhaitez ou vous rendormir",
        heal: true,
        kill: true,
        nb: 0,
        order: 4
      },
      {
        showPlayers: true,
        nom: "Policier",
        image: "policier",
        description: "Vous pouvez empêcher quelqu'un de parler pendant la journée",
        role: "Donnez le numéro d'un joueur qui ne pourra pas parler durant la journée",
        nb: 0,
        order: 1
      },
      {
        showPlayers: true,
        nom: "Voyant",
        image: "voyant",
        description: "Vous pouvez regarder la carte d'un autre joueur toutes les nuits",
        role: "Donnez le numéro d'un joueur dont vous voulez voir la carte",
        nb: 0,
        order: 2
      },
      {
        nom: "Kamikaze",
        image: "chasseur",
        description: "Vous pouvez emporter quelqu'un avec vous avant de mourir",
        nb: 0,
        order: 999
      },
      {
        showPlayers: true,
        nom: "Seducteur",
        image: "seducteur",
        description: "Vous pouvez lier deux personnes qui devront gagner ensemble ou mourir ensemble",
        role: "Donnez le numéro de deux joueurs qui seront liés jusqu'à la fin de la partie",
        nb: 0,
        order: 0,
        end: 0
      }
    ]
  public tmpJoueurs: Joueur[] =
    [
      { "nom": "Dad" },
      { "nom": "Mum" },
      { "nom": "Charline" },
      { "nom": "Arthur" },
      { "nom": "Cesar" }
    ];;
  public roles!: Role[];
  public nomjoueur = "";
  public alarme: any;

  public joueurs!: Joueur[];

  ngOnInit() {
    this.alarme = new Audio();
    this.alarme.src = "./assets/alarme.mov";
  }

  public addPlayer() {
    this.tmpJoueurs[this.tmpJoueurs.length] = { "nom": this.nomjoueur };
    this.nomjoueur = "";
    this.add = false;
  }

  public clickJoueur(joueur: Joueur) {
    if (this.joueurSelected == joueur) { this.tmpJoueurs.splice(this.tmpJoueurs.indexOf(joueur), 1); }
    this.joueurSelected = joueur;
  }

  addCarte(role: Role, nb: number) {
    role.nb += nb;
    this.totalCards += nb * -1;
  }

  public clickStart() {
    this.roles = [];
    this.joueurs = [];
    this.roles = JSON.parse(JSON.stringify(this.tmpRoles));
    this.joueurs = JSON.parse(JSON.stringify(this.tmpJoueurs));
    this.start = "cartes";
    this.loupPassed = false;
    this.winners = undefined;
    this.kamikaze = undefined;
    this.idx = 0;
    this.persoClicked = undefined;
    this.tour = 0;
    let nb = this.joueurs.length;
    this.totalCards = nb - 1;
  }

  public validCartes() {
    for (let i = 0; i < this.roles.length; i++) {
      let role = this.roles[i];
      let nb = role.nb;
      for (let j = 0; j < nb; j++) {
        let joueursWoRole = this.joueurs.filter((joueur: Joueur) => !joueur.role);
        let rdm = Math.floor(Math.random() * joueursWoRole.length);
        let joueur = joueursWoRole[rdm];
        joueur.role = role;
        if (role.nom == "Voyant")
          joueur.voyant = [];
        joueur.nb = this.joueurs.filter((j: Joueur) => j.role?.nom == joueur.role?.nom).length;
      }
    }

    for (let j = 0; j < this.totalCards; j++) {
      let joueursWoRole = this.joueurs.filter((joueur: Joueur) => !joueur.role);
      let rdm = Math.floor(Math.random() * joueursWoRole.length);
      let joueur = joueursWoRole[rdm];
      joueur.role = this.roles.find((role: Role) => role.nom == "Innocent");
    }

    this.clickNextRole();
    this.start = "dodo";
  }

  clickNextJoueur() {
    if (this.idx >= this.joueurs.length) { this.endNuit(); return; }
    this.joueurSelected = this.joueurs[this.idx];
    if (this.joueurSelected.role?.order == 999) { this.endNuit(); return; }
    this.idx++;
    this.persoClicked = undefined;
    this.over = false;
    if (this.joueurSelected.killed && this.joueurSelected.role?.nom != "Docteur") { this.clickNextJoueur(); return; }
    if (this.joueurSelected.role?.end && (this.joueurSelected.role?.end < this.tour)) { this.clickNextJoueur(); return; }
    if (this.loupPassed && this.joueurSelected.role?.nom == "Tueur") { this.clickNextJoueur(); return; }
    if (this.joueurSelected.role?.nom == "Tueur") this.loupPassed = true;
  }

  endNuit() {
    let tmp = [];
    let size = this.joueurs.length;
    for (let i = 0; i < size; i++) {
      let rdm = Math.floor(Math.random() * this.joueurs.length);
      let joueur = this.joueurs[rdm];
      tmp.push(joueur);
      this.joueurs.splice(rdm, 1);
    }
    this.joueurs = tmp;
    this.tour++;
    this.timer = 180;
    this.startTimer();
    this.voteEnded = false;
    for (let i = 0; i < this.joueurs.length; i++) {
      this.select[i] = "";
    }
    this.start = "vote";
  }

  endVote() {
    //CLIC CONTINUER
    if (this.voteEnded) {
      let killcupidon = undefined;
      for (let i = 0; i < this.joueurs.length; i++) {
        if (this.joueurs[i].killed && !this.joueurs[i].out) {
          let joueur = this.joueurs[i];
          joueur.out = true;
          if (joueur.role?.nom == "Kamikaze") this.kamikaze = joueur;
        }
      }
      if (killcupidon) {
        this.kill(killcupidon);
      }
      if (!this.kamikaze) this.start = 'dodo';
      else this.start = 'kamikaze';
    }
    //VOTE
    else {
      let tmp = [];
      for (let i = 0; i < this.joueurs.length; i++) {
        let joueur = this.joueurs[i];
        tmp[i] = { joueur: joueur, qte: this.select.filter((sel: string) => sel == joueur.nom).length };
      }
      tmp.sort((a, b) => (a.qte > b.qte ? -1 : 1));
      tmp[0].joueur.killed = true;
      if (tmp[0].joueur.linkedTo) {
        let j = tmp[0].joueur.linkedTo;
        if (j) j.killed = true;
      }
      this.voteEnded = true;
      clearInterval(this.interval);
      this.checkIfWin();
    }
  }

  checkIfWin() {
    if (this.joueurs.filter((joueur: Joueur) => joueur.role?.nom == "Tueur" && !joueur.killed).length == 0) {
      this.start = "end";
      this.winners = "innocents";
    }
    else if (this.joueurs.filter((joueur: Joueur) => joueur.role?.nom != "Tueur" && !joueur.killed).length == 0) {
      this.start = "end";
      this.winners = "tueurs";
    }
  }

  countSelect() {
    let tmp = 0;
    for (let i = 0; i < this.joueurs.length; i++) {
      if (this.select[i] == "" && !this.joueurs[i].killed) tmp++
    }
    return tmp;
  }

  startNuit() {
    this.joueurs.sort((a, b) => (a.role!.order < b.role!.order ? -1 : 1));
    this.idx = 0;
    this.persoClicked = undefined;
    this.over = false;
    this.idx = 0;
    this.loupPassed = false;
    this.start = "nuit";
    this.clickNextJoueur();
  }

  clickNextRole() {
    if (this.idx == this.joueurs.length) {
      this.startNuit();
    }
    else {
      this.joueurSelected = this.joueurs[this.idx];
      this.idx = this.idx + 1;
    }

  }

  clickPlayer(joueur: Joueur) {
    if (this.over) return;

    if (this.joueurSelected.role?.nom == "Seducteur") {
      if (this.persoClicked) {
        this.persoClicked.linkedTo = joueur;
        joueur.linkedTo = this.persoClicked;
        this.over = true;
      }
      this.persoClicked = joueur;
    }
    else if (this.joueurSelected.role?.nom == "Voyant") {
      if (!this.joueurSelected.voyant?.includes(joueur)) {
        this.joueurSelected.voyant?.push(joueur);
        this.over = true;
        this.persoClicked = joueur;
      }
    }
    else if (this.joueurSelected.role?.nom == "Tueur") {
      if (!joueur.killed) {
        this.kill(joueur);
        this.persoClicked = joueur;
        this.over = true;
      }
    }
    else if (this.joueurSelected.role?.nom == "Docteur") {
      if (joueur.killed && this.joueurSelected.role.heal) {
        joueur.killed = false;
        this.joueurSelected.role.heal = false;
        this.over = true;
        this.persoClicked = undefined;
      }
      else if (this.joueurSelected.role.kill) {
        this.kill(joueur);
        this.joueurSelected.role.kill = false;
        this.over = true;
        this.persoClicked = joueur;
      }
    }
  }

  public joueurBlesse() { return this.joueurs.find((joueur: Joueur) => joueur.killed)?.nom }

  startTimer() {
    this.interval = setInterval(() => {
      this.timer -= 1;
      if (this.timer == 20) { this.alarme.play(); }
      if (this.timer == 0) {
        let joueursNotDead = this.joueurs.filter((joueur: Joueur) => !joueur.killed && joueur.role?.nom != "Tueur");
        let rdm = Math.floor(Math.random() * joueursNotDead.length);
        let joueur = joueursNotDead[rdm];
        this.kill(joueur);
        clearInterval(this.interval);
        this.voteEnded = true;
      }
    }, 1000)
  }

  kill(joueur: Joueur) {
    joueur.killed = true;
  }

  getRolesRestants() {
    let tmp: Joueur[] = this.joueurs.filter((joueur: Joueur) => !joueur.killed);
    let tab: string[] = [];
    for (let i = 0; i < tmp.length; i++) {
      let j = tmp[i];
      tab.push("" + j.role?.nom);
    }
    let roles = [];
    for (let i = 0; i < this.roles.length; i++) {
      let role = this.roles[i];
      roles[i] = { role: role, qte: tab.filter((r: string) => r == role.nom).length };
    }
    return roles.filter((role: { role: Role, qte: number }) => role.qte > 0);
  }
}