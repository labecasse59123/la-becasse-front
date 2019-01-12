import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';

import store from 'redux/store';
import classNames from './app.module.scss';
import SiderTrigger from './SiderTrigger';

const { Header, Content, Sider } = Layout;

/**
 * App root.
 *
 * @param {boolean} collapsed - State of the slider.
 */
export default class App extends React.PureComponent {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  /** Render app. */
  render() {
    return (
      <ReduxProvider store={store}>
        <Layout>
          <Header style={{
            position: 'fixed',
            zIndex: 1,
            width: '100%',
            height: 102,
          }}
          >
            <div className={classNames.logo} />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
            >
              <Menu.Item key="1">Accueil</Menu.Item>
              <Menu.Item key="2">Historique</Menu.Item>
              <Menu.Item key="3">Galerie</Menu.Item>
              <Menu.Item key="4">Inscription</Menu.Item>
              <Menu.Item key="5">Contact</Menu.Item>
            </Menu>
          </Header>
          <Layout style={{ paddingTop: 102, height: '100%' }}>
            <Sider
              width="20%"
              style={{ background: '#fff' }}
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
              trigger={<SiderTrigger collapsed={this.state.collapsed} />}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                <Menu.Item key="1"><Icon type="home" /><span>Accueil</span></Menu.Item>
                <Menu.Item key="2"><Icon type="info-circle" /><span>Historique</span></Menu.Item>
                <Menu.Item key="3"><Icon type="camera" /><span>Galerie</span></Menu.Item>
                <Menu.Item key="4"><Icon type="user" /><span>Inscription</span></Menu.Item>
                <Menu.Item key="5"><Icon type="mail" /><span>Contact</span></Menu.Item>
              </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Accueil</Breadcrumb.Item>
              </Breadcrumb>
              <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 160,
              }}
              >
                Content
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </ReduxProvider>
    );
  }
}
