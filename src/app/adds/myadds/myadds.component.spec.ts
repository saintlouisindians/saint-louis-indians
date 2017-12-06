import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaddsComponent } from './myadds.component';

describe('MyaddsComponent', () => {
  let component: MyaddsComponent;
  let fixture: ComponentFixture<MyaddsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyaddsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyaddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
