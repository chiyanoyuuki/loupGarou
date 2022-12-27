import { Component, OnInit, Input } from '@angular/core';
import { DodoService } from '../dodo.service';

@Component({
  selector: 'app-role-to-chose',
  templateUrl: './role-to-chose.component.html',
  styleUrls: ['./role-to-chose.component.scss'],
})
export class RoleToChoseComponent implements OnInit {
  @Input() role: any;
  @Input() data: any;

  constructor(private dodoService: DodoService) {}

  ngOnInit(): void {
    this.dodoService.zoom(this.data);
  }

  public click(i: number) {
    this.role.count += i;
    this.data.cartesRestantes += i * -1;
  }
}
