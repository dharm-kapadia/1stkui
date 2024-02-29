import { useEffect } from 'react';

import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

import { Grid } from '@mui/material';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

// project import
import DashboardAnalytics from 'components/cards/statistics/DashboardAnalytics';
import { getCloudEvents } from '../../services/cloudevents';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const Dashboard = () => {
  /**
   * Variable to hold counts from the server
   *
   */
  let errorCount = 0;
  let pendingCount = 0;
  let declinedCount = 0;
  let eventCount = 0;
  let tradeAgreementCount = 0;
  let contractsCount = 0;
  let reratesCount = 0;
  let returnsCount = 0;
  let recallsCount = 0;

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Get cloudevents using Bearer token
    const resp = getCloudEvents(token);
    console.log(resp);
  });

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
    </Grid>
  );
};

export default Dashboard;
