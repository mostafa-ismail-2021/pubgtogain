import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminblacklistComponent } from './adminblacklist.component';

describe('AdminblacklistComponent', () => {
  let component: AdminblacklistComponent;
  let fixture: ComponentFixture<AdminblacklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminblacklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminblacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
