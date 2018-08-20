import { SEND_NOTIFICATION } from '../constants/app';

export function sendNotification(type, text) {
    return {
      type: SEND_NOTIFICATION,
      data : {
          type,
          text,
      }
    };
}
