import React from 'react';
import './App.css';


const alphabet = "abcdefghijklmnopqrstuvwxyz ,.";

class ChangingLetters extends React.Component {
    
  state= {
      changingLetters: [],
      paused: false
  }


  changeLetters = () => {
      var newLetters = [];
      for (var i = 0; i < 640; i++) { 
          const newLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
          newLetters.push(newLetter);
      }

  this.setState({
      changingLetters: [...newLetters]
  })
  }


  componentDidMount() {
      this.idI = setInterval(this.changeLetters, 50)
  }

  componentWillUnmount() {
      clearInterval(this.idI)
  }

  componentDidUpdate() {
      document.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
      if(e.keyCode === 32 && !this.state.paused) {
          clearInterval(this.idI)
          this.setState({
              paused: true
          })
      }else if (e.keyCode === 32 && this.state.paused) {
          this.idI = setInterval(this.changeLetters, 50)
          this.setState({
              paused: false
          })
      }
  }

  
  render() {
        var index = 0;
        const showLetters = this.state.changingLetters.map(letter => {
          index++;
          return <div key={index} className="letters">{letter.toUpperCase()}</div>
         })

      return (
          <div onKeyUp={this.handleKeyUp} className="container">
            {showLetters}
          </div>
      )
  }
}

export default ChangingLetters;
