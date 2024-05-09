import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailsModalComponent } from './card-details-modal.component';

describe('CardDetailsModalComponent', () => {
  let component: CardDetailsModalComponent;
  let fixture: ComponentFixture<CardDetailsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardDetailsModalComponent]
    });
    fixture = TestBed.createComponent(CardDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
