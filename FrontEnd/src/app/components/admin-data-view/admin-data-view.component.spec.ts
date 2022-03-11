import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDataViewComponent } from './admin-data-view.component';

describe('AdminDataViewComponent', () => {
  let component: AdminDataViewComponent;
  let fixture: ComponentFixture<AdminDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDataViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
