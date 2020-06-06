"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ConfirmDialog = ({ title, onUndo, onConfirm, onCancel, confirmText, cancelText, helpLink }) => (react_1.default.createElement("div", { className: "note-overlay" },
    react_1.default.createElement("div", { tabIndex: 0, className: "note-dialog sk-panel" },
        react_1.default.createElement("div", { className: "sk-panel-content" },
            react_1.default.createElement("div", { className: "sk-panel-section" },
                react_1.default.createElement("div", { className: "sk-panel-row" },
                    react_1.default.createElement("div", { className: "sk-h1" },
                        react_1.default.createElement("h3", null, title)),
                    react_1.default.createElement("button", { id: "undoDialog", onClick: onUndo, title: "Close" },
                        react_1.default.createElement("img", { src: "icons/ic-close.svg" }))),
                react_1.default.createElement("div", { className: "sk-panel-row" },
                    react_1.default.createElement("div", { className: "sk-h2" },
                        "Need help deciding? Check out the ",
                        react_1.default.createElement("a", { href: helpLink, target: "_blank", rel: "noopener" }, "documentation"),
                        ".")))),
        react_1.default.createElement("div", { className: "sk-panel-footer" },
            react_1.default.createElement("div", { className: "sk-button-group stretch" },
                react_1.default.createElement("button", { className: "sk-button neutral", onClick: onCancel },
                    react_1.default.createElement("div", { className: "sk-label" }, cancelText)),
                react_1.default.createElement("button", { className: "sk-button info", onClick: onConfirm },
                    react_1.default.createElement("div", { className: "sk-label" }, confirmText)))))));
exports.default = ConfirmDialog;
//# sourceMappingURL=PrintDialog.js.map