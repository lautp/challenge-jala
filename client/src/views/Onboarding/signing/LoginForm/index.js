import React, { useCallback, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import {loginUser} from '../../../../service/userService';

function LoginForm({ history, homePath }) {
  const intl = useIntl();
  
  const [mail,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [remember,setRemember] = useState(false);
  const submit =  (e) => {
    e.preventDefault();
    const data = {
      email: mail,
      password: password,
    };
    loginUser(data).then(res => {
      
    });
   
  }
  return (
    <Form
      name="normal_login"
      className="container-form"
      initialValues={{ rememberMe: true }}
      
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "authentication.form.email.required-message",
            }),
          },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder={intl.formatMessage({
            id: "authentication.form.email.placehorder",
          })}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "authentication.form.password.required-message",
            }),
          },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder={intl.formatMessage({
            id: "authentication.form.password.placehorder",
          })}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item name="rememberMe" valuePropName="checked">
        <Checkbox style={{ color: "#989eb5", width: "100%" }} onChange={(e) => setRemember(e.target.checked)}>
          <FormattedMessage id="authentication.form.check.label" />
          <Link style={{ float: "right" }} to="/forgotpassword">
            <FormattedMessage id="authentication.form.link.forgot-label" />
          </Link>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button style={{ width: "100%" }} type="primary" htmlType="submit" onClick={(e) => submit(e)}>
          <FormattedMessage id="authentication.form.button.label" />
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
