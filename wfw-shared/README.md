## WFW Notifications

Import the shared module and the service into your project:

```
import { WfwSharedModule } from 'wfw-shared/wfw-shared.module';
import { WfwNotificationService } from 'wfw-shared/services/notification.service';
```

add the `<wfw-notification></wfw-notification>` selector to the view where you want your messages to display.

Using the `WfwNotificationService` you can add messages/notification like so:

```
this.notificationService.message({
      severity: 'warn',
      summary: `This is a warning`,
      detail: 'warning details',
      closable: true,
      eventTitle: `Click to trigger`,
      event: (message) => {
        console.log('event triggered');
      }
    });
```

See `wfw-shared/models/notification-type.interface.ts` for all of the attribute available to a Notification.

## Halliburton PrimeNg Theme

Import the shared module by npm install. This should get the latest files for Halliburton theme from wfw-shared module.
Themes SCSS files can be found under style folder.

The wfw-main is the main theme file which resides in shared module and has to be included in your projects `styles.scss` file along with `wfw-variables` and `wfw-mixins` as seen below:

```
@import "~wfw-shared/icons/wfw-icons.scss";
@import "~wfw-shared/style/wfw-main";
@import "~wfw-shared/style/wfw-mixins";
```

Wherever the primeng components are referred respective theme is applied automatically.

If variable from `wfw-variables` are used in your project in any of the components then the `wfw-variables` file should be referenced in your component file. Same thing applied to mixins.

Theming by default will support alternate row colouring, To display all rows in same colour add `ui-plain-rows` class to datatable.

In Column Toggler add `ui-column-toggler` class to datatable to achieve theme as style guide.

In Column Grouping use these classes `border-right-0`, `border-left-0` and `border-top-2` for removing borders and adding borders to achieve theme as style guide.