import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FacebookProvider, EmbeddedPost } from 'react-facebook';
import { connect } from 'react-redux';

import store from 'redux/store';
import { facebookActions } from 'redux/facebook';

class News extends PureComponent {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape),
  };

  static defaultProps = {
    posts: [],
  };

  /** Load facebook posts when loading the page. */
  componentDidMount() {
    store.dispatch(facebookActions.listFacebookPosts());
  }

  /** News page. */
  render() {
    return (
      <FacebookProvider appId="340385329913551">
        {
          this.props.posts.map(post => (
            <div key={post._id}><EmbeddedPost href={post.url} width="350" /><br /></div>
          ))
        }
      </FacebookProvider>
    );
  }
}

const mapStateToProps = ({ facebook }) => ({
  posts: facebook.posts,
});

export default connect(
  mapStateToProps,
)(News);
