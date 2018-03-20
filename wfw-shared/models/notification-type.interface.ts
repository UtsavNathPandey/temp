export interface NotificationType {
  id?: number;
  severity: string;
  summary: string;
  closable?: boolean;
  detail?: string;
  eventTitle?: string;
  event?: (any) => any;
  autoClear?: boolean;
  notificationTimeout?: number;
}
