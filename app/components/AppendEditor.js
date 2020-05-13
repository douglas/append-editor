import React from 'react';
import update from 'immutability-helper';
import { EditorKit, EditorKitDelegate } from 'sn-editor-kit';
import ConfirmDialog from './ConfirmDialog';
import EditNote from './EditNote';
import ViewNote from './ViewNote';
import AppendText from './AppendText';

const initialState = {
  text: '',
  appendText: '',
  appendMode: false,
  //editMode: false,
  viewMode: true,
  showMenu: false,
  showHelp: false,
  refreshEdit: false,
  refreshView: false,
  confirmOpenEdit: false,
  confirmStopEdit: false,
  confirmOpenAppend: false,
  appendTextRetrieved: false,
};

// TODO: Use a single global keyMap (currently there is also one in EditNote.js and ViewNote.js)
let keyMap = new Map();

export default class AppendEditor extends React.Component {
  constructor(props) {
    super(props);
    this.configureEditorKit();
    this.state = initialState;
  }

  configureEditorKit() {
    let delegate = new EditorKitDelegate({
      setEditorRawText: text => {
        this.setState({
          ...initialState,
          text,
        }, () => {
          this.onRefreshEdit();
        });
      },
      clearUndoHistory: () => {},
      getElementsBySelector: () => []
    });

    this.editorKit = new EditorKit({
      delegate: delegate,
      mode: 'plaintext',
      supportsFilesafe: false
    });
  }

  getAppendText = () => {
    this.editorKit.internal.componentManager.streamContextItem((note) => {
      this.setState({
        appendTextRetrieved: true,
      })
      if (note.content.appendText) {
        this.setState({
        appendText: note.content.appendText,
        },
        () => {
        console.log("loaded append text: " + this.state.appendText);
        console.log("internal appendtext: " + this.editorKit.internal.note.content.appendText);
        this.setState({
        appendMode: true
        });
        });
      }
      else {
        this.setState({
        appendMode: true,
        });
      }
    })
  }

  saveNote = (text) => {
    this.editorKit.onEditorValueChanged(text);
  }

  // Entry operations

  onAppend = (text) => {
    // Do nothing if there's no append text
    if (text) {
      /* 
      * We usually use this.editText() to save the main text
      * However, we want to save the main text and clear the appendText
      * Consecutive calls to the component manager does not work well,
      * so we want to do both with one call to the component manager */
      this.setState({
        text: this.state.text.concat(text),
        appendText: '',
      }, () => {
        let note = this.editorKit.internal.note;
        if (note) {
          this.editorKit.internal.componentManager.saveItemWithPresave(note, () => {
            note.content.text = this.state.text; // this.editorKit.internal.note.content.text
            note.content.appendText = this.state.appendText; // this.editorKit.internal.note.content.appendText
          });
        }
        this.onRefreshEdit();
      });
    }
  }

  onSave = ({text}) => {
    this.editText(text);
  }

  onSaveAppendText = (text) => {
    // This code is similar to this.onAppend();, but we only save the appendText and not the main text
    this.setState({
      appendText: text,
    })
    let note = this.editorKit.internal.note;
    if (note) {
      this.editorKit.internal.componentManager.saveItemWithPresave(note, () => {
        note.content.appendText = text; // this.editorKit.internal.note.content.appendText
      });
    }
    console.log("onSaveAppendText completed: " + note.content.appendText);
  }

  editText = (text) => {
    this.saveNote(text);
    console.log("text saved:" + text );
    this.setState({
      text: text,
    });
  };

  onRefreshEdit = () => {
    this.setState({
      refreshEdit: !this.state.refreshEdit,
    });
  }

  onRefreshView = () => {
    this.setState({
      refreshView: !this.state.refreshView,
    });
  }

