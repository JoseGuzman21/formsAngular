import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  // tslint:disable-next-line: typedef
  existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {
    if ( !control.value ) {
      return Promise.resolve(null);
    }
    return new Promise( (resolve, reject) => {
      setTimeout( () => {
        if (control.value === 'strider') {
          resolve({ existe: true });
        } else {
          resolve(null);
        }
      }, 2500);
    });
  }

  // tslint:disable-next-line: typedef
  noGuzman(control: FormControl): ErrorValidate {
    if (control.value?.toLowerCase() === 'guzman') {
      return {
        noGuzman: true
      };
    }
    return null;
  }

  // tslint:disable-next-line: typedef
  passwordIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];
      if (pass1Control.value === pass2Control ) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }
}
