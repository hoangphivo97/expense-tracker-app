import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SettingsServiceService } from '../../../services/SettingsService/settings-service.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  providers: [DatePipe]
})
export class FooterComponent implements OnInit {
  currentDayAndTime: string = ''
  datePipe = inject(DatePipe)
  settingService = inject(SettingsServiceService)

  ngOnInit(): void {
    this.currentTime();
    this.updateTime()
  }

  currentTime() {
    const date = new Date();
    const currTime: string = date.toLocaleTimeString();
    const currDate = this.datePipe.transform(date, this.GlobalDateFormat)
    this.currentDayAndTime = currDate + ' ' + currTime
  }

  updateTime() {
    setInterval(() => { this.currentTime(), 1000 })
  }

  get GlobalDateFormat() {
    return this.settingService.getCurrDateFormat()
  }

}
