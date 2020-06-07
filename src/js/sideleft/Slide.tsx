import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { UserForm } from "../form/userForm";

const useStyles = makeStyles({
  navLink: {
    "@media(max-width: 760px)": {
      display: "none",
    },
  },
  iconOnMob: {
    fontSize: "1.5rem",
    padding: "0",
  },
});

export default function Slide() {
  const [displaySearchForm, setDisplaySearchForm] = useState(false);

  const history = useHistory();
  const styles = useStyles(makeStyles);
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: string) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem
          button
          onClick={(e) => {
            // navigate App to contribute page
            e.preventDefault();
            history.push("/contribute");
          }}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon="plus" size="1x" />
          </ListItemIcon>
          <ListItemText primary="Contribute" />
        </ListItem>

        <ListItem
          button
          onClick={(e) => {
            // display search form
            e.preventDefault();
            setDisplaySearchForm(true);
          }}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon="stream" />
          </ListItemIcon>
          <ListItemText primary="Library" />
        </ListItem>
      </List>
      <Divider />
      <List>{displaySearchForm && <UserForm />}</List>
    </div>
  );

  return (
    <div style={{ display: "inline" }}>
      <React.Fragment key="left">
        <div onClick={toggleDrawer("left", true)}>
          <FontAwesomeIcon icon="search" className={styles.iconOnMob} />
          <Typography
            variant="caption"
            component="span"
            className={styles.navLink}
          >
            Search
          </Typography>
        </div>
        <Drawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
