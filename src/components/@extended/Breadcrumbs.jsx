import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// material-ui
import { Divider, Grid, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import navigation from 'menu-items';

// assets

// ==============================|| BREADCRUMBS ||============================== //

const Breadcrumbs = ({
  card = true,
  custom = false,
  divider = false,
  heading,
  rightAlign,
  title = true,
  titleBottom = true,
  sx,
  ...others
}) => {
  const location = useLocation();
  const [main, setMain] = useState();
  const [item, setItem] = useState();

  let customLocation = location.pathname;

  // only used for component demo breadcrumbs
  if (customLocation.includes('/components-overview/breadcrumbs')) {
    customLocation = '/apps/customer/customer-card';
  }

  useEffect(() => {
    navigation?.items?.map((menu) => {
      if (menu.type && menu.type === 'group') {
        if (menu?.url && menu.url === customLocation) {
          setMain(menu);
          setItem(menu);
        } else {
          getCollapse(menu);
        }
      }
      return false;
    });
  });

  // set active item state
  const getCollapse = (menu) => {
    if (!custom && menu.children) {
      menu.children.filter((collapse) => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse);
          if (collapse.url === customLocation) {
            setMain(collapse);
            setItem(collapse);
          }
        } else if (collapse.type && collapse.type === 'item') {
          if (customLocation === collapse.url) {
            setMain(menu);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  // item separator
  let breadcrumbContent = <Typography />;

  // collapse item
  if (!custom && main && main.type === 'collapse' && main.breadcrumbs === true) {
    breadcrumbContent = (
      <MainCard
        border={card}
        sx={card === false ? { mb: 1, bgcolor: 'transparent', ...sx } : { mb: 1, ...sx }}
        {...others}
        content={card}
        shadow="none"
        title={main.title}
      >
        {card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
      </MainCard>
    );
  }

  // items
  if ((item && item.type === 'item') || (item?.type === 'group' && item?.url) || custom) {
    // main
    if (item?.breadcrumbs !== false || custom) {
      breadcrumbContent = (
        <MainCard
          border={card}
          sx={card === false ? { mb: 1, bgcolor: 'transparent', ...sx } : { mb: 1, ...sx }}
          {...others}
          content={card}
          shadow="none"
        >
          <Grid
            container
            direction={rightAlign ? 'row' : 'column'}
            justifyContent={rightAlign ? 'space-between' : 'flex-start'}
            alignItems={rightAlign ? 'center' : 'flex-start'}
            spacing={1}
          >
            {title && !titleBottom && (
              <Grid item>
                <Typography variant="h6">{custom ? heading : item?.title}</Typography>
              </Grid>
            )}
            {title && titleBottom && (
              <Grid item sx={{ mt: card === false ? 0.25 : 1 }}>
                <Typography variant="h2">{custom ? heading : item?.title}</Typography>
              </Grid>
            )}
          </Grid>
          {card === false && divider !== false && <Divider sx={{ mt: 1 }} />}
        </MainCard>
      );
    }
  }

  return breadcrumbContent;
};

Breadcrumbs.propTypes = {
  card: PropTypes.bool,
  divider: PropTypes.bool,
  custom: PropTypes.bool,
  heading: PropTypes.string,
  icon: PropTypes.bool,
  icons: PropTypes.bool,
  maxItems: PropTypes.number,
  rightAlign: PropTypes.bool,
  separator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  title: PropTypes.bool,
  titleBottom: PropTypes.bool,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default Breadcrumbs;
