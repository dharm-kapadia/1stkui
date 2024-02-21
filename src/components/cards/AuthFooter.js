// material-ui
import { Container, Link, Stack, Typography, useMediaQuery } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="xl">
      <Stack
        direction={matchDownSM ? 'column' : 'row'}
        justifyContent={matchDownSM ? 'center' : 'space-between'}
        spacing={2}
        textAlign={matchDownSM ? 'center' : 'inherit'}
      >
        <Typography variant="subtitle2" color="secondary" component="span">
          &copy; COPYRIGHT 2001-2024&nbsp;
          <Typography component={Link} variant="subtitle2" href="https://www.equilend.com" target="_blank" underline="hover">
            EQUILEND HOLDINGS LLC.
          </Typography>
          &nbsp; ALL RIGHTS RESERVED.
        </Typography>

        <Stack direction={matchDownSM ? 'column' : 'row'} spacing={matchDownSM ? 1 : 3} textAlign={matchDownSM ? 'center' : 'inherit'}>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="https://equilend.com/eu-data-protection-privacy-policy/"
            target="_blank"
            underline="hover"
          >
            Privacy Policy
          </Typography>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="https://equilend.com/contact-us/"
            target="_blank"
            underline="hover"
          >
            Contact Us
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default AuthFooter;
