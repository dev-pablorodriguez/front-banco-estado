import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { DestinatariosService } from '../../../services/destinatarios.service';
import { BanksService } from '../../../services/banks.service';
import { getErrorsMessage } from '../../../../helpers'

@Component({
  selector: 'app-destinatarios',
  templateUrl: './destinatarios.component.html'
})
export class DestinatariosComponent implements OnInit {

  public destinatarios = [];
  public banks = [];

  //Action Box
  public isEditMode: boolean = false;

  //Form fields
  public id: string;
  public rut: string;
  public name: string;
  public email: string;
  public phone: string;
  public accountNumber: string;
  public selectedBank: string;

  constructor(
    private authService: AuthService,
    private destinatariosService: DestinatariosService,
    private banksService: BanksService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  
  ngOnInit() {
    if(this.authService.isAuthenticated()){
      
      this.cargarGrilla();
      this.cargarBancos();

    }else{
      this.router.navigate(['login']);
    }
  }

  cargarBancos(){
    this.banksService.getBanks()
      .subscribe( res => {
        this.banks = res.banks;

      }, ({ error }) => {
        this.toastr.info(error.msg, 'Error', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-danger",
          positionClass: 'toast-top-right'
        });
      });
  }

  cargarGrilla(){
    this.destinatariosService.getDestinatarios()
      .subscribe( res => {
        this.destinatarios = res.destinatarios;

      }, ({ error }) => {
        this.toastr.info(error.msg, 'Error', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-danger",
          positionClass: 'toast-top-right'
        });
      });
  }

  crearDestinatario(){
    const destinatario = {
      rut: this.rut,
      name: this.name,
      email: this.email,
      phone: this.phone,
      accountNumber: this.accountNumber,
      bank: this.selectedBank
    }

    this.destinatariosService.createDestinatario(destinatario)
      .subscribe( res => {
        this.limpiarFormulario();
        this.cargarGrilla();

        this.toastr.info('Destinatario creado.', 'Proceso Completado', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success",
          positionClass: 'toast-top-right'
        });

      }, ({ error }) => {
        console.log(error);

        this.toastr.info(getErrorsMessage(error.errors), 'Error', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-danger",
          positionClass: 'toast-top-right'
        });
      });
  }

  editarDestinatarioGrilla(id: string){
    this.entrarModoEdicion();
    const destinatario = this.destinatarios.filter( item => item._id === id)[0];
    const bank = this.banks.filter( item => item._id === destinatario.bank._id)[0];

    console.log(destinatario)

    alert('Implementar edición');
    return;
  }

  editarDestinatarioBox(){
    alert('Implementar edición');
    return;

    //Only email and phone can be modified
    const destinatario = {
      email: this.email,
      phone: this.phone
    }

    this.destinatariosService.updateDestinatario(this.id, destinatario)
      .subscribe( res => {
        this.limpiarFormulario();
        this.cargarGrilla();

        this.toastr.info('Destinatario modificado.', 'Proceso Completado', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success",
          positionClass: 'toast-top-right'
        });

      }, ({ error }) => {
        console.log(error);

        this.toastr.info(getErrorsMessage(error.errors), 'Error', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-danger",
          positionClass: 'toast-top-right'
        });
      });
  }

  cancelarEdicion(){
    this.salirModoEdicion();
    this.limpiarFormulario();
  }

  eliminarDestinatarioGrilla(id: string){
    this.salirModoEdicion();
    this.limpiarFormulario();

    this.destinatariosService.deleteDestinatario(id)
      .subscribe( res => {
        this.cargarGrilla();

        this.toastr.info('Destinatario eliminado.', 'Proceso Completado', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success",
          positionClass: 'toast-top-right'
        });

      }, ({ error }) => {
        this.toastr.info(error.msg, 'Error', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-danger",
          positionClass: 'toast-top-right'
        });
      });
  }

  //Helpers
  entrarModoEdicion(){
    this.isEditMode = true;
  }
  salirModoEdicion(){
    this.isEditMode = false;
  }

  limpiarFormulario(){
    this.id = '';
    this.rut = '';
    this.name = '';
    this.email = '';
    this.phone = '';
    this.accountNumber = '';
    this.selectedBank = '';
  }
}
