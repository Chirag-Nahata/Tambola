import * as React from "react";
import { Component } from "react";
import Config from "./Config";

interface EnterNameProps {
  socket: any;
}

interface EnterNameState {
  isEmpty: boolean;
  name: string;
  submitted: boolean;
}

class EnterName extends Component<EnterNameProps, EnterNameState> {
  constructor(props: EnterNameProps) {
    super(props);
    this.state = { isEmpty: true, name: "", submitted: false };
  }

  handleChange = (event: any) => {
    const { value } = event.target;
    if (value !== "") {
      this.setState({ isEmpty: false, name: value });
    } else {
      this.setState({ isEmpty: true, name: value });
    }
  };

  handleKeyPress = (event: any) => {
    const { value } = event.target;
    if (event.key === "Enter" && value !== "") {
      console.log("enter press here!");
      this.setState({
        submitted: true,
      });
    }
  };

  handleSubmit = (event: any) => {
    this.setState({
      submitted: true,
    });
    event.preventDefault();
  };

  render() {
    if (!this.state.submitted) {
      let myStyles: React.CSSProperties = {};
      if (!this.state.isEmpty) {
        myStyles = { visibility: "visible" };
      } else {
        myStyles = { visibility: "hidden" };
      }
      let submitButton = (
        <div style={myStyles}>
          <button onClick={this.handleSubmit}>OK</button>
        </div>
      );

      let style: React.CSSProperties = {
        outline: "none",
        background: "#0e141f",
        border: "none",
        fontSize: "4rem",
        color: "#ffcb36",
        textAlign: "center",
      };
      if (this.state.name === "") {
        style["textAlign"] = "left";
      }

      return (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "0",
            right: "0",
            transform: "translateY(-50%)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "2rem",
              textAlign: "center",
            }}
          >
            Hi. What's your name?
          </p>
          <input
            type="text"
            value={this.state.name}
            placeholder="Type your answer here..."
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            style={style}
            spellCheck="false"
            autoFocus
          />
          <br />
          <br />
          <br />
          {submitButton}
        </div>
      );
    } else {
      return <Config socket={this.props.socket} name={this.state.name} />;
    }
  }
}

export default EnterName;
