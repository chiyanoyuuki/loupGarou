import { Component, OnInit, Input } from '@angular/core';
import { DodoService } from '../dodo.service';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss'],
})
export class VotesComponent implements OnInit {
  @Input() data: any;
  public select: any = [];
  public superSelect: any;
  public interval: any;
  public timer: any;
  public endVote: any;
  public joueurVoted: any;
  public aleat: any;
  public recapOver: any;
  public win: any;

  constructor(private dodoService: DodoService) {}

  ngOnInit(): void {
    this.recapOver = false;
    this.dodoService.randomizeJoueurs(this.data);
    this.init();
  }

  public init() {
    console.log('recapOver', this.recapOver);
    this.win = undefined;
    this.checkIfWin();
    if (this.win != undefined) {
      this.data.page = 'win';
      return;
    }
    if (this.joueurVoted) {
      this.endVotePhase();
      return;
    } else if (this.data.page == 'recap' && !this.recapOver) {
      this.dodoService.zoom(this.data);
      this.recapOver = true;
      return;
    }
    this.joueurVoted = undefined;
    this.aleat = false;
    this.select = [];
    this.superSelect = '';
    this.endVote = false;
    let isPresident = this.getPresident() != undefined;
    console.log('isPresident', isPresident);
    if (!this.data.president || isPresident) {
      this.data.page = 'vote';
    } else {
      this.data.page = 'election';
    }
    this.startTimer();
    this.dodoService.zoom(this.data);
    console.log(this.data.page);
  }

  public canVote() {
    let tmp = 0;
    for (let i = 0; i < this.select.length; i++) {
      if (this.select[i] && !this.data.joueurs[i].dead && this.select[i] != '')
        tmp++;
    }
    let notDead = this.data.joueurs.filter((joueur: any) => !joueur.dead);
    return (
      tmp == notDead.length || (this.superSelect && this.superSelect != '')
    );
  }

  public startTimer() {
    this.timer = 8;
    this.interval = setInterval(() => {
      this.timer--;
      if (this.timer == 0) {
        this.endTimer(true);
      }
    }, 1000);
  }

  public getJoueursNotDead() {
    return this.data.joueurs.filter((joueur: any) => !joueur.dead);
  }

  public endTimer(timeOver: any) {
    if (this.data.page == 'recap') {
      this.init();
      return;
    } else if (this.endVote) {
      this.init();
      return;
    }
    clearInterval(this.interval);
    this.endVote = true;
    let joueur: any;
    if (timeOver) {
      this.aleat = true;
      let tmp = this.data.joueurs.filter(
        (joueur: any) => joueur.role.nom != 'Tueur'
      );
      let rdm = Math.floor(Math.random() * tmp.length);
      joueur = tmp[rdm];
    } else {
      if (this.superSelect && this.superSelect != '') {
        joueur = this.data.joueurs.find((j: any) => j.nom == this.superSelect);
      } else {
        let tmp: any = [];
        for (let i = 0; i < this.select.length; i++) {
          let nom = this.select[i];
          let found = tmp.find((x: any) => x.n == nom);
          if (nom != '') {
            if (found) {
              found.count++;
              if (this.data.joueurs[i].president) found.count++;
            } else tmp.push({ n: nom, count: 1 });
          }
        }
        tmp.sort((a: any, b: any) => {
          if (a.count < b.count) return 1;
          else return -1;
        });
        let nbMax = tmp[0].count;
        tmp = tmp.filter((x: any) => x.count == nbMax);
        for (let i = 0; i < tmp.length; i++) {
          let rdm = Math.floor(Math.random() * tmp.length);
          joueur = this.data.joueurs.find((j: any) => j.nom == tmp[rdm].n);
        }
      }
    }
    if (this.data.page == 'election') {
      joueur.president = true;
    } else {
      this.joueurVoted = joueur;
      this.dodoService.kill(this.data, joueur);
    }
  }

  public getPresident() {
    return this.data.joueurs.find((joueur: any) => joueur.president);
  }

  public endVotePhase() {
    this.data.tueursPassed = false;
    for (let i = 0; i < this.data.joueurs.length; i++) {
      this.data.joueurs[i].chuted = false;
    }
    this.data.startNight = true;
    this.clickDodo();
  }

  public clickDodo() {
    this.dodoService.dodo(this.data);
  }

  public checkIfWin() {
    let notDead = this.data.joueurs.filter((joueur: any) => !joueur.dead);
    let tmp = notDead.filter((joueur: any) => joueur.role.nom == 'Tueur');
    if (tmp.length == 0) {
      this.win = 'innocents';
    }
    tmp = notDead.filter((joueur: any) => joueur.role.nom != 'Tueur');
    if (tmp.length == 0) {
      this.win = 'tueurs';
    }
  }
}
