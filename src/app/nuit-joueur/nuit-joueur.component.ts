import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { DodoService } from '../dodo.service';

@Component({
  selector: 'app-nuit-joueur',
  templateUrl: './nuit-joueur.component.html',
  styleUrls: ['./nuit-joueur.component.scss'],
})
export class NuitJoueurComponent implements OnInit {
  @Input() data: any;
  @Input() joueur: any;

  constructor(private dodoService: DodoService) {}

  ngOnInit(): void {
    this.dodoService.zoom(this.data);
  }
}
