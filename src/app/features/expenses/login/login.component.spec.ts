import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoginStrings } from '../../../strings/login.strings';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should create form with two controls", () => {
    expect(component.loginForm.contains('userName')).toBeTrue();
    expect(component.loginForm.contains('passWord')).toBeTrue();
  })

  it("should navigate to expense list with admin account", () => {
    expect(component.loginForm.setValue({ userName: "admin", passWord: "admin" }));
    component.loginAction();
    expect(component.router.navigate(['/expense-list']))
  })

  it("should failed to login", () => {
    expect(component.loginForm.setValue({userName:"test",passWord: "test"}));
    component.loginAction();
    expect(component.errorMessage).toBe(LoginStrings.loginError)
  })
});
