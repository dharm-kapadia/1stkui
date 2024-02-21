import { Typography } from '@mui/material';

function getCurrentDateTime() {
  var currentdate = new Date();
  var datetime =
    'Last Sync: ' +
    currentdate.getDate() +
    '/' +
    (currentdate.getMonth() + 1) +
    '/' +
    currentdate.getFullYear() +
    ' @ ' +
    currentdate.getHours() +
    ':' +
    currentdate.getMinutes() +
    ':' +
    currentdate.getSeconds();

  return datetime;
}

import { Box, Container, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        paddingTop: '1rem',
        paddingBottom: '1rem'
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="subtitle1">{`${getCurrentDateTime()}`}</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
