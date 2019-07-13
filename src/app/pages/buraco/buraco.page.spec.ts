import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuracoPage } from './buraco.page';

describe('BuracoPage', () => {
  let component: BuracoPage;
  let fixture: ComponentFixture<BuracoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuracoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuracoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
