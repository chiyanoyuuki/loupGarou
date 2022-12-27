import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { DodoService } from '../dodo.service';

@Component({
  selector: 'app-carte-joueur',
  templateUrl: './carte-joueur.component.html',
  styleUrls: ['./carte-joueur.component.scss'],
})
export class CarteJoueurComponent implements OnInit {
  @Input() role: any;
  @Input() data: any;
  @Input() type: any;

  constructor(private dodoService: DodoService) {}

  ngOnInit(): void {
    this.dodoService.zoom(this.data);
  }

  public isDying() {
    return this.data.joueurs.filter((joueur: any) => joueur.dying).length > 0;
  }

  public click(i: number) {
    this.role.count += i;
    this.data.cartesRestantes += i * -1;
  }
}
