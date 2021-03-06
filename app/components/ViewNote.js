import React from 'react';
import unified from 'unified';
import parse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import rehype2react from 'rehype-react';
const breaks = require('remark-breaks');
const math = require('remark-math');
const rehypeKatex = require('rehype-katex');
const highlight = require('rehype-highlight');
const emoji = require('remark-emoji');
const externalLinks = require('remark-external-links');
const toc = require('remark-toc');
const footnotes = require('remark-footnotes');
const slug = require('remark-slug');
const raw = require('rehype-raw');

const processor = unified()
  .use(parse)
  .use(breaks)
  .use(slug)
  .use(toc, { maxDepth: 6 })
  .use(externalLinks)
  .use(footnotes, { inlineNotes: true })
  .use(remark2rehype, { allowDangerousHtml: true })
  .use(raw)
  .use(math)
  .use(rehypeKatex)
  .use(highlight, { ignoreMissing: true })
  .use(emoji)
  .use(rehype2react, { createElement: React.createElement });

export default class ViewNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showHelp: this.props.showHelp,
      showFeelings: false,
      showMoreQuestions: false,
      showFeedback: false,
    };
    //this.onChange = this.onChange.bind(this);
  }

  onToggleShowFeelings = () => {
    this.setState({
      showFeelings: !this.state.showFeelings,
    });
  };

  onToggleShowMoreQuestions = () => {
    this.setState({
      showMoreQuestions: !this.state.showMoreQuestions,
    });
  };

  onToggleShowFeedback = () => {
    this.setState({
      showFeedback: !this.state.showFeedback,
    });
  };

  onToggleShowHelp = () => {
    const helpButton = document.getElementById('helpButton');
    helpButton.click();
  };

  render() {
    const { text } = this.props;

    return (
      <div
        className={
          'sk-panel main view ' +
          (this.props.printMode ? 'printModeOn' : 'printModeOff') +
          (this.props.printURL ? ' printURL' : ' printURLOff')
        }
      >
        <div className="sk-panel-content view">
          <div className="sk-panel-section">
            <div className="note-entry">
              <div className="note-details">
                <div className="note-info">
                  {!text && [
                    <div className="note-content">
                      <div style={{ textAlign: 'center' }}>
                        <details>
                          <summary>
                            Welcome to the Append Editor! 👋 Your note is empty.
                            🙂
                          </summary>
                          <br></br>
                          Click <strong>Edit</strong> (
                          <svg
                            role="img"
                            aria-label="Pencil icon to toggle edit mode"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.7167 7.5L12.5 8.28333L4.93333 15.8333H4.16667V15.0667L11.7167 7.5ZM14.7167 2.5C14.5083 2.5 14.2917 2.58333 14.1333 2.74167L12.6083 4.26667L15.7333 7.39167L17.2583 5.86667C17.5833 5.54167 17.5833 5 17.2583 4.69167L15.3083 2.74167C15.1417 2.575 14.9333 2.5 14.7167 2.5ZM11.7167 5.15833L2.5 14.375V17.5H5.625L14.8417 8.28333L11.7167 5.15833Z"
                              fill={'var(--sn-stylekit-foreground-color)'}
                            />
                          </svg>
                          ) at the top ⬆️ or <strong>Append</strong> at the
                          bottom ⬇️ to add to your note. 📝
                          <br></br>
                          <br></br>
                          Click&nbsp;
                          <svg
                            role="button"
                            aria-label="toggle show help"
                            onClick={this.onToggleShowHelp}
                            title="Help"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.16675 15.0001H10.8334V13.3334H9.16675V15.0001ZM10.0001 1.66675C8.90573 1.66675 7.8221 1.8823 6.81105 2.30109C5.80001 2.71987 4.88135 3.3337 4.10753 4.10753C2.54472 5.67033 1.66675 7.78995 1.66675 10.0001C1.66675 12.2102 2.54472 14.3298 4.10753 15.8926C4.88135 16.6665 5.80001 17.2803 6.81105 17.6991C7.8221 18.1179 8.90573 18.3334 10.0001 18.3334C12.2102 18.3334 14.3298 17.4554 15.8926 15.8926C17.4554 14.3298 18.3334 12.2102 18.3334 10.0001C18.3334 8.90573 18.1179 7.8221 17.6991 6.81105C17.2803 5.80001 16.6665 4.88135 15.8926 4.10753C15.1188 3.3337 14.2002 2.71987 13.1891 2.30109C12.1781 1.8823 11.0944 1.66675 10.0001 1.66675ZM10.0001 16.6668C6.32508 16.6668 3.33342 13.6751 3.33342 10.0001C3.33342 6.32508 6.32508 3.33342 10.0001 3.33342C13.6751 3.33342 16.6668 6.32508 16.6668 10.0001C16.6668 13.6751 13.6751 16.6668 10.0001 16.6668ZM10.0001 5.00008C9.11603 5.00008 8.26818 5.35127 7.64306 5.97639C7.01794 6.60151 6.66675 7.44936 6.66675 8.33342H8.33342C8.33342 7.89139 8.50901 7.46747 8.82157 7.1549C9.13413 6.84234 9.55806 6.66675 10.0001 6.66675C10.4421 6.66675 10.866 6.84234 11.1786 7.1549C11.4912 7.46747 11.6667 7.89139 11.6667 8.33342C11.6667 10.0001 9.16675 9.79175 9.16675 12.5001H10.8334C10.8334 10.6251 13.3334 10.4167 13.3334 8.33342C13.3334 7.44936 12.9822 6.60151 12.3571 5.97639C11.732 5.35127 10.8841 5.00008 10.0001 5.00008Z"
                              fill={
                                this.state.showHelp
                                  ? 'var(--sn-stylekit-info-color)'
                                  : 'var(--sn-stylekit-foreground-color)'
                              }
                            />
                          </svg>
                          &nbsp;in the top menu to learn more about this editor.
                          <br></br>
                          <br></br>
                          Happy note-taking! 😄
                        </details>
                      </div>
                    </div>,
                  ]}
                  {this.state.showHelp && [
                    <div className="note-content">
                      <hr></hr>
                      <h3>How do I use the Append Editor?</h3>
                      This editor supports{' '}
                      <a
                        href="https://guides.github.com/features/mastering-markdown/"
                        target="_blank"
                        rel="nofollow noreferrer noopener"
                      >
                        Markdown
                      </a>
                      ,{' '}
                      <a
                        href="https://katex.org/docs/support_table.html"
                        target="_blank"
                        rel="nofollow noreferrer noopener"
                      >
                        KaTeX
                      </a>
                      , and{' '}
                      <a
                        href="https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md"
                        target="_blank"
                        rel="nofollow noreferrer noopener"
                      >
                        emoji codes
                      </a>
                      , syntax highlighting, in-line HTML, table of contents,
                      footnotes, auto-linking, printing, and more. For the full
                      list of features and keyboard shortcuts, please visit the
                      documentation at{' '}
                      <a
                        href="https://appendeditor.com"
                        target="_blank"
                        rel="noopener"
                      >
                        appendeditor.com
                      </a>
                      .<h3>What do I write about?</h3>
                      Here are some questions to help you get started:
                      <ul>
                        <li>How are you? What's happening?</li>
                        <li>What might be affecting your mood?</li>
                        <li>
                          Which feelings fit your mood and to what extent?
                        </li>
                        <details onToggle={this.onToggleShowFeelings}>
                          <summary>
                            {!this.state.showFeelings && [<a>Show feelings</a>]}
                            {this.state.showFeelings && [<a>Hide feelings</a>]}
                          </summary>
                          <li>
                            <b>Positive Feelings:</b> bold, calm, cheerful,
                            confident, content, eager, ecstatic, energized,
                            engaged, enthusiastic, excited, grateful, happy,
                            humorous, inspired, joyful, light, lively, loving,
                            motivated, optimistic, passionate, peaceful,
                            playful, proud, reassured, refreshed, relaxed,
                            relieved, satisfied, secure, surprised, thrilled,
                            wonderful
                          </li>
                          <li>
                            <b>Negative Feelings:</b> afraid, angry, annoyed,
                            anxious, ashamed, bored, burnt out, confused,
                            demoralized, depressed, disappointed, disgusted,
                            distraught, embarrassed, empty, exhausted,
                            frustrated, furious, guilty, heavy, insecure,
                            irritated, jealous, jittery, lethargic, lonely,
                            nervous, numb, resentful, sad, self-conscious,
                            sleepy, stressed, tired, winded, worried
                          </li>
                        </details>
                        <li>
                          What thoughts are contributing to the way you're
                          feeling?
                        </li>
                        <details onToggle={this.onToggleShowMoreQuestions}>
                          <summary>
                            {!this.state.showMoreQuestions && [
                              <a>Show more questions</a>,
                            ]}
                            {this.state.showMoreQuestions && [
                              <a>Show fewer questions</a>,
                            ]}
                          </summary>
                        </details>
                        {this.state.showMoreQuestions && [
                          <div>
                            <li>
                              What do you hope your life will look like in a
                              week? a month? a year?
                            </li>
                            <li>
                              What can you do today to make your life the way
                              you want it?
                            </li>
                            <li>
                              How will you feel when you've realized the goals
                              that you have for yourself?
                            </li>
                            <li>
                              Who or what do you feel grateful for and why?
                            </li>
                            <li>What did you enjoy about today?</li>
                          </div>,
                        ]}
                      </ul>
                      <details onToggle={this.onToggleShowFeedback}>
                        <summary>
                          <a>Give feedback</a>
                        </summary>
                        {this.state.showFeedback && [
                          <div>
                            Feel free to{' '}
                            <a
                              href="https://appendeditor.com/contact"
                              target="_blank"
                              rel="noopener"
                            >
                              reach out
                            </a>{' '}
                            if you have any questions, comments, concerns, or
                            feedback. 👋
                            <br></br>
                            <br></br>
                          </div>,
                        ]}
                      </details>
                      Click&nbsp;
                      <svg
                        role="button"
                        aria-label="toggle show help"
                        onClick={this.onToggleShowHelp}
                        title="Help"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.16675 15.0001H10.8334V13.3334H9.16675V15.0001ZM10.0001 1.66675C8.90573 1.66675 7.8221 1.8823 6.81105 2.30109C5.80001 2.71987 4.88135 3.3337 4.10753 4.10753C2.54472 5.67033 1.66675 7.78995 1.66675 10.0001C1.66675 12.2102 2.54472 14.3298 4.10753 15.8926C4.88135 16.6665 5.80001 17.2803 6.81105 17.6991C7.8221 18.1179 8.90573 18.3334 10.0001 18.3334C12.2102 18.3334 14.3298 17.4554 15.8926 15.8926C17.4554 14.3298 18.3334 12.2102 18.3334 10.0001C18.3334 8.90573 18.1179 7.8221 17.6991 6.81105C17.2803 5.80001 16.6665 4.88135 15.8926 4.10753C15.1188 3.3337 14.2002 2.71987 13.1891 2.30109C12.1781 1.8823 11.0944 1.66675 10.0001 1.66675ZM10.0001 16.6668C6.32508 16.6668 3.33342 13.6751 3.33342 10.0001C3.33342 6.32508 6.32508 3.33342 10.0001 3.33342C13.6751 3.33342 16.6668 6.32508 16.6668 10.0001C16.6668 13.6751 13.6751 16.6668 10.0001 16.6668ZM10.0001 5.00008C9.11603 5.00008 8.26818 5.35127 7.64306 5.97639C7.01794 6.60151 6.66675 7.44936 6.66675 8.33342H8.33342C8.33342 7.89139 8.50901 7.46747 8.82157 7.1549C9.13413 6.84234 9.55806 6.66675 10.0001 6.66675C10.4421 6.66675 10.866 6.84234 11.1786 7.1549C11.4912 7.46747 11.6667 7.89139 11.6667 8.33342C11.6667 10.0001 9.16675 9.79175 9.16675 12.5001H10.8334C10.8334 10.6251 13.3334 10.4167 13.3334 8.33342C13.3334 7.44936 12.9822 6.60151 12.3571 5.97639C11.732 5.35127 10.8841 5.00008 10.0001 5.00008Z"
                          fill={
                            this.state.showHelp
                              ? 'var(--sn-stylekit-info-color)'
                              : 'var(--sn-stylekit-foreground-color)'
                          }
                        />
                      </svg>
                      &nbsp;in the top menu to close this section.
                      <hr></hr>
                    </div>,
                  ]}
                  <div
                    id="renderedNote"
                    className="note-content"
                    style={{ fontFamily: this.props.fontView }}
                  >
                    {processor.processSync(text).result}
                  </div>
                </div>
              </div>
              <div className="note-options"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
