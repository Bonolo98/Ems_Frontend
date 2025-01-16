import { Component, Input } from '@angular/core';
import { AlertService } from './alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {

  alert: { type: 'success' | 'error' | 'warning' | 'info'; message: string } | null = null;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.alerts.subscribe(alert => {
      this.alert = alert;
    });
  }


  get alertClasses() {
    switch (this.alert?.type) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'info':
      default:
        return 'bg-blue-100 border-blue-500 text-blue-700';
    }
  }

}
