import {
  AppBar,
  Box,
  Button,
  Container,
  Hidden,
  Toolbar,
  Typography,
  useTheme,
  IconButton,

} from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link, useLocation } from "react-router-dom";
import { AUTH_STATE, useAuth } from "../../providers/AuthProvider";
import {
  BASE_ROUTES,
  basePaths,
  CAMPAIGN_PREFIX,
  CHARACTER_PREFIX,
} from "../../routes";
import { LoginButton } from "./LoginButton";
import { ReactComponent as IronFellowshipLogo } from "./iron-fellowship-logo.svg";
import { useContext, useEffect, useState } from "react";
import { HeaderMenu } from "./HeaderMenu";

import CharacterIcon from "@mui/icons-material/Person";
import CampaignIcon from "@mui/icons-material/Groups";
import WorldIcon from "@mui/icons-material/Public";
import CheckIcon from "@mui/icons-material/Person2"

import { ThemeContext } from "../../providers/ThemeProvider";


export function Header() {
  const theme = useTheme();
  const { state } = useAuth();

  const path = useLocation().pathname;

  const [selectedTab, setSelectedTab] = useState<"character" | "campaign">();

  const { toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (path.includes(CHARACTER_PREFIX)) {
      setSelectedTab("character");
    } else if (path.includes(CAMPAIGN_PREFIX)) {
      setSelectedTab("campaign");
    } else {
      setSelectedTab(undefined);
    }
  }, [path]);

  return (
    <AppBar elevation={0} position={"static"}>
      <Container maxWidth={"xl"}>
        <Toolbar
          variant={"dense"}
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box display={"flex"} alignItems={"center"}>
            <IronFellowshipLogo width={32} height={32} />
            <Typography
              fontFamily={"Staatliches"}
              variant={"h5"}
              ml={2}
              color={"white"}
            >
              Iron Fellowship
            </Typography>
          </Box>
          {state === AUTH_STATE.AUTHENTICATED ? (
            <Box>
              <Hidden smDown>
                <>
                  <Button
                    // change to dark mode
                    onClick={toggleTheme}
                    sx={{
                      color: "white",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                    endIcon={<IconButton color="inherit">
                      {theme.palette.primary.contrastText === '#000000' ? <Brightness7Icon /> : <Brightness4Icon />}
                       {/* check if dark mode is on (use a stupid method) */}
                    </IconButton>}
                  >
                    {theme.palette.primary.contrastText === '#000000' ? "light" : "dark"} mode
                  </Button>
                  <Button
                    component={Link}
                    to={basePaths[BASE_ROUTES.CHARACTER]}
                    sx={{
                      color: "white",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                    endIcon={<CharacterIcon />}
                  >
                    Characters
                  </Button>
                  <Button
                    component={Link}
                    to={basePaths[BASE_ROUTES.CAMPAIGN]}
                    sx={{
                      color: "white",
                      ml: 1,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                    endIcon={<CampaignIcon />}
                  >
                    Campaigns
                  </Button>
                  <Button
                    component={Link}
                    to={basePaths[BASE_ROUTES.WORLD]}
                    sx={{
                      color: "white",
                      ml: 1,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                    endIcon={<WorldIcon />}
                  >
                    Worlds
                  </Button>
                </>
              </Hidden>
              <HeaderMenu />
            </Box>
          ) : (
            <LoginButton />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
