import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCnpjValidator]'
})
export class CnpjValidatorDirective {

  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Remove qualquer caractere que não seja dígito
    const sanitizedValue = value.replace(/\D/g, '');

    // Formata o CNPJ com pontos, barra e traço
    const formattedValue = this.formatCnpj(sanitizedValue);

    // Atualiza o valor do controle de formulário
    this.ngControl.control?.setValue(formattedValue);

    // Valida o CNPJ
    if (!this.isValidCnpj(sanitizedValue) && sanitizedValue !== '00000000000000') {
      this.ngControl.control?.setErrors({ invalidCnpj: true });
    } else {
      this.ngControl.control?.setErrors(null);
    }
  }

  private formatCnpj(value: string): string {
    if (value.length > 2 && value.length <= 5) {
      return value.slice(0, 2) + '.' + value.slice(2);
    } else if (value.length > 5 && value.length <= 8) {
      return value.slice(0, 2) + '.' + value.slice(2, 5) + '.' + value.slice(5);
    } else if (value.length > 8 && value.length <= 12) {
      return value.slice(0, 2) + '.' + value.slice(2, 5) + '.' + value.slice(5, 8) + '/' + value.slice(8);
    } else if (value.length > 12) {
      return value.slice(0, 2) + '.' + value.slice(2, 5) + '.' + value.slice(5, 8) + '/' + value.slice(8, 12) + '-' + value.slice(12);
    } else {
      return value;
    }
  }

  private isValidCnpj(cnpj: string): boolean {
    if (cnpj.length !== 14) {
      return false;
    }

    // Elimina CNPJs invalidos conhecidos
    if (/^(\d)\1*$/.test(cnpj)) {
      return false;
    }

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != parseInt(digitos.charAt(0), 10)) {
      return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    return resultado == parseInt(digitos.charAt(1), 10);
  }
}
