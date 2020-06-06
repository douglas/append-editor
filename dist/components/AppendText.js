"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
let keyMap = new Map();
let AppendText = /** @class */ (() => {
    class AppendText extends react_1.default.Component {
        constructor(props) {
            super(props);
            this.handleInputChange = (event) => {
                const target = event.target;
                //const value = target.value
                const value = target.type === 'checkbox' ? target.checked : target.value;
                const name = target.name;
                this.setState({
                    [name]: value,
                }
                // This callback is used to save the append text and checkboxes
                // This will work in an SN context, but breaks the standalone editor, so we need to catch the error
                , () => {
                    try {
                        this.onSaveAppendTextAndCheckboxes();
                    }
                    catch (error) {
                        console.error(error);
                    }
                });
            };
            // This is an almost duplicate of the above editor. Here we don't save the checkboxes to improve performance
            this.handleTextAreaChange = (event) => {
                const target = event.target;
                const value = target.value;
                this.setState({
                    text: value,
                }
                // This callback is used to save the append text
                // This will work in an SN context, but breaks the standalone editor, so we need to catch the error
                , () => {
                    try {
                        this.onSaveAppendText();
                    }
                    catch (error) {
                        console.error(error);
                    }
                });
            };
            this.onAppend = () => {
                //e.preventDefault();
                const { text } = this.state;
                var appendText = '';
                // We test for new paragraph first even though new line is on top and is on by default
                if (this.state.newParagraph && text) {
                    appendText = '  \n\n' + text;
                }
                else if (this.state.newLine && text) {
                    appendText = '  \n' + text;
                }
                else {
                    appendText = text;
                }
                this.props.onAppend(appendText);
                this.setState({
                    text: '',
                });
                const appendTextArea = document.getElementById("appendTextArea");
                appendTextArea.focus();
            };
            this.onSaveAppendText = () => {
                const text = this.state.text;
                this.props.onSaveAppendText(text);
            };
            this.onSaveAppendTextAndCheckboxes = () => {
                //console.log("newline: " + this.state.newLine);
                //console.log("new paragraph: " + this.state.newParagraph);
                const text = this.state.text;
                const newLine = this.state.newLine;
                const newParagraph = this.state.newParagraph;
                this.props.onSaveAppendTextAndCheckboxes(text, newLine, newParagraph);
            };
            this.onKeyDown = (e) => {
                keyMap.set(e.key, true);
                //console.log("Keys pressed: " + e.key + "KeyMap for key: " + keyMap.get(e.key)) + "KeyMap for Shift: " + keyMap.get('Shift');
                // Click Append if 'Escape' is pressed
                if (keyMap.get('Escape')) {
                    e.preventDefault();
                    keyMap.set('Escape', false);
                    var appendButton = document.getElementById("appendButton");
                    appendButton.click();
                }
                // Add four spaces if Control and Tab are pressed without Shift
                else if (keyMap.get('Control') && !keyMap.get('Shift') && keyMap.get('Tab')) {
                    e.preventDefault();
                    // Using document.execCommand gives us undo support
                    document.execCommand("insertText", false, "\t");
                    // document.execCommand works great on Chrome/Safari but not Firefox
                }
                // Add two spaces and line break if Shift and Enter are pressed
                else if (keyMap.get('Shift') && keyMap.get('Enter')) {
                    e.preventDefault();
                    document.execCommand("insertText", false, "  \n");
                }
                // Append text if Control and Enter are pressed
                else if (keyMap.get('Control') && keyMap.get('Enter')) {
                    e.preventDefault();
                    this.onAppend();
                }
                // Add two stars if Control + b are pressed
                else if (keyMap.get('Control') && keyMap.get('b')) {
                    e.preventDefault();
                    document.execCommand("insertText", false, "**");
                }
                // Add header when pressing Control + H
                else if (keyMap.get('Control') && keyMap.get('h')) {
                    e.preventDefault();
                    document.execCommand("insertText", false, "#");
                }
                // Add image code if Control + Alt and i are pressed
                else if (keyMap.get('Control') && keyMap.get('Alt') && keyMap.get('i')) {
                    e.preventDefault();
                    document.execCommand("insertText", false, "![]()");
                }
                // Add one stars if Control + i is pressed
                else if (keyMap.get('Control') && keyMap.get('i')) {
                    e.preventDefault();
                    document.execCommand("insertText", false, "*");
                }
                // Add inline code if Control + Alt and k are pressed
                else if (keyMap.get('Control') && keyMap.get('Alt') && keyMap.get('k')) {
                    e.preventDefault();
                    document.execCommand("insertText", false, "\`");
                }
                // Add link if Control + k are pressed
                else if (keyMap.get('Control') && keyMap.get('k')) {
                    e.preventDefault();
                    document.execCommand("insertText", false, "[]()");
                }
                // Add ordered list item if Control + Alt + l are pressed
                else if (keyMap.get('Control') && keyMap.get('Alt') && keyMap.get('l')) {
                    e.preventDefault();
                    document.execCommand("insertText", false, "\n1. ");
                }
                // Add unordered list item if Control + l are pressed
                else if (keyMap.get('Control') && keyMap.get('l')) {
                    e.preventDefault();
                    document.execCommand("insertText", false, "\n- ");
                }
                // Add strike through if Control + Alt + u are pressed
                else if (keyMap.get('Control') && keyMap.get('Alt') && keyMap.get('u')) {
                    e.preventDefault();
                    document.execCommand("insertText", false, "~~");
                }
                // Add quote Control + q, Control + ' or Control + " are pressed
                else if ((keyMap.get('Control') && keyMap.get('q')) ||
                    (keyMap.get('Control') && keyMap.get('\'')) ||
                    (keyMap.get('Control') && keyMap.get('\"'))) {
                    e.preventDefault();
                    document.execCommand("insertText", false, "\n> ");
                }
                // Append text if Control and S are pressed
                else if (keyMap.get('Control') && keyMap.get('s')) {
                    e.preventDefault();
                    this.onAppend();
                }
            };
            this.onKeyUp = (e) => {
                keyMap.set(e.key, false);
            };
            this.onBlur = (e) => {
                keyMap.clear();
            };
            this.state = {
                text: this.props.text,
                newLine: this.props.newLine,
                newParagraph: this.props.newParagraph,
            };
            this.handleInputChange = this.handleInputChange.bind(this);
        }
        render() {
            const { text } = this.state;
            return (react_1.default.createElement("div", { className: "sk-panel main appendix " + (this.props.printMode ? 'printModeOn' : 'printModeOff') },
                react_1.default.createElement("div", { className: "sk-panel-content edit" },
                    react_1.default.createElement("textarea", { id: "appendTextArea", name: "text", className: "sk-input contrast textarea append", placeholder: "Append to your note \uD83D\uDE42", rows: this.props.rows, spellCheck: "true", value: text, onChange: this.handleTextAreaChange, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp, onBlur: this.onBlur, style: { fontFamily: this.props.fontEdit } })),
                react_1.default.createElement("div", { className: "sk-panel-row" },
                    react_1.default.createElement("form", { className: "checkBoxForm" },
                        react_1.default.createElement("label", null,
                            react_1.default.createElement("input", { name: "newLine", type: "checkbox", checked: this.state.newLine, onChange: this.handleInputChange }),
                            "New Line"),
                        react_1.default.createElement("br", null),
                        react_1.default.createElement("label", null,
                            react_1.default.createElement("input", { name: "newParagraph", type: "checkbox", checked: this.state.newParagraph, onChange: this.handleInputChange }),
                            "New Paragraph")),
                    react_1.default.createElement("div", { className: "sk-button-group stretch" },
                        react_1.default.createElement("button", { type: "button", id: "appendTextButton", onClick: this.onAppend, className: "sk-button info" },
                            react_1.default.createElement("div", { className: "sk-label" }, "Append"))))));
        }
    }
    AppendText.defaultProps = {
    // none
    };
    return AppendText;
})();
exports.default = AppendText;
//# sourceMappingURL=AppendText.js.map