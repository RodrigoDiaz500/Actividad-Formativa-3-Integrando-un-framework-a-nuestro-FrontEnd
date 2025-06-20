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

    // Obtener referencia al footer y guardar su color original
    this.footerElement = document.getElementById('main-footer');
    if (this.footerElement) {
      // Usar getComputedStyle para obtener el color real del CSS
      this.originalFooterColor = getComputedStyle(this.footerElement).backgroundColor;
    }

    // Añadir el listener para el scroll
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

  // Validador para la edad mínima
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

  // Validador a nivel de grupo para que las contraseñas coincidan
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    // Si los controles no existen o las contraseñas coinciden, no hay error.
    if (!password || !confirmPassword || password.value === confirmPassword.value) {
      // Si antes había un error 'mismatch' en confirmPassword, lo limpiamos ahora.
      if (confirmPassword && confirmPassword.hasError('mismatch')) {
        // Asegúrate de que el control esté marcado como touched/dirty para que la interfaz se actualice
        confirmPassword.setErrors(null);
      }
      return null;
    }

    // Si las contraseñas no coinciden, establece el error 'mismatch' en 'confirmPassword'
    // Esto asegura que el mensaje de error se muestre debajo de 'Confirmar Contraseña'.
    confirmPassword.setErrors({ mismatch: true });
    // Y devuelve un error a nivel de grupo si lo necesitas para la lógica global del formulario.
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

  // --- Funciones para el color del footer (manteniendo la lógica en AppComponent es más coherente) ---
  // Si decidimos mover la lógica del footer al FooterComponent, estas funciones
  // deberían ir en FooterComponent y emitir un evento si App necesita saber el estado.
  updateFooterColor(isValid: boolean): void {
    if (this.footerElement) {
      this.footerElement.style.backgroundColor = isValid ? '#27ae60' : '#e74c3c'; // Verde para válido, Rojo para inválido
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
        this.footerElement.style.backgroundColor = '#4A90E2'; // Color azul al hacer scroll
        this.footerElement.style.transition = 'background-color 0.5s ease-in-out';
      } else {
        this.resetFooterColor();
      }
    }
  };

  // --- Funciones del Formulario ---
  onSubmit(): void {
    this.formMessage = ''; // Limpiar mensaje anterior
    this.registroForm.markAllAsTouched(); // Asegura que todos los errores sean visibles

    if (this.registroForm.valid) {
      console.log('Formulario válido:', this.registroForm.value);
      this.formMessage = '¡Registro exitoso! Tus datos han sido enviados.';
      this.formMessageSuccess = true;
      this.updateFooterColor(true); // Actualiza color del footer a éxito

      setTimeout(() => {
        this.registroForm.reset(); // Restablece el formulario a su estado inicial
        this.formMessage = '';
        this.formMessageSuccess = false;
        this.resetFooterColor(); // Restablece el color del footer
        // Los errores se limpian automáticamente al resetear el formulario reactivo
      }, 1500);

    } else {
      console.log('Formulario inválido');
      this.formMessage = 'Por favor, corrige los errores en el formulario.';
      this.formMessageSuccess = false;
      this.updateFooterColor(false); // Actualiza color del footer a error
      // Opcional: enfocar el primer campo inválido para mejorar la UX
      // const firstInvalidControl = Object.keys(this.registroForm.controls).find(name => this.registroForm.controls[name].invalid);
      // if (firstInvalidControl) {
      //   document.getElementById(firstInvalidControl)?.focus();
      // }
    }
  }

  onReset(): void {
    this.registroForm.reset();
    this.formMessage = '';
    this.formMessageSuccess = false;
    this.resetFooterColor();
    // Resetear también los tipos de campo de contraseña si se desea que vuelvan a ser 'password'
    this.passwordFieldType = 'password';
    this.confirmPasswordFieldType = 'password';
  }
}