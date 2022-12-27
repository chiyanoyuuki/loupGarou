import {
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import DATA from '../assets/data.json';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { DodoService } from './dodo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      state(
        'open',
        style({
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          opacity: 0.1,
        })
      ),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('1s')]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  public data = DATA;
  public change: any;

  constructor(private dodoService: DodoService) {}

  ngOnInit(): void {
    this.data.screenHeight = screen.height;
    this.data.screenWidth = screen.width;
    this.dodoService.zoom(this.data);
  }
}
