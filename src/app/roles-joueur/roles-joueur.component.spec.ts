import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesJoueurComponent } from './roles-joueur.component';

describe('CarteJoueurComponent', () => {
  let component: RolesJoueurComponent;
  let fixture: ComponentFixture<RolesJoueurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RolesJoueurComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RolesJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
