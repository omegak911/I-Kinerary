import React, { Component } from 'react';
import axios from 'axios';
const count = 0;
class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveText: ''
    }
  }

  saveRoute = async () => {
    let { 
      travelMode,
      trip_id, 
      waypoints
    } = this.props.route;
    let options = {
      travelMode,
      waypoints
    }

    try {
      await this.changeSaveText('...saving');
      axios
        .patch('/api/route', { trip_id, options })
        .then(() => this.changeSaveText('Saved!'))
        .catch(() => this.changeSaveText('sorry, unable to save'));
    } catch {
      this.changeSaveText('sorry, unable to save');
    }
  }

  changeSaveText = async (saveText) => {
    try {
      await this.setState({ saveText });
    } catch {
      await this.setState({ saveText: 'sorry, unable to save'});
    }
  }

  render() {
    return (
      <div>
        optimize
        <button type="button" onClick={this.saveRoute}>save</button>
        {this.state.saveText}
      </div>
    )
  }
}

export default Options;