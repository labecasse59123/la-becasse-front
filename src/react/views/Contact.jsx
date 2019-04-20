import React, { PureComponent } from 'react';
import {
  Form, Input, Button,
} from 'antd';
import PropTypes from 'prop-types';
import { ReCaptcha } from 'react-recaptcha-v3';

import store from 'redux/store';
import { contactActions } from 'redux/contact';
import env from 'config/env';

const { TextArea } = Input;

class ContactForm extends PureComponent {
  static propTypes = {
    form: PropTypes.shape().isRequired,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        store.dispatch(contactActions.submitContactMessage(values));
      }
    });
  };

  verifyCallback = (recaptchaToken) => {
    // Here you will get the final recaptchaToken!!!
    console.log(recaptchaToken, '<= your recaptcha token');
  };

  /** Render contact form. */
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const recaptcha = env.app.env === 'production' ?
      (
        <ReCaptcha
          sitekey="6LfjRZ8UAAAAAAdPC201P13DkomlulLZABtf7nIo"
          action="contact_submit"
          verifyCallback={this.verifyCallback}
        />
      ) : null;

    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label="E-mail"
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'Votre email n\'est pas valide !',
              }, {
                required: true, message: 'Merci de renseigner votre email.',
              }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Message"
          >
            {getFieldDecorator('message', {
              rules: [{
                required: true, message: 'Merci de renseigner votre message.',
              }],
            })(
              <TextArea rows={4} />,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Envoyer</Button>
          </Form.Item>
        </Form>
        {recaptcha}
      </>
    );
  }
}

export default Form.create({ name: 'contact' })(ContactForm);
