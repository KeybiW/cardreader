import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfoPageComponent } from './edit-info-page.component';

describe('EditInfoPageComponent', () => {
  let component: EditInfoPageComponent;
  let fixture: ComponentFixture<EditInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInfoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
