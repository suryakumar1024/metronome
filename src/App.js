import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import mediafile from "./asserts/Guitar.mp3"
import metronome from "./asserts/metronome.mp3"

class App extends Component {
  constructor() {
    super();
    this.state = {
      volume:1,
      speed:1,
      Guitar:false
    };
  }
  // componentWillMount(){
  //   console.log('componentWillMount');
  // }
  getSnapshotBeforeUpdate() {
    console.log('getSnapshotBeforeUpdate');
  }
  componentDidMount() {
    this.audiomedia = new Audio(mediafile);
    // this.audiomedia.src = "http://file-examples.com/wp-content/uploads/2017/11/file_example_OOG_1MG.ogg"
    this.audiomedia.autoPlay = true;
    this.audiomedia.loop = true;
    this.audiomedia.play();
  }
  componentWillUnmount() {
    console.log("called componentWillUnmount");
  }
  componentDidUpdate() {
    console.log("called componentDidUpdate")
  }
  arrowfunction = e => {
    let speed = e.target.value;
    console.log("Speed set to" + speed);
    this.audiomedia.playbackRate = speed;
    this.setState({speed:speed});
    // document.getElementById('myaudio').playbackRate = e.target.value;

  }
  volumefunction = e => {
    let vol = e.target.value;
    console.log("volume is"+ vol);
    this.audiomedia.volume = vol;
    this.setState({volume:vol});
    console.log('state'+ JSON.stringify(this.state))
  }

  handle_file_upload = e => {
    console.log(e.target.files[0]);
    var audiomedia = new Audio(e.target.files[0]);
    audiomedia.play();
  }
  changesound = e => {
    console.log('Chaning sound')
    this.audiomedia.pause();
    if(this.state.Guitar){
      this.setState({Guitar:false});
      this.audiomedia = new Audio(mediafile);
    }
    else{
      this.setState({Guitar:true});
      this.audiomedia = new Audio(metronome);
    }
      this.audiomedia.play();
      this.audiomedia.volume = this.state.volume;
      this.audiomedia.playbackRate = this.state.speed;
      this.audiomedia.loop = true;
      this.audiomedia.autoplay= true;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>Initialized audio at componentDidMount</h1>
        <h2>Playing {this.state.Guitar? "Metronome":"Guitar"} audio</h2>
          {/* <input type="file" id="uploader" onChange={this.handle_file_upload} /> */}
          {/* <audio controls autoPlay id="myaudio">
            <source src="../asserts/tamborine_120bpm_4-4time_4beats_stereo_MuByp2.mp3" type="audio/mpeg"/>
            <source src="http://file-examples.com/wp-content/uploads/2017/11/file_example_OOG_1MG.ogg" type="audio/ogg"/>
            Your browser does not support the audio tag.
          </audio> */}
          <input id="slider" type="range" value={this.state.speed} min="0" max="2" step="0.1" onChange={this.arrowfunction}/>
          <p>slide to change the speed range</p>
          <input id="volumeslider" type="range" value={this.state.volume} min="0" max="1" step="0.1" onChange={this.volumefunction}/>
          <p>slide to change the volume range</p>
          <p>Both speed and volume value's are stored in state and served.</p>
          <button name="soundname" onClick={this.changesound}>{this.state.Guitar? "Metronome":"Guitar"}</button>
        </header>
      </div>
    );
  }
}

export default App;
