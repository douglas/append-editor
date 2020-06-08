import React from 'react';

let keyMap = new Map();

export default class EditNote extends React.Component {
  static defaultProps = {
    // none
  };

  constructor(props) {
    super(props);

    this.state = {
      text: this.props.text,
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value

    this.setState({
      text: value
    }, () => {
      try {
        this.onSave(event);
      }
      catch (error) {
        console.error(error);
      }
    });
  };

  onSave = e => {
    e.preventDefault();
    const { text } = this.state;
    this.props.onSave({text});
  };

  onKeyDown = (e) => {
    keyMap.set(e.key, true);
    //console.log("Keys pressed: " + e.key + "KeyMap for key: " + keyMap.get(e.key)) + "KeyMap for Shift: " + keyMap.get('Shift');
    
    // Click Edit if 'Escape' is pressed
    if (keyMap.get('Escape')) {
      e.preventDefault();
      keyMap.set('Escape', false);
      var editButton = document.getElementById("editButton");
      editButton.click();
    }
    // Add four spaces if tab is pressed without shift
    else if (keyMap.get('Control') && !keyMap.get('Shift') && keyMap.get('Tab')) {
      e.preventDefault();
      // Using document.execCommand gives us undo support
      document.execCommand("insertText", false, "\t")
        // document.execCommand works great on Chrome/Safari but not Firefox
    }
    // Add two spaces and line break if Shift and Enter are pressed
    else if (keyMap.get('Shift') && keyMap.get('Enter')) {
      e.preventDefault();
      document.execCommand("insertText", false, "  \n")
    }
    // Save note if Control and Enter are pressed
    else if (keyMap.get('Control') && keyMap.get('Enter')) {
      e.preventDefault();
      this.onSave(e);
    }
    // Add two stars if Control + b are pressed
    else if (keyMap.get('Control') && keyMap.get('b')) {
      e.preventDefault();
      document.execCommand("insertText", false, "**")
    }
    // Add header when pressing Control + H
    else if (keyMap.get('Control') && keyMap.get('h')) {
      e.preventDefault();
      document.execCommand("insertText", false, "#")
    }
    // Add image code if Control + Alt and i are pressed
    else if (keyMap.get('Control') && keyMap.get('Alt') && keyMap.get('i')) {
      e.preventDefault();
      document.execCommand("insertText", false, "![]()")
    }
    // Add one stars if Control + i is pressed
    else if (keyMap.get('Control') && keyMap.get('i')) {
      e.preventDefault();
      document.execCommand("insertText", false, "*")
    }
    // Add inline code if Control + Alt and k are pressed
    else if (keyMap.get('Control') && keyMap.get('Alt') && keyMap.get('k')) {
      e.preventDefault();
      document.execCommand("insertText", false, "\`")
    }
    // Add link if Control + k are pressed
    else if (keyMap.get('Control') && keyMap.get('k')) {
      e.preventDefault();
      document.execCommand("insertText", false, "[]()")
    }
    // Add ordered list item if Control + Alt + l are pressed
    else if (keyMap.get('Control') && keyMap.get('Alt') && keyMap.get('l')){
      e.preventDefault();
      document.execCommand("insertText", false, "\n1. ")
    }
    // Add unordered list item if Control + l are pressed
    else if (keyMap.get('Control') && keyMap.get('l')) {
      e.preventDefault();
      document.execCommand("insertText", false, "\n- ")
    }
    // Add strikethrough if Control + Alt + u are pressed
    else if (keyMap.get('Control') && keyMap.get('Alt') && keyMap.get('u')) {
      e.preventDefault();
      document.execCommand("insertText", false, "~~")
    }
    // Add quote Control + q, Control + ' or Control + " are pressed
    else if ((keyMap.get('Control') && keyMap.get('q')) ||
     (keyMap.get('Control') && keyMap.get('\'')) ||
     (keyMap.get('Control') && keyMap.get('\"'))) {
      e.preventDefault();
      document.execCommand("insertText", false, "\n> ")
    }
    // Save note if Control and S are pressed
    else if (keyMap.get('Control') && keyMap.get('s')) {
      e.preventDefault();
      this.onSave(e);
    }
  }

  onKeyUp = (e) => {
    keyMap.set(e.key, false);
  }

  onBlur = (e) => {
    keyMap.clear();
  }

  render() {
    const {text} = this.state;
    
    return (
      <div className={"sk-panel main edit "  + (this.props.printMode ? 'printModeOn' : 'printModeOff' )}>
        <div className="sk-panel-content edit">
          <textarea
            id="editTextArea"
            name="text"
            className="sk-input contrast textarea editnote"
            placeholder="Welcome to the Append Editor! 😄"
            rows="15"
            spellCheck="true"
            value={text}
            onChange={this.handleInputChange}
            onKeyDown={this.onKeyDown}
            onKeyUp={this.onKeyUp}
            onBlur={this.onBlur}
            type="text"
            style={{fontFamily: this.props.fontEdit}}
          />
        </div>
      </div>
    );
  }
}