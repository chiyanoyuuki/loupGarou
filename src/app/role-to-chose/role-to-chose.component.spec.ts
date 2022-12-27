import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleToChoseComponent } from './role-to-chose.component';

describe('RoleToChoseComponent', () => {
  let component: RoleToChoseComponent;
  let fixture: ComponentFixture<RoleToChoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleToChoseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleToChoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
