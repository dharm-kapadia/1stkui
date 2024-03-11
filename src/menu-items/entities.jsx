import CallSplitOutlinedIcon from '@mui/icons-material/CallSplitOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const icons = {
  CallSplitOutlinedIcon,
  CampaignOutlinedIcon,
  CurrencyExchangeOutlinedIcon,
  DescriptionOutlinedIcon,
  EventAvailableOutlinedIcon,
  HandshakeOutlinedIcon,
  KeyboardReturnOutlinedIcon,
  ShoppingCartOutlinedIcon
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const exceptions = {
  id: 'group-entities',
  title: 'Entities',
  type: 'group',
  children: [
    {
      id: 'events',
      title: 'Events',
      type: 'item',
      url: '/events',
      icon: icons.EventAvailableOutlinedIcon,
      breadcrumbs: true
    },
    {
      id: 'agreements',
      title: 'Trade Agreements',
      type: 'item',
      url: '/tradeagreements',
      icon: icons.HandshakeOutlinedIcon,
      breadcrumbs: true
    },
    {
      id: 'contracts',
      title: 'Contracts',
      type: 'item',
      url: '/contracts',
      icon: icons.DescriptionOutlinedIcon,
      breadcrumbs: true
    },
    {
      id: 'rerates',
      title: 'Rerates',
      type: 'item',
      url: '/rerates',
      icon: icons.CurrencyExchangeOutlinedIcon,
      breadcrumbs: true
    },
    {
      id: 'returns',
      title: 'Returns',
      type: 'item',
      url: '/returns',
      icon: icons.KeyboardReturnOutlinedIcon,
      breadcrumbs: true
    },
    {
      id: 'recalls',
      title: 'Recalls',
      type: 'item',
      url: '/recalls',
      icon: icons.CampaignOutlinedIcon,
      breadcrumbs: true
    },
    {
      id: 'buyins',
      title: 'Buyins',
      type: 'item',
      url: '/buyins',
      icon: icons.ShoppingCartOutlinedIcon,
      breadcrumbs: true
    },
    {
      id: 'splits',
      title: 'Contract Splits',
      type: 'item',
      url: '/splits',
      icon: icons.CallSplitOutlinedIcon,
      breadcrumbs: true
    }
  ]
};

export default exceptions;
