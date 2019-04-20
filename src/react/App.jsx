import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import {
  Layout, Menu, Icon,
} from 'antd';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import store from 'redux/store';
import classNames from './app.module.scss';
import SiderTrigger from './components/sider/SiderTrigger';
import {
  Home, Galery, Register, Contact, ModesDeChasse,
} from './views';

const { Header, Content, Sider } = Layout;

class App extends React.PureComponent {
  static propTypes = {
    history: PropTypes.shape().isRequired,
    location: PropTypes.shape().isRequired,
  };

  /**
   * Fill state with the match route.
   *
   * @param {Object} props - App props from react router.
   */
  constructor(props) {
    super(props);
    const { pathname } = props.location;
    const route = pathname.substr(1);
    this.state = {
      route: route === '' ? 'home' : route,
      collapsed: false,
    };
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  navigate = (item, key) => {
    const { history } = this.props;
    this.setState({ route: key });
    switch (key) {
      case 'home':
        history.push('/');
        break;
      default:
        history.push(`/${key}`);
        break;
    }
  };

  /** Render app. */
  render() {
    const { responsive } = store.getState();
    return (
      <ReduxProvider store={store}>
        <Layout>
          <Header
            style={{
              position: 'fixed',
              zIndex: 1,
              width: '100%',
              height: 103,
              borderBottom: '1px solid #e8e8e8',
            }}
            className={classNames.menuWrapper}
          >
            <div className={classNames.logo} />
            <Menu
              className={classNames.menu}
              theme="light"
              mode="horizontal"
              onClick={({ item, key }) => this.navigate(item, key)}
              defaultSelectedKeys={['home']}
              selectedKeys={[this.state.route]}
            >
              <Menu.Item key="home">Accueil</Menu.Item>
              <Menu.Item key="modesDeChasse">Modes de Chasse</Menu.Item>
              <Menu.Item key="galerie">Galerie</Menu.Item>
              <Menu.Item key="inscription">Inscription</Menu.Item>
              <Menu.Item key="contact">Contact</Menu.Item>
            </Menu>
          </Header>
          <Layout style={{ paddingTop: 102, height: '100%' }}>
            <Sider
              width="15%"
              style={{ background: '#fff' }}
              collapsible={responsive.greaterThan.medium}
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
              trigger={<SiderTrigger collapsed={this.state.collapsed} />}
              breakpoint="lg"
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={['home']}
                selectedKeys={[this.state.route]}
                style={{ height: '100%', borderRight: 0 }}
                onClick={({ item, key }) => this.navigate(item, key)}
              >
                <Menu.Item key="home"><Icon type="home" /><span>Accueil</span></Menu.Item>
                <Menu.Item key="modesDeChasse"><Icon type="info-circle" /><span>Modes de Chasse</span></Menu.Item>
                <Menu.Item key="galerie"><Icon type="camera" /><span>Galerie</span></Menu.Item>
                <Menu.Item key="inscription"><Icon type="user" /><span>Inscription</span></Menu.Item>
                <Menu.Item key="contact"><Icon type="mail" /><span>Contact</span></Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Content style={{
                background: '#fff', marginLeft: 1, padding: 24, minHeight: 160, overflow: 'auto',
              }}
              >
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/modesDeChasse" component={ModesDeChasse} />
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

export default withRouter(App);
