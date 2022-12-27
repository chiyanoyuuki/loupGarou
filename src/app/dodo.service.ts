import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DodoService {
  public interval: any;
  public intervalZoom: any;

  constructor() {}

  public dodo(data: any) {
    if (!data.skipFade) data.dodo = true;
    this.interval = setInterval(
      () => {
        data.dodo = false;
        if (data.page == 'gestionRoles') data.page = 'attributionRoles';
        else if (data.page == 'attributionRoles') this.attributionRoles(data);
        else if (data.page == 'nuit') this.nuit(data);
        else if (data.startNight) {
          data.startNight = false;
          data.index = -1;
        } else if (data.page == 'vote' && data.index == -1) {
          this.sort(data);
          data.page = 'nuit';
          this.nuit(data);
        }

        clearInterval(this.interval);
      },
      data.skipFade ? 10 : 1000
    );
  }

  public zoom(data: any) {
    this.intervalZoom = setInterval(() => {
      let app: any = document.getElementById('app');
      let appHeight = app.offsetHeight;
      let appWidth = app.offsetWidth;
      let scale1 = data.screenHeight / appHeight;
      let scale2 = data.screenWidth / appWidth;
      data.scale = scale1 > scale2 ? scale2 : scale1;
      app.style.scale = data.scale;
      clearInterval(this.intervalZoom);
    }, 10);
  }

  public cloning(tab: any) {
    return JSON.parse(JSON.stringify(tab));
  }

  public randomize(data: any) {
    for (let i = 0; i < data.joueurs.length; i++) {
      data.joueurs[i].place = undefined;
    }
    for (let i = 0; i < data.joueurs.length; i++) {
      let tmp = data.joueurs.filter((j: any) => !j.place);
      let rdm = Math.floor(Math.random() * tmp.length);
      let jo = tmp[rdm];
      let joueur = data.joueurs.find((j: any) => j.nom == jo.nom);
      joueur.place = i;
    }
  }

  public randomizeJoueurs(data: any) {
    this.randomize(data);
    data.joueurs.sort((a: any, b: any) => {
      if (a.place < b.place) return -1;
      else return 1;
    });
  }

  public getRandomize(data: any) {
    let tmp = this.cloning(data.joueurs);
    return tmp.sort((a: any, b: any) => {
      if (a.place < b.place) return -1;
      else return 1;
    });
  }

  public attributionRoles(data: any) {
    if (data.index < data.joueurs.length - 1) {
      data.index++;
    } else {
      data.page = 'nuit';
    }
  }

  public nuit(data: any) {
    if (data.index == data.joueurs.length - 1) {
      this.checkMorts(data);
      data.page = 'recap';
      return;
    }
    data.index++;
    if (this.skip(data)) {
      this.nuit(data);
      return;
    }
    this.randomize(data);
  }

  public skip(data: any) {
    return (
      data.tueursPassed ||
      data.joueurs[data.index].dead ||
      data.joueurs[data.index].role.order == 999
    );
  }

  public checkMorts(data: any) {
    data.nightKills = [];
    for (let i = 0; i < data.joueurs.length; i++) {
      let joueur = data.joueurs[i];
      if (joueur.dying) {
        data.nightKills.push(joueur);
        this.kill(data, joueur);
      }
    }
  }

  public set(data: any, joueur: any, key: any, value: any) {
    this.find(data, joueur)[key] = value;
  }

  public find(data: any, joueur: any) {
    return data.joueurs.find((jo: any) => jo.nom == joueur.nom);
  }

  public kill(data: any, j: any) {
    let joueur = this.find(data, j);
    joueur.dying = false;
    joueur.dead = true;
  }

  public sort(data: any) {
    data.joueurs.sort((a: any, b: any) => {
      if (a.role.order < b.role.order) return -2;
      else if (a.role.order > b.role.order) return 2;
      else if (a.nb && b.nb && a.nb < b.nb) return -1;
      else return 1;
    });
  }
}
