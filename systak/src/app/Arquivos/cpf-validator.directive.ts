import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCpfValidator]'
})
export class CpfValidatorDirective {

  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Remove qualquer caractere que não seja dígito
    const sanitizedValue = value.replace(/\D/g, '');

    // Formata o CPF com pontos e traço
    const formattedValue = this.formatCpf(sanitizedValue);

    // Atualiza o valor do controle de formulário
    this.ngControl.control?.setValue(formattedValue);

    // Valida o CPF
    if (!this.isValidCpf(sanitizedValue) && sanitizedValue !== '00000000000') {
      this.ngControl.control?.setErrors({ invalidCpf: true });
    } else {
      this.ngControl.control?.setErrors(null);
    }
  }

  private formatCpf(value: string): string {
    if (value.length > 3 && value.length <= 6) {
      return value.slice(0, 3) + '.' + value.slice(3);
    } else if (value.length > 6 && value.length <= 9) {
      return value.slice(0, 3) + '.' + value.slice(3, 6) + '.' + value.slice(6);
    } else if (value.length > 9) {
      return value.slice(0, 3) + '.' + value.slice(3, 6) + '.' + value.slice(6, 9) + '-' + value.slice(9);
    } else {
      return value;
    }
  }

  private isValidCpf(cpf: string): boolean {
    if (cpf.length !== 11) {
      return false;
    }

    // Elimina CPFs invalidos conhecidos
    if (/^(\d)\1*$/.test(cpf)) {
      return false;
    }

    // Valida digito verificador
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10), 10)) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.substring(10, 11), 10);
  }
}
