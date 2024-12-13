import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { DialogActionEnum, DialogData } from '../../interface/modal.interface';
import { MatButton } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { SettingsServiceService } from '../../services/SettingsService/settings-service.service';
import { CurrencyValue } from '../../strings/login.strings';
import { CurrencyEnum, CurrencyDropdownList } from '../../interface/settings.interface';
import { UserServiceService } from '../../services/UserService/user-service.service';


@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, MatButton, MatLabel, MatSelect, MatOption],
  templateUrl: './settings-modal.component.html',
  styleUrl: './settings-modal.component.scss'
})
export class SettingsModalComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<SettingsModalComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly settingsService = inject(SettingsServiceService)
  readonly userService = inject(UserServiceService)

  currencyValue: CurrencyEnum = 0

  dialogActionEnum = DialogActionEnum

  currencyDropdownList: CurrencyDropdownList[] = [
    { name: CurrencyValue.VND, value: CurrencyEnum.VND },
    { name: CurrencyValue.USD, value: CurrencyEnum.USD },
    { name: CurrencyValue.EUR, value: CurrencyEnum.EUR },
  ]

  ngOnInit(): void {
    this.getCurrencyValue();
  }

  getCurrencyValue() {
    this.settingsService.getUserSettings().subscribe(res => {
      this.currencyValue = res?.currency as CurrencyEnum
    })
  }

  onSave() {
    const payload = {
      currency: this.currencyValue
    }
    this.settingsService.createSettingsForUser(payload).subscribe({
      error: e => console.log(e),
      complete: () => this.dialogRef.close({ title: "Settings", action: this.dialogActionEnum.Settings, isSuccess: true } as DialogData)
    })
  }

  onCancel() {
    this.dialogRef.close({ title: "Settings", action: this.dialogActionEnum.Settings, isSuccess: false } as DialogData)
  }

}

export interface CurrencyAPIObject {
  rates: { EUR: number, VND: number, USD: number }
}
