import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { DodoService } from '../dodo.service';

@Component({
  selector: 'app-roles-joueur',
  templateUrl: './roles-joueur.component.html',
  styleUrls: ['./roles-joueur.component.scss'],
})
export class RolesJoueurComponent implements OnInit {
  @Input() data: any;
  @Input() joueur: any;

  constructor(private dodoService: DodoService) {}

  ngOnInit(): void {
    this.dodoService.zoom(this.data);
  }
}
