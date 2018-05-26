import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpookyComponent } from './spooky.component';

describe('SpookyComponent', () => {
  let component: SpookyComponent;
  let fixture: ComponentFixture<SpookyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpookyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpookyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
