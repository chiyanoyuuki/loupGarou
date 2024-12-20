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
  public etape: string = "ajoutJoueurs";
  public interval: any;
  public persoClicked?: Joueur;
  public unanimite!: string;
  public zerotonine = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  public winners?: string;
  public loupPassed = false;
  public hasChanged = false;
  public select: string[] = [];
  public tour: number = 0;
  //public start: string = "dodo";
  public idx: number = 0;
  public timer: number = 180;
  public over = false;
  public kamikaze?: Joueur;
  public president = true;
  public nodeath: any;
  public death: any;
  public trompette: any;
  public badwin: any;
  public goodwin: any;
  public clickMend?: Role;
  public nuit: any;
  public tmpRoles: Role[] =
    [
      {
        showPlayers: true,
        nom: "Tueur",
        image: "tueur",
        description: "Vous pouvez tuer un autre joueur durant la nuit",
        role: "Les tueurs se mettent d'accord pour donner le numéro d'un joueur qu'ils attaqueront cette nuit",
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
        end: 1
      },
      {
        nom: "CEO",
        image: "hommeaffaire",
        description: "Vous pouvez user de votre argent pour accélérer drastiquement un vote",
        nb: 0,
        order: 1.8,
        use: 1
      },
      {
        nom: "Hamster",
        image: "hamster",
        description: "Vous avez deux vies",
        nb: 0,
        order: 999,
        life: 2
      },
      {
        nom: "Saint",
        image: "ange",
        description: "Vous êtes protégé tant qu'il y a un policier en vie",
        nb: 0,
        order: 999,
      },
      {
        showPlayers: true,
        nom: "Avocat",
        image: "avocat",
        description: "Vous protegez quelqu'un toutes les nuits",
        role: "Donnez le numéro d'un joueur qui sera protégé cette nuit",
        nb: 0,
        order: 1.5,
      },
      {
        nom: "Mendiant",
        image: "voleur",
        description: "Vous pouvez choisir entre deux rôles tirés aléatoirement au début de la partie",
        role: "Choisissez parmis les deux rôles, celui que vous incarnerez désormais",
        nb: 0,
        order: -1,
      },
      {
        showPlayers: true,
        nom: "Switcheur",
        image: "switcheur",
        description: "Vous pouvez échanger votre carte avec celle d'un autre joueur juste avant le levé du jour",
        role: "Choisissez un joueur avec qui échanger de rôles",
        nb: 0,
        order: 20,
      },
      {
        showPlayers: true,
        nom: "Relou",
        image: "relou",
        description: "Vous pouvez voler un vote lors de la journée",
        role: "Choisissez un joueur à qui voler le vote de la journée",
        nb: 0,
        order:2.1
      }
    ]
  
  public nbvol = 3;
  public tmpJoueurs: Joueur[] =
    [
      { "nom": "Dad" },
      { "nom": "Mum" },
      { "nom": "Alexandre" },
      { "nom": "Antoine" },
      { "nom": "Arthur" },
     /* { "nom": "Cesar" },
      { "nom": "Charles" },*/
    ];
  public changedName: string = "";
  public changingName = false;
  public roles!: Role[];
  public nomjoueur = "";
  public alarme: any;

  public joueurs!: Joueur[];

  ngOnInit() {
    this.alarme = new Audio();
    this.alarme.src = "./assets/alarme.mov";

    this.nodeath = new Audio();
    this.nodeath.src = "./assets/nodeath.mp3";

    this.death = new Audio();
    this.death.src = "./assets/death.mp3";

    this.nuit = new Audio();
    this.nuit.src = "./assets/nuit.mp3";

    this.trompette = new Audio();
    this.trompette.src = "./assets/trompette.mp3";

    this.badwin = new Audio();
    this.badwin.src = "./assets/badwin.mp3";

    this.goodwin = new Audio();
    this.goodwin.src = "./assets/goodwin.mp3";
  }

  public addPlayer() {
    if (this.nomjoueur.length < 3) { this.add = false; return; }
    this.tmpJoueurs[this.tmpJoueurs.length] = { "nom": this.nomjoueur };
    this.nomjoueur = "";
    this.add = false;
  }

  public clickJoueur(joueur: Joueur) {
    if (this.joueurSelected == joueur) { this.tmpJoueurs.splice(this.tmpJoueurs.indexOf(joueur), 1); }
    this.joueurSelected = joueur;
  }

  public addCarte(role: Role, nb: number) {
    role.nb += nb;
    this.totalCards += nb * -1;
  }

  public clickStart() {
    this.roles = [];
    this.joueurs = [];
    this.roles = JSON.parse(JSON.stringify(this.tmpRoles));
    this.joueurs = JSON.parse(JSON.stringify(this.tmpJoueurs));
    this.etape = "cartes";
    this.loupPassed = false;
    this.winners = undefined;
    this.kamikaze = undefined;
    this.idx = 0;
    this.persoClicked = undefined;
    this.tour = 0;
    let nb = this.joueurs.length;
    let total = 0;
    for (let i = 0; i < this.roles.length; i++) {
      total += this.roles[i].nb;
    }
    this.totalCards = nb - total;
  }

  public validCartes() {
    console.log(this.joueurs);
    for (let i = 0; i < this.roles.length; i++) {
      let role = this.roles[i];
      let nb = role.nb;
      for (let j = 0; j < nb; j++) {
        let joueursWoRole = this.joueurs.filter((joueur: Joueur) => !joueur.role);
        let rdm = Math.floor(Math.random() * joueursWoRole.length);
        let joueur = joueursWoRole[rdm];
        joueur.role = JSON.parse(JSON.stringify(role));
        if (role.image == "voleur") joueur.alias = JSON.parse(JSON.stringify(role));
        if (role.nom == "Voyant")
          joueur.voyant = [];
        let tmp = this.roles.find((role: Role) => role.nom == joueur.role?.nom)?.nb;
        if (tmp && tmp > 1 && joueur.role?.nom != "Tueur") {
          joueur.nb = "" + this.joueurs.filter((j: Joueur) => j.role?.nom == joueur.role?.nom).length;
        }
      }
    }

    for (let j = 0; j < this.totalCards; j++) {
      let joueursWoRole = this.joueurs.filter((joueur: Joueur) => !joueur.role);
      let rdm = Math.floor(Math.random() * joueursWoRole.length);
      let joueur = joueursWoRole[rdm];
      joueur.role = this.roles.find((role: Role) => role.nom == "Innocent");
    }

    for (let i = 0; i < this.roles.length; i++) {
      this.tmpRoles[i].nb = this.roles[i].nb;
    }


    let voleurs = this.joueurs.filter((joueur: Joueur) => joueur.role!.image == 'voleur');

    if (voleurs) {
      console.log("voleur detected");
      for (let x = 0; x < voleurs.length; x++) {
        console.log("voleur " + x);
        let role = voleurs[x].role;
        if (role) {
          role.reste = [];
          if (role.reste) {
            for (let i = 0; i < this.nbvol; i++) {
              {
                let tmp = this.getVolRoles(role.reste);
                let rdm = Math.floor(Math.random() * tmp.length);
                role.reste[i] = tmp[rdm];
              }
            }
          }
        }
        console.log(this.joueurs[x]);
      }
    }

    this.clickNextRole();
    this.etape = "dodo";
    this.nuit.play();
  }

  public getVolRoles(reste:Role[])
  {
    let roles = [];
    console.log(reste);
    console.log(this.roles);
    let alreadySeduc = this.joueurs.find((j:any)=>j.role.nom=="Seducteur")!=undefined;
    roles = this.roles.filter((r: Role) => reste.find((rest:any)=>rest.nom==r.nom)==undefined && r.nom != "Innocent" && r.nom != "Switcheur" && r.image != "voleur" && (alreadySeduc?r.nom!="Seducteur":true));
    return roles;
  }

  public addNbVol(i:number)
  {
    if(i==-1&&this.nbvol>2)this.nbvol--;
    else if(i==1)
    {
      let nb= this.tmpRoles.filter((r: Role) => r.nom != "Innocent" && r.nom != "Switcheur" && r.image != "voleur").length;
      if(this.nbvol<nb)this.nbvol++;
    }
  }

  clickNextJoueur() {
    console.log("selected",this.joueurSelected);

    this.hasChanged = false;
    if (this.clickMend) {
      this.joueurSelected.role = this.clickMend;
      if (this.clickMend.nom == "Voyant") this.joueurSelected.voyant = [];
      this.clickMend = undefined;
      this.startNuit();
      return;
    }
    if (this.joueurSelected.role!.nom == "Tueur") {
      if (this.persoClicked) this.kill(this.persoClicked);
      this.persoClicked = undefined;
    }
    else if (this.joueurSelected.role!.nom == "Avocat") {
      if (this.persoClicked) {
        if (this.persoClicked.role?.nom == "CEO") this.persoClicked.role.use = 1;
        this.persoClicked.protected = true;
        this.persoClicked = undefined;
      }
    }
    else if (this.joueurSelected.role!.nom == "Relou") {
      if (this.persoClicked) {
        if(!this.persoClicked.vote)this.persoClicked.vote = 0;
        if(!this.joueurSelected.vote)this.joueurSelected.vote = 0;

        this.persoClicked.vote = this.persoClicked.vote-1;
        this.joueurSelected.vote = this.joueurSelected.vote+1;
        this.persoClicked = undefined;
      }
    }
    if (this.idx >= this.joueurs.length) { this.endNuit(); return; }
    this.joueurSelected = this.joueurs[this.idx];
    if (this.joueurSelected.role?.order == 999) { this.endNuit(); return; }
    this.idx++;
    this.persoClicked = undefined;
    this.over = false;
    let role = this.joueurSelected.role;
    if (role) {
      if(this.joueurSelected.defkilled){ this.clickNextJoueur(); return; }
      if (role.nom == "CEO" && role.use == 0) { this.clickNextJoueur(); return; }
      if (this.joueurSelected.killed && role.nom != "Docteur") { this.clickNextJoueur(); return; }
      if (role.end) { if (role.end <= this.tour) { this.clickNextJoueur(); return; } }
      if (this.loupPassed && role.nom == "Tueur") { this.clickNextJoueur(); return; }
      if (role.nom == "Tueur") this.loupPassed = true;
    }
  }

  clickChasseur(joueur: Joueur) {
    this.kill(joueur);
    this.checkIfWin();
  }

  isHAPower() {
    let retour = false;
    for (let i = 0; i < this.joueurs.length; i++) {
      let joueur = this.joueurs[i];
      if (joueur.role?.nom == "CEO" && !joueur.killed && joueur.role?.use && joueur.role?.use > 0) retour = true;
    }
    return retour;
  }

  showPlayer(joueurToShow: Joueur) {
    let joueurActuel = this.joueurSelected;
    if (joueurToShow.out) return false;
    //L'avocat ne voit pas un joueur déjà protégé au tour d'avant
    if (joueurToShow.justProtected && joueurActuel.role?.nom == "Avocat") return false;


    //Le docteur et l'avocat se voient eux mêmes
    if (joueurToShow == joueurActuel && (joueurActuel.role?.nom == 'Docteur' || joueurActuel.role?.nom == 'Avocat' || joueurActuel.role?.nom == 'Seducteur')) return true;
    //Tous les autres joueurs lorsque pas Tueur
    if (joueurToShow != joueurActuel && joueurActuel.role?.nom != 'Tueur') return true;
    //Les tueurs ne sont pas dans la liste des tueurs
    if (joueurToShow.role?.nom != 'Tueur' && joueurActuel.role?.nom == 'Tueur') return true;

    return false;
  }

  showRed(joueurToRed: Joueur) {
    let joueurActuel = this.joueurSelected;

    //Le docteur voit le blessé s'il peut encore le soigner
    if (joueurToRed.killed && joueurActuel.role?.heal) return true;
    //Le seducteur voit les deux liés
    if (joueurActuel.role?.nom == 'Seducteur' && joueurToRed.linkedTo) return true;
    //Le seducteur voit la première personne liée
    if (this.persoClicked == joueurToRed) return true;
    //L'avocat voit son protégé
    if (joueurActuel.role?.nom == 'Avocat' && joueurToRed.protected) return true;

    return false;
  }

  showPlayers() {
    if (this.joueurSelected.role) {
      if (this.over && (this.joueurSelected.role.nom != "Voyant")) return false;
      if (this.joueurSelected.role!.showPlayers) return true;
    }

    return false;
  }

  endNuit() {
    //Fin protection avocat
    this.unanimite = "";
    for (let i = 0; i < this.joueurs.length; i++) {
      let j = this.joueurs[i];
      if (j.protected) {
        j.protected = false;
        j.justProtected = true;
      }
      else if (j.justProtected) {
        j.justProtected = false;
      }
    }
    this.nuit.pause();
    let morts = this.joueurs.filter((j: Joueur) => j.killed && !j.out);
    if (morts.length > 0) { this.death.play(); }
    else { this.nodeath.play(); }
    //Tri aleatoire
    let tmp = [];
    let size = this.joueurs.length;
    for (let i = 0; i < size; i++) {
      let rdm = Math.floor(Math.random() * this.joueurs.length);
      let joueur = this.joueurs[rdm];
      tmp.push(joueur);
      this.joueurs.splice(rdm, 1);
    }
    this.joueurs = tmp;
    this.timer = 180;
    this.startTimer();
    this.voteEnded = false;
    for (let i = 0; i < this.joueurs.length; i++) {
      this.joueurs[i].select = "";
    }
    this.checkIfSeducteur();
    this.checkIfWin();
    if (this.etape == "end") return;
    if (this.tour == 0 && this.president) {
      this.etape = "election";
    }
    else {
      let jo = this.joueurs.find((jo: Joueur) => jo.role?.used);
      if (jo) { this.timer = 40; jo.role!.used = false; }
      this.etape = "vote";
    }
  }

  checkIfSeducteur() {
    for (let i = 0; i < this.joueurs.length; i++) {
      let joueur = this.joueurs[i];
      if (joueur.killed && joueur.linkedTo) {
        if (!joueur.linkedTo.killed)
          joueur.linkedTo.killed = true;
      }
    }
  }

  clickPayer() {
    this.timer = 25;
    let joueur = this.findJoueur("CEO");
    if (joueur) joueur.role!.use = 0;
  }

  changeName() {
    if (this.changingName) {
      this.joueurSelected.nom = this.changedName;
      this.changedName = "";
      this.changingName = false;
    }
    else {
      let joueur = this.joueurSelected;
      this.changedName = joueur.nom!;
      this.changingName = true;
    }

  }

  findJoueur(nom: string) {
    return this.joueurs.find((joueur: Joueur) => joueur.role?.nom == nom);
  }

  endDay() {
    this.kamikaze = undefined;
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
    if (!this.kamikaze) {
      let maireDead = this.joueurs.find((joueur: Joueur) => joueur.maire)?.killed;
      if (maireDead && this.president) {
        this.etape = 'newMaire';
      }
      else {
        this.etape = 'dodo';
      }
    }
    else {
      this.etape = 'kamikaze';
    }
    this.tour++;
  }

  endVote() {
    this.alarme.pause();
    if (this.etape == "election" && this.president) {
      if (this.unanimite && this.unanimite != "") {
        let joueur = this.joueurs.find((j: Joueur) => j.nom == this.unanimite);
        joueur!.maire = true;
        this.trompette.play();
      }
      else {
        let tmp: { joueur: Joueur, qte: number }[] = [];
        for (let i = 0; i < this.joueurs.length; i++) {
          let joueur = this.joueurs[i];
          tmp[i] = { joueur: joueur, qte: this.joueurs.filter((j:any)=>j.select==joueur.nom).length };
        }
        tmp.sort((a, b) => (a.qte > b.qte ? -1 : 1));
        let tabtmp = tmp.filter((a: { joueur: Joueur, qte: number }) => a.qte == tmp[0].qte);
        let rdm = Math.floor(Math.random() * tabtmp.length);
        tmp[rdm].joueur.maire = true;
      }
      this.joueurs.forEach((j:any)=>j.select="");
      this.timer = 180;
      this.unanimite = "";
      let jo = this.joueurs.find((jo: Joueur) => jo.role?.used);
      if (jo) { this.timer = 40; jo.role!.used = false; }
      this.etape = "vote";
      this.voteEnded = false;
    }
    else {
      let j!: Joueur;
      if (this.unanimite && this.unanimite != "") {
        let tmp = this.joueurs.find((j: Joueur) => j.nom == this.unanimite);
        if (tmp) j = tmp;
      }
      else {
        console.log(this.joueurs);
        let tmp: { joueur: Joueur, qte: number }[] = [];
        let voteds = this.joueurs.filter((j:any)=>!j.killed);

        for (let i = 0; i < voteds.length; i++) {
          let voted = voteds[i];
          let qte = 0;
          
          for(let x=0;x<this.joueurs.length;x++)
          {
            let votant = this.joueurs[x];
            if(votant.select==voted.nom)
            {
              if(votant.vote)
              {
                qte+=votant.vote<1?0:votant.vote;
              }
              else
              {
                qte+=1;
              }
            }
          }
          tmp[i] = { joueur: voted, qte: qte };
        }
        for (let i = 0; i < this.joueurs.length; i++) {
          let joueur = this.joueurs[i];
          if (joueur.maire){
            let vote = joueur.select;
            let j = tmp.find((j:any)=>j.joueur.nom==vote);
            if(j)j.qte++;
          }
        }
        console.log(tmp);
        tmp = tmp.sort((a, b) => (a.qte > b.qte ? -1 : 1));
        let tabtmp = tmp.filter((a: { joueur: Joueur, qte: number }) => a.qte == tmp[0].qte);
        console.log(tabtmp);
        let rdm = Math.floor(Math.random() * tabtmp.length);
        j = tabtmp[rdm].joueur;
      }

      this.kill(j);

      if (j.linkedTo) {
        let jo = j.linkedTo;
        if (jo) {
          this.kill(jo);
        }
      }
      this.voteEnded = true;
      clearInterval(this.interval);
      this.checkIfWin();
    }

    this.joueurs.filter((j:any)=>j.killed&&!j.defkilled).forEach((j:any)=>j.defkilled=true);
  }

  showVotant(tab:any)
  {
    tab.forEach((t:any)=>console.log(t.nom+" "+t.vote+" "+t.select));
  }
  showQte(tab:any)
  {
    tab.forEach((t:any)=>console.log(t.nom+" "+t.qte));
  }

  checkIfWin() {
    let joueursRestants = this.joueurs.filter((j: Joueur) => !j.killed);
    if (joueursRestants.filter((joueur: Joueur) => joueur.role?.nom == "Tueur").length == 0) {
      this.etape = "end";
      this.winners = "Bravo aux innocents qui gagnent la partie !";
      this.goodwin.play();
    }
    else if (joueursRestants.filter((joueur: Joueur) => joueur.role?.nom != "Tueur").length == 0) {
      if (joueursRestants.length == 1) {
        this.etape = "end";
        this.winners = "Bravo au tueur qui gagne la partie en éliminant tous les innocents !";
        this.badwin.play();
      }
      else {
        this.etape = "end";
        this.winners = "Bravo aux tueurs qui gagnent la partie en éliminant tous les tueurs !";
        this.badwin.play();
      }
    }
    else if (joueursRestants.length == 2) {
      if (joueursRestants[0].linkedTo == joueursRestants[1]) {
        this.etape = "end";
        this.winners = "Bravo aux joueurs liés qui gagnent la partie ensemble et contre tous !";
        this.goodwin.play();
      }
      else if (!this.voteEnded) {
        this.etape = "end";
        this.winners = "Bravo au tueur qui gagne la partie en tuant le dernier joueur avant le début du vote !";
        this.badwin.play();
      }
    }
  }

  countSelect() {
    if (this.unanimite && this.unanimite != "") return 0;
    let tmp = 0;
    for (let i = 0; i < this.joueurs.length; i++) {
      let joueur = this.joueurs[i];
      if ((!joueur.select|| joueur.select == "") && !this.joueurs[i].killed) tmp++
    }
    return tmp;
  }

  startNuit() {
    if (this.nuit.paused) this.nuit.play();
    this.joueurs.sort((a, b) => {
      if (a.role!.order < b.role!.order) return -2;
      else if (a.role!.order > b.role!.order) return 2;
      else if (a.nb && b.nb && a.nb < b.nb) return -1
      else return 1;
    });
    this.idx = 0;
    this.persoClicked = undefined;
    this.joueurs.forEach((j:any)=>j.vote=1);
    this.over = false;
    this.loupPassed = false;
    this.etape = "nuit";
    this.clickNextJoueur();
  }

  clickNextRole() {
    this.persoClicked = undefined;
    if (this.idx == this.joueurs.length) {
      this.startNuit();
    }
    else {
      this.joueurSelected = this.joueurs[this.idx];
      this.idx = this.idx + 1;
    }
  }

  clickJoueurEnd(joueur: Joueur) {
    if (this.etape == "kamikaze") this.clickChasseur(joueur);
    else if (this.etape == "newMaire") this.newMaire(joueur);
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
      this.persoClicked = joueur;
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
    else if (this.joueurSelected.role?.nom == "Avocat") {
      this.persoClicked = joueur;
    }
    else if (this.joueurSelected.role?.nom == "Switcheur") {
      let roleprit = JSON.parse(JSON.stringify(joueur.role));
      if (joueur.alias) {
        let aliasprit = JSON.parse(JSON.stringify(joueur.alias));
        this.joueurSelected.alias = aliasprit;
        joueur.alias = undefined;
      }
      this.hasChanged = true;
      joueur.role = JSON.parse(JSON.stringify(this.joueurSelected.role));
      this.joueurSelected.role = roleprit;
      this.over = true;
    }
    else if(this.joueurSelected.role?.nom == "Relou") {
      this.persoClicked = joueur;
      this.over = true;
    }
  }


  public joueurBlesse() { return this.joueurs.find((joueur: Joueur) => joueur.killed && !joueur.out)?.nom }

  startTimer() {
    this.interval = setInterval(() => {
      this.timer -= 1;
      if (this.timer == 20) { this.alarme.play(); }
      if (this.timer == 0) {
        if (this.etape == "election" && this.president) {
          let joueursNotDead = this.joueurs.filter((joueur: Joueur) => !joueur.killed);
          let rdm = Math.floor(Math.random() * joueursNotDead.length);
          let joueur = joueursNotDead[rdm];
          joueur.maire = true;
          this.joueurs.forEach((j:any)=>j.select="");
          this.timer = 180;
          let jo = this.joueurs.find((jo: Joueur) => jo.role?.used);
          if (jo) { this.timer = 40; jo.role!.used = false; }
          this.etape = "vote";
        }
        else {
          let joueursNotDead = this.joueurs.filter((joueur: Joueur) => !joueur.killed && joueur.role?.nom != "Tueur");
          let rdm = Math.floor(Math.random() * joueursNotDead.length);
          let joueur = joueursNotDead[rdm];
          this.kill(joueur);
          this.voteEnded = true;
          clearInterval(this.interval);
        }
      }
    }, 1000)
  }

  isAlive(nom: string) {
    return this.joueurs.find((j: Joueur) => j.role?.nom == nom && !j.killed);
  }

  kill(joueur: Joueur) {
    console.log("Kill : "+joueur.nom);
    if (joueur.role && joueur.role.life == 2 && !joueur.protected) joueur.role.life--;
    else if (joueur.role?.nom == "Saint" && this.isAlive("Policier")) return;
    else if (joueur.protected) return;
    else joueur.killed = true;
  }

  getRolesRestants() {
    let tmp: Joueur[] = this.joueurs.filter((joueur: Joueur) => !joueur.killed);
    let tab: string[] = [];
    for (let i = 0; i < tmp.length; i++) {
      let j = tmp[i];
      if (j.alias) tab.push("" + j.alias?.nom);
      else tab.push("" + j.role?.nom);
    }
    let roles = [];
    for (let i = 0; i < this.roles.length; i++) {
      let role = this.roles[i];
      roles[i] = { role: role, qte: tab.filter((r: string) => r == role.nom).length };
    }
    return roles.filter((role: { role: Role, qte: number }) => role.qte > 0);
  }

  newMaire(joueur: Joueur) {
    this.joueurs.find((j: Joueur) => j.maire)!.maire = false;
    joueur.maire = true;
    this.etape = 'dodo';
  }
}