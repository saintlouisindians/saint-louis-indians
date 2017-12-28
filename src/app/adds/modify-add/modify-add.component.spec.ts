import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAddComponent } from './modify-add.component';

describe('ModifyAddComponent', () => {
  let component: ModifyAddComponent;
  let fixture: ComponentFixture<ModifyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
