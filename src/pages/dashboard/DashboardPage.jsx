import { useEffect, useState } from 'react';

import CallSplitOutlinedIcon from '@mui/icons-material/CallSplitOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

import { Grid } from '@mui/material';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

// project import
import DashboardAnalytics from 'components/cards/statistics/DashboardAnalytics';
import { getCloudEvents } from '../../services/cloudevents';
import { getContracts } from '../../services/contracts';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const Dashboard = () => {
  const [errorCount, setErrorCount] = useState('react');
  const [pendingCount, setPendingCount] = useState('react');
  const [declinedCount, setDeclinedCount] = useState('react');
  const [eventCount, setEventCount] = useState('react');

  const [tradeAgreementCount, setTradeAgreementCount] = useState('react');
  const [contractsCount, setContractsCount] = useState('react');
  const [reratesCount, setReratesCount] = useState('react');
  const [returnsCount, setReturnsCount] = useState('react');
  const [recallsCount, setRecallsCount] = useState('react');
  const [buyinsCount, setBuyinsCount] = useState('react');
  const [splitsCount, setSplitsCount] = useState('react');

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function fetchCloudEvents() {
      // Get cloudevents using Bearer token
      const resp = await getCloudEvents(token);

      // Parse the response and update the eventCount on the UI
      setEventCount(resp.data.totalItems);
    }

    async function fetchContracts() {
      // Get the contracts using Bearer token
      const resp = await getContracts(token);

      setContractsCount(resp.data.totalItems);
    }

    fetchCloudEvents();
    fetchContracts();

    setErrorCount(0);
    setPendingCount(0);
    setDeclinedCount(0);

    setTradeAgreementCount(0);
    setReratesCount(0);
    setReturnsCount(0);
    setRecallsCount(0);
    setBuyinsCount(0);
    setSplitsCount(0);
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* Exceptions */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Divider>
          <Chip label="Exceptions" color="error" size="small" />
        </Divider>{' '}
      </Grid>
      <Grid item xs={4}>
        <DashboardAnalytics title="Errors/Mismatches" count={errorCount.toString()} color="red" cardIcon={<ErrorOutline />} />
      </Grid>
      <Grid item xs={4}>
        <DashboardAnalytics title="Pending" count={pendingCount.toString()} color="maroon" cardIcon={<PendingActionsIcon />} />
      </Grid>
      <Grid item xs={4}>
        <DashboardAnalytics
          title="Declined/Rejected"
          count={declinedCount.toString()}
          color="darkorange"
          cardIcon={<ThumbDownOutlinedIcon />}
        />
      </Grid>

      {/* Entities - Row 1 */}
      <Grid item xs={12}>
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Divider>
              <Chip label="Entities" color="success" size="small" />
            </Divider>{' '}
          </Grid>
          <Grid item xs={4}>
            <DashboardAnalytics title="Events" count={eventCount.toString()} cardIcon={<EventAvailableOutlinedIcon />} />
          </Grid>
          <Grid item xs={4}>
            <DashboardAnalytics title="Trade Agreements" count={tradeAgreementCount.toString()} cardIcon={<HandshakeOutlinedIcon />} />
          </Grid>
          <Grid item xs={4}>
            <DashboardAnalytics title="Contracts" count={contractsCount.toString()} cardIcon={<DescriptionOutlinedIcon />} />
          </Grid>
        </Grid>
      </Grid>

      {/* Entities - Row 2 */}
      <Grid item xs={12}>
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Divider>
              <Chip label="LifeCycle Events" color="primary" size="small" />
            </Divider>{' '}
          </Grid>
          <Grid item xs={4}>
            <DashboardAnalytics title="Rerates" count={reratesCount.toString()} cardIcon={<CurrencyExchangeOutlinedIcon />} />
          </Grid>
          <Grid item xs={4}>
            <DashboardAnalytics title="Returns" count={returnsCount.toString()} cardIcon={<KeyboardReturnOutlinedIcon />} />
          </Grid>
          <Grid item xs={4}>
            <DashboardAnalytics title="Recalls" count={recallsCount.toString()} cardIcon={<CampaignOutlinedIcon />} />
          </Grid>
        </Grid>
      </Grid>

      {/* Entities - Row 3 */}
      <Grid item xs={12}>
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          <Grid item xs={4}>
            <DashboardAnalytics title="Buyins" count={buyinsCount.toString()} cardIcon={<ShoppingCartOutlinedIcon />} />
          </Grid>
          <Grid item xs={4}>
            <DashboardAnalytics title="Contract Splits" count={splitsCount.toString()} cardIcon={<CallSplitOutlinedIcon />} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
