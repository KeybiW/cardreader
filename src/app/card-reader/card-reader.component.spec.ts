import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReaderComponent } from './card-reader.component';

describe('CardReaderComponent', () => {
  let component: CardReaderComponent;
  let fixture: ComponentFixture<CardReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardReaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
