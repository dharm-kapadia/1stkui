import ErrorOutline from '@mui/icons-material/ErrorOutline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

const icons = {
  ThumbDownOutlinedIcon,
  ErrorOutline,
  PendingActionsIcon,
  RemoveCircleOutlineOutlinedIcon
};

const exceptions = {
  id: 'group-exceptions',
  title: 'Exceptions',
  type: 'group',
  children: [
    {
      id: 'discrepancies',
      title: 'Discrepancies',
      type: 'item',
      url: '/discrepancies',
      icon: icons.ErrorOutline,
      breadcrumbs: false
    },
    {
      id: 'pending',
      title: 'Pending',
      type: 'item',
      url: '/pending',
      icon: icons.PendingActionsIcon,
      breadcrumbs: false
    },
    {
      id: 'declined',
      title: 'Declined',
      type: 'item',
      url: '/declined',
      icon: icons.ThumbDownOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'nack',
      title: 'Negative Ack',
      type: 'item',
      url: '/nacks',
      icon: icons.RemoveCircleOutlineOutlinedIcon,
      breadcrumbs: false
    }
  ]
};

export default exceptions;
