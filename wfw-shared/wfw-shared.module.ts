import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesModule, PasswordModule, InputTextModule, ButtonModule } from 'primeng/primeng';

// services
import { WfwNotificationService } from './services/notification.service';

// components
import { WfwIconComponent } from './icons/wfw-icon-component';
import { NotificationComponent } from './components/notification/notification.component';


@NgModule({
    imports: [
        CommonModule,
        MessagesModule,
        PasswordModule,
        InputTextModule,
        ButtonModule
    ],
    exports: [
        // modules
        CommonModule,
        // components
        WfwIconComponent,
        NotificationComponent,
    ],
    providers: [ WfwNotificationService ],
    declarations: [
        WfwIconComponent,
        NotificationComponent
    ]
})

export class WfwSharedModule {}
