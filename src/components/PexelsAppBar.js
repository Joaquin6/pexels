import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Icon from "@material-ui/core/Icon";
import InputBase from "@material-ui/core/InputBase";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: { marginBottom: "1em" },
  search: { display: "flex", flexDirection: "row", alignItems: "center" },
  inputRoot: { marginLeft: "2em" },
  inputInput: {
    width: 200,
    padding: ".25em",
    border: "solid 1px",
    borderColor: "#cdcdcd",
    backgroundColor: "#fff"
  },
  settings: { width: "100%", textAlign: "right" },
  settingsIconActive: { color: "blue" }
};

class PexelsAppBar extends Component {
  constructor(props) {
    super(props);

    this.state = { settingsActive: false };
  }

  settingsClickHandler = () => {
    let settingsActive, route;
    if (this.state.settingsActive) {
      settingsActive = false;
      route = "main";
    } else {
      settingsActive = true;
      route = "settings";
    }
    this.setState({ settingsActive: settingsActive });
    this.props.routeHandler(route);
  };

  render() {
    const state = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar variant="dense">
            <img
              src="/static/pexels-logo.svg"
              alt="Pexels"
              style={{ marginRight: ".4em" }}
            />
            <Typography variant="h6" color="inherit">
              Pexels
            </Typography>
            <div className={classes.search}>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
              <div className={classes.searchIcon}>
                <Icon>search</Icon>
              </div>
            </div>
            <div className={classes.settings}>
              <Icon
                onClick={this.settingsClickHandler}
                className={
                  state.settingsActive
                    ? classes.settingsIconActive
                    : classes.settingsIcon
                }
              >
                settings
              </Icon>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(PexelsAppBar);
