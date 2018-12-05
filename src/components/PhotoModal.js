import React, { Component } from "react";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Error from "./Error";
import Modal from "@material-ui/core/Modal";
import PexelsAPI from "pexels-api-wrapper";
import { getApiKey } from "../Utils";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  card: {
    width: "100%"
  },
  media: {
    height: "55vh",
    width: "auto"
  }
};

class PhotoModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.id && prevProps.id !== this.props.id) {
      this.photo(this.props.id);
    }
  }

  handleClose = close => {
    this.setState({ open: false });
  };

  photo(id) {
    const key = getApiKey();

    if (key) {
      const client = new PexelsAPI(key);
      const { classes } = this.props;

      client
        .getPhoto(id)
        .then(data => {
          this.setState({
            result: (
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={data.src.large}
                  title={data.photographer}
                />
              </Card>
            ),
            open: true
          });
        })
        .catch(error => {
          this.setState({ result: <Error message={error} /> });
        });
    }
  }

  render() {
    return (
      <Modal open={this.state.open} onClose={this.handleClose}>
        {this.state.result}
      </Modal>
    );
  }
}

export default withStyles(styles)(PhotoModal);
