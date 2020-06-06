"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const keyMap = new Map();
class Settings extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.clearFontEdit = () => {
            this.setState({
                fontEdit: "",
            });
            const fontEdit = document.getElementById("fontEdit");
            fontEdit.value = "";
            fontEdit.focus();
        };
        this.clearFontView = () => {
            this.setState({
                fontView: "",
            });
            const fontView = document.getElementById("fontView");
            fontView.value = "";
            fontView.focus();
        };
        this.clearAllSettings = () => {
            // We clear fontView before fontEdit so the focus afterwards is on fontEdit (the first setting)
            this.clearFontView();
            this.clearFontEdit();
        };
        this.onKeyDown = (e) => {
            keyMap.set(e.key, true);
            console.log("Keys pressed: " + e.key + "KeyMap for key: " + keyMap.get(e.key)) + "KeyMap for Shift: " + keyMap.get('Shift');
            // Save settings if Control and 's' are pressed
            if (keyMap.get('Control') && keyMap.get('s')) {
                e.preventDefault();
                this.handleSubmit();
            }
            // Save settings if Control and Enter are pressed
            else if (keyMap.get('Control') && keyMap.get('Enter')) {
                e.preventDefault();
                this.handleSubmit();
            }
        };
        this.onKeyUp = (e) => {
            keyMap.set(e.key, false);
        };
        this.state = {
            fontEdit: this.props.fontEdit,
            fontView: this.props.fontView,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
        console.log("name" + event.target.name);
    }
    handleSubmit() {
        //event.preventDefault();
        let fontEditMessage = "";
        let fontViewMessage = "";
        console.log("fontEdit: " + this.state.fontEdit);
        console.log("fontView: " + this.state.fontView);
        if (this.state.fontEdit === "" || this.state.fontEdit === undefined) {
            fontEditMessage = "Default";
        }
        else if (this.state.fontEdit) {
            fontEditMessage = this.state.fontEdit;
        }
        if (this.state.fontView === "" || this.state.fontView === undefined) {
            fontViewMessage = "Default";
        }
        else if (this.state.fontView) {
            fontViewMessage = this.state.fontView;
        }
        const { fontEdit, fontView } = this.state;
        alert('Your chosen font for Edit/Append is: ' + fontEditMessage + "\n" +
            'Your chosen font for View/Print is: ' + fontViewMessage);
        this.props.onConfirm({ fontEdit }, { fontView });
    }
    render() {
        //<h3>↶</h3>
        const { title, onCancel, confirmText, cancelText, helpLink } = this.props;
        return (react_1.default.createElement("div", { className: "note-overlay" },
            react_1.default.createElement("div", { className: "note-dialog sk-panel" },
                react_1.default.createElement("div", { className: "sk-panel-content" },
                    react_1.default.createElement("div", { className: "sk-panel-section" },
                        react_1.default.createElement("datalist", { id: "fonts" },
                            ",",
                            react_1.default.createElement("option", { value: "SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace" }),
                            react_1.default.createElement("option", { value: "Times New Roman" }),
                            react_1.default.createElement("option", { value: "Arial" }),
                            react_1.default.createElement("option", { value: "Arial Black" }),
                            react_1.default.createElement("option", { value: "-apple-system" }),
                            react_1.default.createElement("option", { value: "Bell MT" }),
                            react_1.default.createElement("option", { value: "Baskerville Old Face" }),
                            react_1.default.createElement("option", { value: "Bahnschrift Light" }),
                            react_1.default.createElement("option", { value: "BlinkMacSystemFont" }),
                            react_1.default.createElement("option", { value: "Bodoni MT" }),
                            react_1.default.createElement("option", { value: "Calibri" }),
                            react_1.default.createElement("option", { value: "Calibri Light" }),
                            react_1.default.createElement("option", { value: "Calisto MT" }),
                            react_1.default.createElement("option", { value: "Cambria" }),
                            react_1.default.createElement("option", { value: "Candara" }),
                            react_1.default.createElement("option", { value: "Candara Light" }),
                            react_1.default.createElement("option", { value: "Cantarell" }),
                            react_1.default.createElement("option", { value: "Centaur" }),
                            react_1.default.createElement("option", { value: "Century" }),
                            react_1.default.createElement("option", { value: "Century Gothic" }),
                            react_1.default.createElement("option", { value: "Comic Sans MS" }),
                            react_1.default.createElement("option", { value: "Consolas" }),
                            react_1.default.createElement("option", { value: "Constantia" }),
                            react_1.default.createElement("option", { value: "Courier New" }),
                            react_1.default.createElement("option", { value: "Corbel" }),
                            react_1.default.createElement("option", { value: "Corbel Light" }),
                            react_1.default.createElement("option", { value: "DengXian" }),
                            react_1.default.createElement("option", { value: "Ebrima" }),
                            react_1.default.createElement("option", { value: "Droid Sans" }),
                            react_1.default.createElement("option", { value: "Fira Sans" }),
                            react_1.default.createElement("option", { value: "Gabriola" }),
                            react_1.default.createElement("option", { value: "Garamond" }),
                            react_1.default.createElement("option", { value: "Georgia" }),
                            react_1.default.createElement("option", { value: "Helvetica" }),
                            react_1.default.createElement("option", { value: "Helvetica Neue" }),
                            react_1.default.createElement("option", { value: "Impact" }),
                            react_1.default.createElement("option", { value: "KaTeX_AMS" }),
                            react_1.default.createElement("option", { value: "KaTeX_Caligraphic" }),
                            react_1.default.createElement("option", { value: "KaTeX_Fraktur" }),
                            react_1.default.createElement("option", { value: "KaTeX_Main" }),
                            react_1.default.createElement("option", { value: "KaTeX_Math" }),
                            react_1.default.createElement("option", { value: "KaTeX_SansSerif" }),
                            react_1.default.createElement("option", { value: "KaTeX_Script" }),
                            react_1.default.createElement("option", { value: "KaTeX_Typewriter" }),
                            react_1.default.createElement("option", { value: "Lato" }),
                            react_1.default.createElement("option", { value: "Liberation Mono" }),
                            react_1.default.createElement("option", { value: "Lucida Caligraphy" }),
                            react_1.default.createElement("option", { value: "Lucida Sans" }),
                            react_1.default.createElement("option", { value: "Menlo" }),
                            react_1.default.createElement("option", { value: "Monaco" }),
                            react_1.default.createElement("option", { value: "Monospace" }),
                            react_1.default.createElement("option", { value: "New York" }),
                            react_1.default.createElement("option", { value: "Oxygen" }),
                            react_1.default.createElement("option", { value: "Palatino" }),
                            react_1.default.createElement("option", { value: "Roboto" }),
                            react_1.default.createElement("option", { value: "Sans-Serif" }),
                            react_1.default.createElement("option", { value: "Segoe UI" }),
                            react_1.default.createElement("option", { value: "SFMono-Regular" }),
                            react_1.default.createElement("option", { value: "Serif" }),
                            react_1.default.createElement("option", { value: "Sylfaen" }),
                            react_1.default.createElement("option", { value: "Tahoma" }),
                            react_1.default.createElement("option", { value: "Times New Roman" }),
                            react_1.default.createElement("option", { value: "Trebuchet MS" }),
                            react_1.default.createElement("option", { value: "Ubuntu" }),
                            react_1.default.createElement("option", { value: "Verdana" }),
                            react_1.default.createElement("option", { value: "Yu Gothic" })),
                        react_1.default.createElement("div", { className: "sk-panel-row" },
                            react_1.default.createElement("div", { className: "sk-h1" },
                                react_1.default.createElement("h2", null, title)),
                            react_1.default.createElement("button", { id: "undoDialog", onClick: onCancel, title: "Close" },
                                react_1.default.createElement("img", { src: "icons/ic-close.svg" }))),
                        react_1.default.createElement("div", { className: "sk-panel-row" },
                            react_1.default.createElement("div", { className: "sk-h2" },
                                "Need help? Check out the ",
                                react_1.default.createElement("a", { href: helpLink, target: "_blank", rel: "noopener" }, "documentation"),
                                ". ",
                                react_1.default.createElement("br", null),
                                "For the default settings, click\u00A0",
                                react_1.default.createElement("button", { onClick: this.clearAllSettings, title: "Reset all Settings" },
                                    react_1.default.createElement("img", { src: "icons/ic-undo.svg" })))),
                        react_1.default.createElement("div", { className: "sk-panel-row settings" },
                            react_1.default.createElement("div", { className: "sk-h2" }, "Choose a font for Edit/Append: "),
                            react_1.default.createElement("div", null,
                                react_1.default.createElement("input", { list: "fonts", id: "fontEdit", name: "fontEdit", value: this.state.fontEdit, onChange: this.handleChange }),
                                react_1.default.createElement("button", { onClick: this.clearFontEdit, title: "Reset font for Edit/Append" },
                                    react_1.default.createElement("img", { src: "icons/ic-undo.svg" })))),
                        react_1.default.createElement("div", { className: "sk-panel-row settings" },
                            react_1.default.createElement("div", { className: "sk-h2" }, "Choose a font for View/Print: "),
                            react_1.default.createElement("div", null,
                                react_1.default.createElement("input", { list: "fonts", id: "fontView", name: "fontView", value: this.state.fontView, onChange: this.handleChange }),
                                react_1.default.createElement("button", { onClick: this.clearFontView, title: "Reset font for View/Print" },
                                    react_1.default.createElement("img", { src: "icons/ic-undo.svg" })))))),
                react_1.default.createElement("div", { className: "sk-panel-footer" },
                    react_1.default.createElement("div", { className: "sk-button-group stretch" },
                        react_1.default.createElement("button", { className: "sk-button neutral", onClick: onCancel },
                            react_1.default.createElement("div", { className: "sk-label" }, cancelText)),
                        react_1.default.createElement("button", { className: "sk-button info", onClick: this.handleSubmit },
                            react_1.default.createElement("div", { className: "sk-label" }, confirmText)))))));
    }
}
exports.default = Settings;
//# sourceMappingURL=Settings.js.map