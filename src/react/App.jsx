import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import { Link, Switch, Route } from 'react-router-dom';

import store from 'redux/store';
import classNames from './app.module.scss';
import SiderTrigger from './SiderTrigger';
import Home from './views/Home';
import History from './views/History';
import Galery from './views/Galery';
import Register from './views/Register';
import Contact from './views/Contact';

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
              <Menu.Item key="1"><Link to="/">Accueil</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/historique">Historique</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/galerie">Galerie</Link></Menu.Item>
              <Menu.Item key="4"><Link to="/inscription">Inscription</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/contact">Contact</Link></Menu.Item>
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
                <Menu.Item key="1"><Link to="/"><Icon type="home" /><span>Accueil</span></Link></Menu.Item>
                <Menu.Item key="2"><Link to="/historique"><Icon type="info-circle" /><span>Historique</span></Link></Menu.Item>
                <Menu.Item key="3"><Link to="/galerie"><Icon type="camera" /><span>Galerie</span></Link></Menu.Item>
                <Menu.Item key="4"><Link to="/inscription"><Icon type="user" /><span>Inscription</span></Link></Menu.Item>
                <Menu.Item key="5"><Link to="/contact"><Icon type="mail" /><span>Contact</span></Link></Menu.Item>
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
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/historique" component={History} />
                  <Route path="/galerie" component={Galery} />
                  <Route path="/inscription" component={Register} />
                  <Route path="/contact" component={Contact} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </ReduxProvider>
    );
  }
}
