import {
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DodoService } from '../dodo.service';

@Component({
  selector: 'app-gestion-joueurs',
  templateUrl: './gestion-joueurs.component.html',
  styleUrls: ['./gestion-joueurs.component.scss'],
})
export class GestionJoueursComponent implements OnInit {
  @Input() data: any;
  public joueurClicked: any;
  public nomJoueur: any;
  public add: any;

  constructor(private dodoService: DodoService) {}

  ngOnInit(): void {
    this.nomJoueur = '';
    this.add = false;
    this.dodoService.zoom(this.data);
  }

  public click(joueur: any) {
    if (this.joueurClicked == joueur) {
      this.data.joueurs.splice(this.data.joueurs.indexOf(joueur), 1);
    } else {
      this.joueurClicked = joueur;
    }
  }

  public clickAdd() {
    this.joueurClicked = undefined;
    if (this.add == true) {
      this.data.joueurs.push({ nom: this.nomJoueur });
      this.nomJoueur = '';
      this.add = false;
    } else {
      this.add = true;
    }
  }
}
