import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit, OnDestroy {
  registroForm!: FormGroup;
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
  formMessage: string = '';
  formMessageSuccess: boolean = false;

  private footerElement: HTMLElement | null = null;
  private originalFooterColor: string = '';

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,18}$/)
      ]],
      confirmPassword: ['', Validators.required],
      dob: ['', [Validators.required, this.minAgeValidator(13)]],
      address: ['']
    }, { validators: this.passwordMatchValidator });

    
    this.footerElement = document.getElementById('main-footer');
    if (this.footerElement) {
      this.originalFooterColor = getComputedStyle(this.footerElement).backgroundColor;
    }

    window.addEventListener('scroll', this.handleScroll);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll);
  }

  // --- Getters para acceso fácil en el HTML ---
  get fullName() { return this.registroForm.get('fullName'); }
  get username() { return this.registroForm.get('username'); }
  get email() { return this.registroForm.get('email'); }
  get password() { return this.registroForm.get('password'); }
  get confirmPassword() { return this.registroForm.get('confirmPassword'); }
  get dob() { return this.registroForm.get('dob'); }


  // --- Validadores Personalizados ---


  minAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const dob = new Date(control.value);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      return age >= minAge ? null : { minAge: { value: control.value, requiredAge: minAge, actualAge: age } };
    };
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');


    if (!password || !confirmPassword || password.value === confirmPassword.value) {
      if (confirmPassword && confirmPassword.hasError('mismatch')) {
        confirmPassword.setErrors(null);
      }
      return null;
    }

    confirmPassword.setErrors({ mismatch: true });
    return { passwordMismatch: true };
  }

  // --- Funciones para la visibilidad de la contraseña ---
  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    } else if (field === 'confirmPassword') {
      this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
    }
  }


  updateFooterColor(isValid: boolean): void {
    if (this.footerElement) {
      this.footerElement.style.backgroundColor = isValid ? '#27ae60' : '#e74c3c'; 
    }
  }

  resetFooterColor(): void {
    if (this.footerElement) {
      this.footerElement.style.backgroundColor = this.originalFooterColor;
    }
  }

  // Manejador del evento de scroll
  handleScroll = (): void => {
    if (this.footerElement) {
      if (window.scrollY > 150) {
        this.footerElement.style.backgroundColor = '#4A90E2'; 
        this.footerElement.style.transition = 'background-color 0.5s ease-in-out';
      } else {
        this.resetFooterColor();
      }
    }
  };

  // --- Funciones del Formulario ---
  onSubmit(): void {
    this.formMessage = ''; 
    this.registroForm.markAllAsTouched(); 

    if (this.registroForm.valid) {
      console.log('Formulario válido:', this.registroForm.value);
      this.formMessage = '¡Registro exitoso! Tus datos han sido enviados.';
      this.formMessageSuccess = true;
      this.updateFooterColor(true); 

      setTimeout(() => {
        this.registroForm.reset(); 
        this.formMessage = '';
        this.formMessageSuccess = false;
        this.resetFooterColor(); 
      }, 1500);

    } else {
      console.log('Formulario inválido');
      this.formMessage = 'Por favor, corrige los errores en el formulario.';
      this.formMessageSuccess = false;
      this.updateFooterColor(false); 

    }
  }

  onReset(): void {
    this.registroForm.reset();
    this.formMessage = '';
    this.formMessageSuccess = false;
    this.resetFooterColor();
    this.passwordFieldType = 'password';
    this.confirmPasswordFieldType = 'password';
  }
}