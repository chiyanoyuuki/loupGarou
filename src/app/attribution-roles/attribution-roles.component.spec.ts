import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributionRolesComponent } from './attribution-roles.component';

describe('AttributionRolesComponent', () => {
  let component: AttributionRolesComponent;
  let fixture: ComponentFixture<AttributionRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributionRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributionRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
