import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroComponent } from './registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroComponent, ReactiveFormsModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe ser inválido si el formulario está vacío', () => {
    expect(component.registroForm.valid).toBeFalse();
  });

  it('debe mostrar error si las contraseñas no coinciden', () => {
    component.registroForm.get('password')?.setValue('Test123!');
    component.registroForm.get('confirmPassword')?.setValue('Otro123!');
    component.registroForm.updateValueAndValidity();

    expect(component.registroForm.errors?.['passwordMismatch']).toBeTrue();
  });

  it('debería marcar error si la persona tiene menos de 13 años', () => {
  const dobControl = component.dob;
  const today = new Date();
  const lessThan13 = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate()).toISOString().substring(0, 10);

  dobControl?.setValue(lessThan13);
  expect(dobControl?.errors?.['minAge']).toBeTruthy();
});


});
