import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../../services/RouteGuard/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { SettingsModalComponent } from '../../../modal/settings-modal/settings-modal.component';
import { DialogActionEnum, DialogData } from '../../../interface/modal.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public authService: AuthService) { }
  readonly dialog = inject(MatDialog)

  currentDayAndTime: string = ""

  dialogActionEnum = DialogActionEnum

  logout() {
    console.log('click logout')
  }

  openSettings() {
    const dialogRef = this.dialog.open(SettingsModalComponent, {
      height: '270px',
      width: '450px',
      data: { title: "Settings", action: this.dialogActionEnum.Settings, isSuccess: false } as DialogData,
      disableClose: true
    })

    // this.getListAfterSuccessCallApi(dialogRef)
  }

}
