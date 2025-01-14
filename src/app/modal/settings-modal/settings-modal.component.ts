import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { DialogActionEnum, DialogData } from '../../interface/modal.interface';
import { MatButton } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { SettingsServiceService } from '../../services/SettingsService/settings-service.service';
import { CurrencyStringValue, DateFormatStringValue, DateFormatValue, LocalStorageKey } from '../../strings/login.strings';
import { CurrencyEnum, CurrencyDropdownList, DateFormatDropdownList } from '../../interface/settings.interface';
import { UserServiceService } from '../../services/UserService/user-service.service';
import { AsyncPipe } from '@angular/common';
import { LocalStorageService } from '../../services/LocalStorage/local-storage.service';


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
  readonly localStorageService = inject(LocalStorageService)

  currencyValue: CurrencyEnum = 0

  selectedFormat: string = "";

  dialogActionEnum = DialogActionEnum

  currencyDropdownList: CurrencyDropdownList[] = [
    { name: CurrencyStringValue.VND, value: CurrencyEnum.VND },
    { name: CurrencyStringValue.USD, value: CurrencyEnum.USD },
    { name: CurrencyStringValue.EUR, value: CurrencyEnum.EUR },
  ]

  dateFormatDropdownList: DateFormatDropdownList[] = [
    { name: DateFormatStringValue.DMY, value: DateFormatValue.DMY },
    { name: DateFormatStringValue.MDY, value: DateFormatValue.MDY },
    { name: DateFormatStringValue.YMD, value: DateFormatValue.YMD }
  ]

  ngOnInit(): void {
    this.getDateFormat();
    // this.localStorageService.clear();
  }

  updateDateFormatGlobal(dateFormat: string, key: string) {
    this.settingsService.setDateFormat(dateFormat)
    this.localStorageService.setItem(key, dateFormat);
  }

  getDateFormat() {
    this.selectedFormat = this.settingsService.getCurrDateFormat()
  }


  // getCurrencyValue() {
  //   this.settingsService.getUserSettings().subscribe(res => {
  //     this.currencyValue = res?.currency as CurrencyEnum
  //   })
  // }

  onSave() {
    // this.settingsService.createSettingsForUser(payload).subscribe({
    //   error: e => console.log(e),
    //   complete: () => this.dialogRef.close({ title: "Settings", action: this.dialogActionEnum.Settings, isSuccess: true } as DialogData)
    // })
    this.updateDateFormatGlobal(this.selectedFormat, LocalStorageKey.dateFormat)
    this.dialogRef.close({ title: "Settings", action: this.dialogActionEnum.Settings, isSuccess: true } as DialogData)
  }



  onCancel() {
    this.dialogRef.close({ title: "Settings", action: this.dialogActionEnum.Settings, isSuccess: false } as DialogData)
  }

}

export interface CurrencyAPIObject {
  rates: { EUR: number, VND: number, USD: number }
}
