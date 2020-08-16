import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  paises: any[] = [];

  constructor(private paisService: PaisService) { }

  usuario = {
    nombre: 'Jose Armando',
    apellidos: 'Guzman',
    email: 'jose@gmail.com',
    pais: 'CRI',
    genero: 'M'
  };

  ngOnInit(): void {
    this.paisService.getPaises()
      .subscribe(paises => {
        this.paises = paises;
        this.paises.unshift({
          nombre: '[Seleccione un pais]',
          codigo: ''
        });
      });
  }
  // tslint:disable-next-line: typedef
  guardar(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach( control => {
        control.markAsTouched();
      });
      return;
    }
  }
}
