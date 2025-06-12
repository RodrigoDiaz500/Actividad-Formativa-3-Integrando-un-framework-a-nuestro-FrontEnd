import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Necesario para *ngIf
import { ReactiveFormsModule } from '@angular/forms'; // Necesario para formularios reactivos
import { ActivatedRoute, Router } from '@angular/router'; // Para la navegación, aunque no se usa directamente aquí todavía

@Component({
  selector: 'app-registro',
  standalone: true, // Indica que es un componente standalone en Angular 19
  imports: [CommonModule, ReactiveFormsModule], // Importa los módulos necesarios
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'] // Si tienes estilos específicos para este componente
})
export class RegistroComponent implements OnInit, OnDestroy {
  registroForm!: FormGroup; // Declaramos el FormGroup
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
  formMessage: string = '';
  formMessageSuccess: boolean = false;

  private footerElement: HTMLElement | null = null; // Para la referencia al footer
  private originalFooterColor: string = ''; // Para guardar el color original del footer

  constructor(private fb: FormBuilder, private router: Router) { } // Inyectamos FormBuilder

  ngOnInit(): void {
    // Inicializar el formulario reactivo con sus validadores
    this.registroForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18),
        Validators.pattern(/^(?=.*\d)(?=.*[A-Z]).{6,18}$/) // Al menos un número y una mayúscula
      ]],
      confirmPassword: ['', Validators.required],
      dob: ['', [Validators.required, this.minAgeValidator(13)]], // Validador personalizado para la edad
      address: [''] // Campo opcional
    }, { validators: this.passwordMatchValidator }); // Validador a nivel de grupo para que las contraseñas coincidan

    // Obtener referencia al footer y guardar su color original
    this.footerElement = document.getElementById('main-footer');
    if (this.footerElement) {
      this.originalFooterColor = this.footerElement.style.backgroundColor; // Guarda el color inline si existe
      // O si el color viene del CSS, podrías necesitar una forma más robusta de obtenerlo
      // this.originalFooterColor = getComputedStyle(this.footerElement).backgroundColor;
    }

    // Añadir el listener para el scroll (manipulación directa del DOM)
    window.addEventListener('scroll', this.handleScroll);

    // Lógica para añadir mensaje de bienvenida al header (si es un componente header dinámico)
    // Para Angular, esto sería mejor manejado en el HeaderComponent mismo con Inputs o un Servicio
    // Si realmente lo quieres aquí, tendrías que acceder al header a través del DOM o ViewChild,
    // pero no es la forma "Angular" de hacerlo.
    // Asumiendo que el `site-branding` está dentro del `HeaderComponent`, no lo haríamos desde aquí.
  }

  ngOnDestroy(): void {
    // Limpiar el listener del scroll cuando el componente se destruye para evitar fugas de memoria
    window.removeEventListener('scroll', this.handleScroll);
  }

  // Validador personalizado para la edad mínima
  minAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null; // No validar si el campo está vacío, Validators.required ya lo manejará
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

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      // Establece el error en 'confirmPassword' si no coinciden
      confirmPassword.setErrors({ mismatch: true });
      return { passwordMismatch: true }; // Error a nivel de FormGroup
    } else if (confirmPassword && confirmPassword.hasError('mismatch')) {
      // Si coinciden, limpia el error de 'mismatch' del confirmPassword
      confirmPassword.setErrors(null);
    }
    return null;
  }

  // Función para alternar la visibilidad de la contraseña
  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    } else if (field === 'confirmPassword') {
      this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
    }
  }

  // Función para actualizar el color del footer (similar a la del script original)
  updateFooterColor(isValid: boolean): void {
    if (this.footerElement) {
      this.footerElement.style.backgroundColor = isValid ? '#27ae60' : '#e74c3c';
    }
  }

  // Función para restablecer el color del footer
  resetFooterColor(): void {
    if (this.footerElement) {
      this.footerElement.style.backgroundColor = this.originalFooterColor; // Restaura el color original
    }
  }

  // Manejador del evento de scroll (usando una arrow function para mantener 'this' contexto)
  handleScroll = (): void => {
    if (this.footerElement) {
      if (window.scrollY > 150) {
        this.footerElement.style.backgroundColor = '#4A90E2';
        this.footerElement.style.transition = 'background-color 0.5s ease-in-out';
      } else {
        this.resetFooterColor(); // Vuelve al color original
      }
    }
  };

  // Función que se ejecuta al enviar el formulario
  onSubmit(): void {
    // Marca todos los controles como 'touched' para que se muestren los mensajes de validación
    this.registroForm.markAllAsTouched();

    if (this.registroForm.valid) {
      console.log('Formulario válido:', this.registroForm.value);
      this.formMessage = '¡Registro exitoso! Tus datos han sido enviados.';
      this.formMessageSuccess = true;
      this.updateFooterColor(true);

      setTimeout(() => {
        this.registroForm.reset(); // Restablece el formulario
        this.formMessage = '';
        this.formMessageSuccess = false;
        this.resetFooterColor();
        // Angular maneja automáticamente la eliminación de clases is-valid/is-invalid al resetear.
        // No necesitas iterar sobre los inputs como en JS vanilla.
      }, 1500);

    } else {
      console.log('Formulario inválido');
      this.formMessage = 'Por favor, llena la información solicitada correctamente.';
      this.formMessageSuccess = false;
      this.updateFooterColor(false);
    }
  }

  // Función que se ejecuta al resetear el formulario
  onReset(): void {
    this.registroForm.reset();
    this.formMessage = '';
    this.formMessageSuccess = false;
    this.resetFooterColor();
    // Angular maneja automáticamente la eliminación de clases is-valid/is-invalid al resetear.
    // No necesitas iterar sobre los inputs como en JS vanilla.
  }
}