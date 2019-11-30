
import { notification } from  'antd';

export const openNotificationWithIcon = (type, title, msg) => {
  notification[type]({
    message: title,
    description: msg,
  });
};