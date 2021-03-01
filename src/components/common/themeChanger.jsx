import React, { Component, Fragment } from "react";
import Switch from "react-input-switch";

class ThemeChanger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "light",
      value: "yes",
    };

    this.toggleTheme = this.toggleTheme.bind(this);
  }
  toggleTheme() {
    this.setState({
      value: this.state.value === "yes" ? "no" : "yes",
    });
    const theme = this.state.theme === "light" ? "dark" : "light";
    document.documentElement.classList.add("color-theme-in-transition");
    this.setState({ theme });
    document.documentElement.setAttribute("data-theme", theme);
    window.setTimeout(() => {
      document.documentElement.classList.remove("color-theme-in-transition");
    }, 1000);
  }
  render() {
    return (
      <div>
        <Fragment>
          <Switch
            on="yes"
            off="no"
            value={this.state.value}
            onChange={this.toggleTheme.bind(this)}
          />
        </Fragment>
      </div>
    );
  }
}

export default ThemeChanger;
