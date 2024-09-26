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

const entities = {
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
      breadcrumbs: false
    },
    {
      id: 'agreements',
      title: 'Trade Agreements',
      type: 'item',
      url: '/tradeagreements',
      icon: icons.HandshakeOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'loans',
      title: 'Loans',
      type: 'item',
      url: '/loans',
      icon: icons.DescriptionOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'rerates',
      title: 'Rerates',
      type: 'item',
      url: '/rerates',
      icon: icons.CurrencyExchangeOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'returns',
      title: 'Returns',
      type: 'item',
      url: '/returns',
      icon: icons.KeyboardReturnOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'recalls',
      title: 'Recalls',
      type: 'item',
      url: '/recalls',
      icon: icons.CampaignOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'buyins',
      title: 'Buyins',
      type: 'item',
      url: '/buyins',
      icon: icons.ShoppingCartOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'splits',
      title: 'Loan Splits',
      type: 'item',
      url: '/splits',
      icon: icons.CallSplitOutlinedIcon,
      breadcrumbs: false
    }
  ]
};

export default entities;
