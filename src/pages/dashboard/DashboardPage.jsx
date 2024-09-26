import { useEffect, useState } from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import CallSplitOutlinedIcon from '@mui/icons-material/CallSplitOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

import { Grid } from '@mui/material';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

// project import
import DashboardAnalytics from 'components/cards/statistics/DashboardAnalytics';
import { getCloudEvents } from 'services/cloudevents';
import { getNumLoans } from 'services/loans';
import { getNumRerates } from 'services/rerates';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const Dashboard = () => {
  const [discrepancyCount, setDiscrepancyCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [declinedCount, setDeclinedCount] = useState(0);
  const [nackCount, setNackCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);

  const [tradeAgreementCount, setTradeAgreementCount] = useState(0);
  const [loansCount, setLoansCount] = useState(0);
  const [reratesCount, setReratesCount] = useState(0);
  const [returnsCount, setReturnsCount] = useState(0);
  const [recallsCount, setRecallsCount] = useState(0);
  const [buyinsCount, setBuyinsCount] = useState(0);
  const [splitsCount, setSplitsCount] = useState(0);

  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function fetchCloudEvents() {
      // Get number of cloudevents using Bearer token
      const events = await getCloudEvents(token);

      // Parse the response and update the event count on the UI
      setEventCount(events.length);

      var dc = 0;
      var pc = 0;

      events.forEach((event) => {
        if (event.type.includes('DISCREPANCIES')) {
          dc++;
        } else if (event.type.includes('UNMATCHED') || event.type.includes('PENDING')) {
          pc++;
        }
      });

      setDiscrepancyCount(dc);
      setPendingCount(pc);
    }

    async function fetchLoans() {
      // Get number of loans using Bearer token
      const loanCount = await getNumLoans(token);

      // Parse the response and update the loans count on the UI
      setLoansCount(loanCount);
    }

    async function fetchRerates() {
      // Get the rerates using Bearer token
      const reratesCount = await getNumRerates(token);

      // Parse the response and update the rerates count on the UI
      setReratesCount(reratesCount);
    }

    fetchCloudEvents();
    fetchLoans();

    setDeclinedCount(0);
    setNackCount(0);

    setTradeAgreementCount(0);
    fetchRerates();
    setReturnsCount(0);
    setRecallsCount(0);
    setBuyinsCount(0);
    setSplitsCount(0);

    setIsFetching(false);
  }, [isFetching]);

  return (
    <>
      {isFetching ? (
        <div>
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      ) : (
        <div></div>
      )}
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* Exceptions */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Divider>
            <Chip label="Exceptions" color="error" size="small" />
          </Divider>{' '}
        </Grid>
        <Grid item xs={4}>
          <DashboardAnalytics title="Discrepancies" count={discrepancyCount.toString()} color="red" cardIcon={<ErrorOutline />} />
        </Grid>
        <Grid item xs={4}>
          <DashboardAnalytics title="Pending" count={pendingCount.toString()} color="maroon" cardIcon={<PendingActionsIcon />} />
        </Grid>
        <Grid item xs={4}>
          <DashboardAnalytics title="Declined" count={declinedCount.toString()} color="darkorange" cardIcon={<ThumbDownOutlinedIcon />} />
        </Grid>
        <Grid item xs={4}>
          <DashboardAnalytics
            title="Negative Ack"
            count={nackCount.toString()}
            color="red"
            cardIcon={<RemoveCircleOutlineOutlinedIcon />}
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
              <DashboardAnalytics title="Events" count={eventCount.toString()} color="#52C41A" cardIcon={<EventAvailableOutlinedIcon />} />
            </Grid>
            <Grid item xs={4}>
              <DashboardAnalytics
                title="Trade Agreements"
                count={tradeAgreementCount.toString()}
                color="#52C41A"
                cardIcon={<HandshakeOutlinedIcon />}
              />
            </Grid>
            <Grid item xs={4}>
              <DashboardAnalytics title="Loans" count={loansCount.toString()} color="#52C41A" cardIcon={<DescriptionOutlinedIcon />} />
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
              <DashboardAnalytics title="Loan Splits" count={splitsCount.toString()} cardIcon={<CallSplitOutlinedIcon />} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