  // Event Handlers
  onEditMode = () => {
    // if Append box is empty, close it and open Edit mode
    // if Edit mode is on, then close it, open View mode, and Append mode
    if (this.state.appendMode && !this.state.editMode) {
      var appendTextArea = document.getElementById("appendTextArea");
      if (!appendTextArea.value) { 
        this.setState({
          appendMode: false,
        });
      }
      this.setState({
        editMode: true,
        }, () => {
          var editTextArea = document.getElementById("editTextArea");
          editTextArea.focus();
        });
    }
    else if (this.state.editMode) {
      this.setState({
      editMode: false,
      viewMode: true,
      }, () => {
        var content = document.getElementById("editButton");
        content.focus();
        });
    }
    else if (!this.state.editMode) {
      this.setState({
      editMode: !this.state.editMode,
      }, () => {
        var editTextArea = document.getElementById("editTextArea");
        editTextArea.focus();
        });
    }
  };

  onAppendMode = () => {
    if (!this.state.appendMode) {
      this.getAppendText();
      this.setState({
      appendMode: true,
      editMode: false,
      viewMode: true,
      }, () => {
      this.scrollToBottom();
      var appendTextArea = document.getElementById("appendTextArea");
      appendTextArea.focus();
      });
    }
    else if (this.state.appendMode) {
      this.setState({
        appendMode: false,
      }, () => {
        var content = document.getElementById("appendButton");
        content.focus();
        });
    }
  }

  onViewMode = () => {
    this.setState({
      viewMode: !this.state.viewMode,
    });
  }

  onToggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    })
  }

  onToggleShowHelp = () => {
    this.setState({
      showHelp: !this.state.showHelp,
    })
    this.onRefreshView();
  }

  onConfirmOpenEdit = () => {
    this.setState({
      confirmOpenEdit: false,
      editMode: true,
    });
  }

  onCancelOpenEdit = () => {
    this.setState({
      confirmOpenEdit: false,
    });
  }

  onConfirmStopEdit = () => {
    this.setState({
      confirmStopEdit: false,
      editMode: false,
    });
  }

  onCancelStopEdit = () => {
    this.setState({
      confirmStopEdit: false,
    });
  }

  onConfirmOpenAppend = () => {
    this.setState({
      confirmOpenAppend: false,
      appendMode: true,
    });
  }

  onCancelOpenAppend = () => {
    this.setState({
      confirmOpenAppend: false,
    });
  }

  // Need both content and appendix for mobile
  scrollToBottom = () => {
    var content = document.getElementById("content");
    var appendix = document.getElementById("appendix");
    document.body.scrollTop = 10000000; // for Safari
    content.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"}); // Bottom
    appendix.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"}); // Bottom
  }

  // Need both content and appendix for mobile
  scrollToTop = () => {
    var content = document.getElementById("content")
    var header = document.getElementById("header");
    document.body.scrollTop = 0; // for Safari
    content.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"}); // Top
    header.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"}); // Top
  }

  onKeyDown = (e) => {
    keyMap.set(e.key, true);
    // Click the top Append if 'Control' and 'e' are pressed
    if (keyMap.get('Control') && keyMap.get('e')) {
      e.preventDefault();
      var editButton = document.getElementById("editButton");
      editButton.click();
    }
    // Click the top Append if 'Control' and 'u' are pressed
    else if (keyMap.get('Control') && !keyMap.get('Alt') && keyMap.get('u')) {
      e.preventDefault();
      var appendButton = document.getElementById("appendButton");
      appendButton.click();
    }
    // Click view if 'Control' and 'p' are pressed
    else if (keyMap.get('Control') && keyMap.get('p')) {
      e.preventDefault();
      var viewButton = document.getElementById("viewButton");
      viewButton.click();
    }
    // TODO: If you close it with Ctrl + W and open it again, the Ctrl event key isn't set to false
    // So, if you have minimize to tray on, then it'll open with Ctrl still down
  }

  onKeyUp = (e) => {
    keyMap.set(e.key, false);
  }

  render() {
    if (!this.state.appendTextRetrieved) {
      this.getAppendText();
    }
    return (
      <div tabIndex="0" className="sn-component" onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp}>
        <div id="header">
          <div className="sk-button-group">
            <button type="button" id="editButton" onClick={this.onEditMode} className="sk-button info">
              <div className="sk-label"> Edit </div>
            </button>
            <button type="button" id="appendButton" onClick={this.onAppendMode} className="sk-button info">
              <div className="sk-label"> Append </div>
            </button>
            <button type="button" id="viewButton" onClick={this.onViewMode} className="sk-button info">
              <div className="sk-label"> View </div>
            </button>
            <button type="button" id="menuButton" onClick={this.onToggleMenu} className="sk-button">
              <div className="sk-label"> ••• </div>
            </button>
            {this.state.showMenu && ([
            <button type="button" id="helpButton" onClick={this.onToggleShowHelp} className="sk-button info">
              <div className="sk-label"> Help </div>
            </button>
            ])}
            {this.state.showMenu && ([
            <button type="button" id="settingsButton" onClick={this.onToggleShowHelp} className="sk-button info">
              <div className="sk-label"> Settings </div>
            </button>
            ])}
          </div>
        </div>
        <div id="content">
          {this.state.editMode && !this.state.refreshEdit && (
            <EditNote
              text={this.state.text}
              onSave={this.onSave}
            />
          )}
          {this.state.editMode && this.state.refreshEdit && (
            <EditNote
              text={this.state.text}
              onSave={this.onSave}
            />
          )}
          {this.state.viewMode && !this.state.refreshView && (
            <ViewNote
              text={this.state.text}
              viewMode={this.state.viewMode}
              showHelp={this.state.showHelp}
            />
          )}
          {this.state.viewMode && this.state.refreshView && (
            <ViewNote
              text={this.state.text}
              viewMode={this.state.viewMode}
              showHelp={this.state.showHelp}
            />
          )}
          {this.state.confirmOpenEdit && (
            <ConfirmDialog
              title={`⚠️ Warning ⚠️`}
              message="You have unsaved text in your Append Box. Editing and Appending simultaneously may result in data loss. Would you still like to open the Edit box?"
              onConfirm={this.onConfirmOpenEdit}
              onCancel={this.onCancelOpenEdit}
            />
          )}
          {this.state.confirmStopEdit && (
            <ConfirmDialog
              title={`⚠️ Warning ⚠️`}
              message="You have unsaved changes in your Edit box. Would you still like to close it?"
              onConfirm={this.onConfirmStopEdit}
              onCancel={this.onCancelStopEdit}
            />
          )}
          {this.state.confirmOpenAppend && (
            <ConfirmDialog
              title={`⚠️ Warning ⚠️`}
              message="You have unsaved changes in your Edit Box. Editing and Appending simultaneously may result in data loss. Would you still like to open the Append box?"
              onConfirm={this.onConfirmOpenAppend}
              onCancel={this.onCancelOpenAppend}
            />
          )}
          {this.state.confirmHideAppend && (
            <ConfirmDialog
              title={`⚠️ Warning ⚠️`}
              message="You have unsaved text in your Append box. Would you still like to close it?"
              onConfirm={this.onConfirmHideAppend}
              onCancel={this.onCancelHideAppend}
            />
          )}
        </div>
        <div id="appendix">
          {this.state.appendMode && (
            <AppendText
              onAppend={this.onAppend}
              onSaveAppendText={this.onSaveAppendText}
              text={this.state.appendText}
            />
          )}
          <button type="button" id="scrollToTopButton" onClick={this.scrollToTop} className="sk-button info">
            <div className="sk-label"> ▲ </div>
          </button>
          <button type="button" id="scrollToBottomButton" onClick={this.scrollToBottom} className="sk-button info">
            <div className="sk-label"> ▼ </div>
          </button>
        </div>
      </div>
    );
  }
}