import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNewAddComponent } from './post-new-add.component';

describe('PostNewAddComponent', () => {
  let component: PostNewAddComponent;
  let fixture: ComponentFixture<PostNewAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostNewAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostNewAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
