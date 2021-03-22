import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincharityadsComponent } from './admincharityads.component';

describe('AdmincharityadsComponent', () => {
  let component: AdmincharityadsComponent;
  let fixture: ComponentFixture<AdmincharityadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincharityadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincharityadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
