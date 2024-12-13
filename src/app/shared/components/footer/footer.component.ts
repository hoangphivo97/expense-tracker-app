import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  currentDayAndTime: string = ''

  ngOnInit(): void {
    this.currentTime();
    this.updateTime()
  }

  currentTime() {
    const date = new Date();
    const currTime : string = date.toLocaleTimeString();
    const currDate : string  = date.toLocaleDateString('fr-FR')
    this.currentDayAndTime = currDate + ' ' + currTime
  }

  updateTime() {
    setInterval(() => { this.currentTime(), 1000 })
  }

}
