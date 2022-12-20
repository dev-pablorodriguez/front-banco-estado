import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TransferenciasService } from '../../../services/transferencias.service';
import { AuthService } from '../../../services/auth.service';
import { DestinatariosService } from '../../../services/destinatarios.service';
import { getErrorsMessage } from '../../../../helpers'

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html'
})
export class TransferenciasComponent implements OnInit {

  public transferencias = [];
  public destinatarios = [];

  //Form fields
  public selectedDestinatario: string;
  public rut: string;
  public name: string;
  public email: string;
  public accountNumber: string;
  public bank: string;
  public amount: string;

  constructor(
    private authService: AuthService,
    private transferenciasService: TransferenciasService,
    private destinatariosService: DestinatariosService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  
  ngOnInit() {
    if(this.authService.isAuthenticated()){
      
      this.cargarTransferencias();
      this.cargarDropdownDestinatarios();

    }else{
      this.router.navigate(['login']);
    }
  }

  cargarDropdownDestinatarios = () => {
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

  onDestinatariosChange = ({ target }) => {
    const destinatario = this.destinatarios.filter( item => item._id === target.value)[0];
    const { _id: id, rut, name, email, accountNumber, bank } = destinatario;

    this.rut = rut;
    this.name = name;
    this.email = email;
    this.accountNumber = accountNumber;
    this.bank = bank.name;
  }

  cargarTransferencias = () => {
    this.transferenciasService.getTransferencias()
      .subscribe( res => {
        this.transferencias = res.transferencias;

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

  validarFormulario = (): string => {
    let msg = '';
    if(!this.selectedDestinatario) msg += 'Debe seleccionar un destinatario. ';

    if(!this.amount){
      msg += 'Debe ingresar un monto.';
    }else if(parseInt(this.amount) < 1000){
      msg += 'Debe ingresar un monto mayor a 1000.';
    }

    return msg;
  }

  limpiarFormulario = () => {
    this.selectedDestinatario = '';
    this.rut = '';
    this.name = '';
    this.email = '';
    this.accountNumber = '';
    this.bank = '';
    this.amount = '';
  }

  crearTransferencia = () => {
    const validationMessages = this.validarFormulario()
    
    if(validationMessages.length > 0){
      this.toastr.info(validationMessages, 'Error', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-danger",
        positionClass: 'toast-top-right'
      });
    }else{
      const transferencia = { amount: this.amount, destinatario: this.selectedDestinatario }

      this.transferenciasService.createTransferencia(transferencia)
      .subscribe( res => {
        this.limpiarFormulario();
        this.cargarTransferencias();

        this.toastr.info('Transferencia realizada.', 'Proceso Completado', {
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
  }

  isPossibleFraud = (tef):boolean => {
    //Get the transfers that have been made to that recipient and are over 100K
    const transfersToSameDestinatario = this.transferencias.filter(
      item =>
        item.destinatario._id === tef.destinatario._id &&
        item.amount > 100000
      )
      
      return transfersToSameDestinatario.length >= 2 && tef.amount > 100000
  }

}
