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

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const Dashboard = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* Exceptions */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Divider>
          <Chip label="Exceptions" color="error" size="small" />
        </Divider>{' '}
      </Grid>
      <Grid item xs={4}>
        <DashboardAnalytics title="Errors/Mismatches" count="12" color="red" cardIcon={<ErrorOutline />} />
      </Grid>
      <Grid item xs={4}>
        <DashboardAnalytics title="Pending" count="8" color="maroon" cardIcon={<PendingActionsIcon />} />
      </Grid>
      <Grid item xs={4}>
        <DashboardAnalytics title="Declined/Rejected" count="18" color="darkorange" cardIcon={<ThumbDownOutlinedIcon />} />
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
            <DashboardAnalytics title="Events" count="376" cardIcon={<EventAvailableOutlinedIcon />} />
          </Grid>
          <Grid item xs={4}>
            <DashboardAnalytics title="Trade Agreements" count="825" cardIcon={<HandshakeOutlinedIcon />} />
          </Grid>
          <Grid item xs={4}>
            <DashboardAnalytics title="Contracts" count="1,289" cardIcon={<DescriptionOutlinedIcon />} />
          </Grid>
        </Grid>
      </Grid>

      {/* Entities - Row 2 */}
      <Grid item xs={12}>
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          <Grid item xs={4}>
            <DashboardAnalytics title="Rerates" count="422" cardIcon={<CurrencyExchangeOutlinedIcon />} />
          </Grid>
          <Grid item xs={4}>
            <DashboardAnalytics title="Returns" count="590" cardIcon={<KeyboardReturnOutlinedIcon />} />
          </Grid>
          <Grid item xs={4}>
            <DashboardAnalytics title="Recalls" count="2,377" cardIcon={<CampaignOutlinedIcon />} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
