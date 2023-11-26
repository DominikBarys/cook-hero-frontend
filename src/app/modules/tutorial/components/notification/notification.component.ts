import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';
import { Notification } from '../../../core/models/tutorial/tutorial.models';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  constructor(private notificationService: NotificationService) {}
  notifications: Notification[] = [];

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe({
      next: (notifications) => {
        this.notifications = [...notifications];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getNotificationClass(notification: Notification): string {
    return notification.type === 'WARNING' ? 'warning' : 'critical';
  }

  handleCheckboxChange(notification: Notification): void {
    this.notificationService
      .checkNotification(notification.shortId)
      .pipe(switchMap(() => this.notificationService.getNotifications()))
      .subscribe({
        next: (notifications) => {
          this.notifications = [...notifications];
          console.log('Notification checked');
        },
        error: (err) => {
          console.log(err);
        },
      });

    notification.isChecked = !notification.isChecked;
  }

  deleteNotification(notification: Notification): void {
    this.notificationService
      .deleteNotification(notification.shortId)
      .pipe(switchMap(() => this.notificationService.getNotifications()))
      .subscribe({
        next: (notifications) => {
          this.notifications = [...notifications];
          console.log('Notification deleted');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
