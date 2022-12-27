import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteJoueurComponent } from './carte-joueur.component';

describe('CarteJoueurComponent', () => {
  let component: CarteJoueurComponent;
  let fixture: ComponentFixture<CarteJoueurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarteJoueurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarteJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
