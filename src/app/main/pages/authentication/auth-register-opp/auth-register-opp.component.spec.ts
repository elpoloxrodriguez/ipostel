import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegisterOppComponent } from './auth-register-opp.component';

describe('AuthRegisterOppComponent', () => {
  let component: AuthRegisterOppComponent;
  let fixture: ComponentFixture<AuthRegisterOppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthRegisterOppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthRegisterOppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
