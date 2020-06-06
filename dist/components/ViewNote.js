"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const unified_1 = require("unified");
const remark_parse_1 = require("remark-parse");
const remark_rehype_1 = require("remark-rehype");
const rehype2react = require('rehype-react');
const math = require('remark-math');
const rehypeKatex = require('rehype-katex');
const highlight = require('rehype-highlight');
const emoji = require('remark-emoji');
const externalLinks = require('remark-external-links');
const toc = require('remark-toc');
const footnotes = require('remark-footnotes');
const slug = require('remark-slug');
const raw = require('rehype-raw');
const processor = unified_1.default()
    .use(remark_parse_1.default)
    .use(slug)
    .use(toc, { maxDepth: 6 })
    .use(externalLinks)
    .use(footnotes, { inlineNotes: true })
    .use(remark_rehype_1.default, { allowDangerousHtml: true })
    .use(raw)
    .use(math)
    .use(rehypeKatex)
    .use(highlight, { ignoreMissing: true })
    .use(emoji)
    .use(rehype2react, { createElement: react_1.default.createElement });
class ViewNote extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.onToggleShowFeelings = () => {
            this.setState({
                showFeelings: !this.state.showFeelings
            });
        };
        this.onToggleShowMoreQuestions = () => {
            this.setState({
                showMoreQuestions: !this.state.showMoreQuestions
            });
        };
        this.onToggleShowFeedback = () => {
            this.setState({
                showFeedback: !this.state.showFeedback
            });
        };
        this.onToggleShowHelp = () => {
            const helpButton = document.getElementById("helpButton");
            helpButton.click();
        };
        this.state = {
            showHelp: this.props.showHelp,
            showFeelings: false,
            showMoreQuestions: false,
            showFeedback: false,
        };
        //this.onChange = this.onChange.bind(this);
    }
    render() {
        const { text } = this.props;
        return (react_1.default.createElement("div", { className: "sk-panel main view " + (this.props.printMode ? 'printModeOn' : 'printModeOff') + (this.props.printURL ? ' printURL' : ' printURLOff') },
            react_1.default.createElement("div", { className: "sk-panel-content view" },
                react_1.default.createElement("div", { className: "sk-panel-section" },
                    react_1.default.createElement("div", { className: "note-entry" },
                        react_1.default.createElement("div", { className: "note-details" },
                            react_1.default.createElement("div", { className: "note-info" },
                                (!text) && ([
                                    react_1.default.createElement("div", { className: "note-content" },
                                        react_1.default.createElement("div", { style: { textAlign: "center" } },
                                            react_1.default.createElement("details", null,
                                                react_1.default.createElement("summary", null, "Welcome to the Append Editor! \uD83D\uDC4B Your note is empty. \uD83D\uDE42"),
                                                react_1.default.createElement("br", null),
                                                "Click ",
                                                react_1.default.createElement("strong", null, "Edit"),
                                                " at the top \u2B06\uFE0F or ",
                                                react_1.default.createElement("strong", null, "Append"),
                                                " at the bottom \u2B07\uFE0F to add to your note. \uD83D\uDCDD",
                                                react_1.default.createElement("br", null),
                                                react_1.default.createElement("br", null),
                                                "Click\u00A0",
                                                react_1.default.createElement("img", { src: "icons/ic-help.svg", onClick: this.onToggleShowHelp, title: "Help" }),
                                                "\u00A0in the top menu to learn more about this editor.",
                                                react_1.default.createElement("br", null),
                                                react_1.default.createElement("br", null),
                                                "Happy note-taking! \uD83D\uDE04")))
                                ]),
                                this.state.showHelp && ([
                                    react_1.default.createElement("div", { className: "note-content" },
                                        react_1.default.createElement("hr", null),
                                        react_1.default.createElement("h3", null, "How do I use the Append Editor?"),
                                        "This editor supports ",
                                        react_1.default.createElement("a", { href: "https://guides.github.com/features/mastering-markdown/", target: "_blank", rel: "nofollow noreferrer noopener" }, "Markdown"),
                                        ", ",
                                        react_1.default.createElement("a", { href: "https://katex.org/docs/support_table.html", target: "_blank", rel: "nofollow noreferrer noopener" }, "KaTeX"),
                                        ", and ",
                                        react_1.default.createElement("a", { href: "https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md", target: "_blank", rel: "nofollow noreferrer noopener" }, "emoji codes"),
                                        ", syntax highlighting, inline HTML, table of contents, footnotes, auto-linking, printing, and more. For the full list of features and keyboard shortcuts, please visit the documentation at ",
                                        react_1.default.createElement("a", { href: "https://appendeditor.com", target: "_blank", rel: "noopener" }, "appendeditor.com"),
                                        ".",
                                        react_1.default.createElement("h3", null, "What do I write about?"),
                                        "Here are some questions to help you get started:",
                                        react_1.default.createElement("ul", null,
                                            react_1.default.createElement("li", null, "How are you? What's happening?"),
                                            react_1.default.createElement("li", null, "What might be affecting your mood?"),
                                            react_1.default.createElement("li", null, "Which feelings fit your mood and to what extent?"),
                                            react_1.default.createElement("details", { onToggle: this.onToggleShowFeelings },
                                                react_1.default.createElement("summary", null,
                                                    !this.state.showFeelings && ([react_1.default.createElement("a", null, "Show feelings")]),
                                                    this.state.showFeelings && ([react_1.default.createElement("a", null, "Hide feelings")])),
                                                react_1.default.createElement("li", null,
                                                    react_1.default.createElement("b", null, "Positive Feelings:"),
                                                    " bold, calm, cheerful, confident, content, eager, ecstatic, energized, engaged, enthusiastic, excited, grateful, happy, humorous, inspired, joyful, light, lively, loving, motivated, optimistic, passionate, peaceful, playful, proud, reassured, refreshed, relaxed, relieved, satisfied, secure, surprised, thrilled, wonderful"),
                                                react_1.default.createElement("li", null,
                                                    react_1.default.createElement("b", null, "Negative Feelings:"),
                                                    " afraid, angry, annoyed, anxious, ashamed, bored, burnt out, confused, demoralized, depressed, disappointed, disgusted, distraught, embarrassed, empty, exhausted, frustrated, furious, guilty, heavy, insecure, irritated, jealous, jittery, lethargic, lonely, nervous, numb, resentful, sad, self-conscious, sleepy, stressed, tired, winded, worried")),
                                            react_1.default.createElement("li", null, "What thoughts are contributing to the way you're feeling?"),
                                            react_1.default.createElement("details", { onToggle: this.onToggleShowMoreQuestions },
                                                react_1.default.createElement("summary", null,
                                                    !this.state.showMoreQuestions && ([react_1.default.createElement("a", null, "Show more questions")]),
                                                    this.state.showMoreQuestions && ([react_1.default.createElement("a", null, "Show fewer questions")]))),
                                            this.state.showMoreQuestions && ([
                                                react_1.default.createElement("div", null,
                                                    react_1.default.createElement("li", null, "What do you hope your life will look like in a week? a month? a year?"),
                                                    react_1.default.createElement("li", null, "What can you do today to make your life the way you want it?"),
                                                    react_1.default.createElement("li", null, "How will you feel when you've realized the goals that you have for yourself?"),
                                                    react_1.default.createElement("li", null, "Who or what do you feel grateful for and why?"),
                                                    react_1.default.createElement("li", null, "What did you enjoy about today?"))
                                            ])),
                                        react_1.default.createElement("details", { onToggle: this.onToggleShowFeedback },
                                            react_1.default.createElement("summary", null,
                                                react_1.default.createElement("a", null, "Give feedback")),
                                            this.state.showFeedback && ([
                                                react_1.default.createElement("div", null,
                                                    "Feel free to ",
                                                    react_1.default.createElement("a", { href: "https://appendeditor.com/contact", target: "_blank", rel: "noopener" }, "reach out"),
                                                    " if you have any questions, comments, concerns, or feedback. \uD83D\uDC4B",
                                                    react_1.default.createElement("br", null),
                                                    react_1.default.createElement("br", null))
                                            ])),
                                        "Click\u00A0",
                                        react_1.default.createElement("img", { src: "icons/ic-help.svg", onClick: this.onToggleShowHelp, title: "Help" }),
                                        "\u00A0in the top menu to close this section.",
                                        react_1.default.createElement("hr", null))
                                ]),
                                react_1.default.createElement("div", { id: "renderedNote", className: "note-content", style: { fontFamily: this.props.fontView } }, processor.processSync(text)))))))));
    }
}
exports.default = ViewNote;
//# sourceMappingURL=ViewNote.js.map