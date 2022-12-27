import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { DodoService } from '../dodo.service';

@Component({
  selector: 'app-gestion-roles',
  templateUrl: './gestion-roles.component.html',
  styleUrls: ['./gestion-roles.component.scss'],
})
export class GestionRolesComponent implements OnInit {
  @Input() data: any;
  public reste: any;

  constructor(private dodoService: DodoService) {}

  ngOnInit(): void {
    this.data.cartesRestantes = this.data.joueurs.length;
    let roles = this.data.roles;
    for (let i = 0; i < roles.length; i++) {
      this.data.cartesRestantes -= roles[i].count;
    }
    this.dodoService.zoom(this.data);
  }

  public clickDodo() {
    this.dodoService.dodo(this.data);
  }
}
