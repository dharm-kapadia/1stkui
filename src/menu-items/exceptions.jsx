import ErrorOutline from '@mui/icons-material/ErrorOutline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

const icons = {
  ThumbDownOutlinedIcon,
  ErrorOutline,
  PendingActionsIcon
};

const exceptions = {
  id: 'group-exceptions',
  title: 'Exceptions',
  type: 'group',
  children: [
    {
      id: 'errors',
      title: 'Errors',
      type: 'item',
      url: '/errors',
      icon: icons.ErrorOutline,
      breadcrumbs: true
    },
    {
      id: 'pending',
      title: 'Pending',
      type: 'item',
      url: '/pending',
      icon: icons.PendingActionsIcon,
      breadcrumbs: true
    },
    {
      id: 'declined',
      title: 'Declined',
      type: 'item',
      url: '/declined',
      icon: icons.ThumbDownOutlinedIcon,
      breadcrumbs: true
    }
  ]
};

export default exceptions;
