import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

/**
 * Custom trigger button for sider.
 *
 * @returns {Object} Trigger - Icon for trigger.
 */
export default class SiderTrigger extends React.PureComponent {
  static propTypes = {
    collapsed: PropTypes.bool,
  };

  static defaultProps = {
    collapsed: false,
  };

  /** Custom trigger button for sider. */
  render() {
    if (this.props.collapsed) {
      return (
        <Icon style={{ fontSize: '20px', paddingTop: '10px' }} type="menu-unfold" />
      );
    }
    return (
      <Icon style={{ fontSize: '20px', paddingTop: '10px' }} type="menu-fold" />
    );
  }
}
