import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WargamesComponent } from './wargames.component';

describe('WargamesComponent', () => {
  let component: WargamesComponent;
  let fixture: ComponentFixture<WargamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WargamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WargamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
