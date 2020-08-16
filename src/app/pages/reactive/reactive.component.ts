import { Component, OnInit } from '@angular/core';
import { ValidadoresService } from '../../services/validadores.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private validadoresService: ValidadoresService) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  get pasatiempos() {
    return this.form.get('pasatiempos') as FormArray;
  }

  // tslint:disable-next-line: typedef
  get nombreNoValido() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  // tslint:disable-next-line: typedef
  get apellidoNoValido() {
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }

  // tslint:disable-next-line: typedef
  get correoNoValido() {
    return this.form.get('correo').invalid && this.form.get('correo').touched;
  }

  // tslint:disable-next-line: typedef
  get usuarioNoValido() {
    return this.form.get('usuario').invalid && this.form.get('usuario').touched;
  }

  // tslint:disable-next-line: typedef
  get distritoNoValido() {
    return this.form.get('direccion.distrito').invalid && this.form.get('direccion.distrito').touched;
  }

  // tslint:disable-next-line: typedef
  get cuidadNoValido() {
    return this.form.get('direccion.cuidad').invalid && this.form.get('direccion.cuidad').touched;
  }

  // tslint:disable-next-line: typedef
  get passNoValido() {
    return this.form.get('pass1').invalid && this.form.get('pass1').touched;
  }

  // tslint:disable-next-line: typedef
  get pass2NoValido() {
    const pass1 = this.form.get('pass1').value;
    const pass2 = this.form.get('pass2').value;
    return (pass1 === pass2) ? false : true;
  }

  // tslint:disable-next-line: typedef
  crearFormulario() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, this.validadoresService.noGuzman]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', , this.validadoresService.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.formBuilder.group({
        distrito: ['', Validators.required],
        cuidad: ['', Validators.required],
      }),
      pasatiempos: this.formBuilder.array([])
    }, {
      validators: this.validadoresService.passwordIguales('pass1', 'pass2')
    });
  }

  // tslint:disable-next-line: typedef
  crearListeners() {
/*     this.form.valueChanges.subscribe(valor => {
      console.log(valor);
    });
    this.form.statusChanges.subscribe(status => {
      console.log(status);
    }); */
    this.form.get('nombre').valueChanges.subscribe( console.log);
  }

  // tslint:disable-next-line: typedef
  cargarDataAlFormulario() {
    /* this.form.setValue({ */
    this.form.reset({
      nombre: 'Jose A',
      apellido: 'Guzman',
      correo: 'jose@gmail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        distrito: 'Limalimon',
        cuidad: 'Limalimon'
      }
    });
    /* ['comer', 'dormir'].forEach( valor => this.pasatiempos.push(this.formBuilder.control(valor))); */
  }

  // tslint:disable-next-line: typedef
  agregarPasatiempo() {
    this.pasatiempos.push(this.formBuilder.control(''));
  }

  // tslint:disable-next-line: typedef
  borrarPasatiempo(i: number){
    this.pasatiempos.removeAt(i);
  }

  // tslint:disable-next-line: typedef
  guardar() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach( control => {
        if (control instanceof FormGroup) {
          Object.values( control.controls).forEach(controles => controles.markAsTouched());
        } else {
            control.markAsTouched();
        }
      });
    }
    // Posteo de la información
    // Limpieza de los inputs
    this.form.reset({
      nombre: ''
    });
  }
}
