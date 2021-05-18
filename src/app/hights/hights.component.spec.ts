import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HightsComponent } from './hights.component';

describe('HightsComponent', () => {
  let component: HightsComponent;
  let fixture: ComponentFixture<HightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
