import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuitComponent } from './nuit.component';

describe('NuitComponent', () => {
  let component: NuitComponent;
  let fixture: ComponentFixture<NuitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
