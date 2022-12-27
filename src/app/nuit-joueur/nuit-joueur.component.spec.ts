import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuitJoueurComponent } from './nuit-joueur.component';

describe('CarteJoueurComponent', () => {
  let component: NuitJoueurComponent;
  let fixture: ComponentFixture<NuitJoueurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NuitJoueurComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NuitJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
