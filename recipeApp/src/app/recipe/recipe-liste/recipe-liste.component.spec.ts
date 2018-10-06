import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListeComponent } from './recipe-liste.component';

describe('RecipeListeComponent', () => {
  let component: RecipeListeComponent;
  let fixture: ComponentFixture<RecipeListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
