import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import classNames from './button.module.scss';

export default class Button extends PureComponent {
  static propTypes = {
    /** Root element className. */
    className: PropTypes.string,
    /** Button a11y type. */
    type: PropTypes.oneOf([
      'submit',
      'reset',
      'button',
    ]),
  };

  static defaultProps = {
    className: '',
    type: 'button',
  };

  /** Render. */
  render() {
    return (
      <button
        {...this.props}
        className={cn(this.props.className, classNames.button)}
      />
    );
  }
}
