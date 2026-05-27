import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({ 
  selector: 'app-login', 
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html', 
  styleUrl: './login.scss', 
})

export class Login { 
  private fb = inject(FormBuilder); 
  private auth = inject(AutService);
  private router = inject(Router);

  showPassword = false;
  errorMessage = signal('');

  form = this.fb.group({ 
    email: ['',[Validators.required, Validators.email]], 
    password: ['',[Validators.required, Validators.minLength(6)]] 
  })

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  } 

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsDirty();
      return;
    }
    console.log(this.form.value);
    const {email,password} = this.form.getRawValue();
    this.auth.login(email!,password!)
    .subscribe({
      next: () => this.router.navigateByUrl('/home'),
      error:(error: HttpErrorResponse)=>{
        console.log(error);
        console.log(error.status);
      }
    });
   
  }
} 
