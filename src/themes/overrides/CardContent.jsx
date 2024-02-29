// ==============================|| OVERRIDES - CARD CONTENT ||============================== //

export default function CardContent() {
  return {
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 5,
          '&:last-child': {
            paddingBottom: 10,
            paddingLeft: 15
          }
        }
      }
    }
  };
}
