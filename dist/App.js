"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("regenerator-runtime/runtime");
const react_1 = require("react");
const AppendEditor_1 = require("./components/AppendEditor");
class App extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(AppendEditor_1.default, null)));
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map