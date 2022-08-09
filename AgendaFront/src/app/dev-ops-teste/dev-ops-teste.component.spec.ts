import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevOpsTesteComponent } from './dev-ops-teste.component';

describe('DevOpsTesteComponent', () => {
  let component: DevOpsTesteComponent;
  let fixture: ComponentFixture<DevOpsTesteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevOpsTesteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevOpsTesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
