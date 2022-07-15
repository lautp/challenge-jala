import React, { useCallback } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { LockOutlined, UserAddOutlined } from "@ant-design/icons";
import { FormattedMessage, useIntl } from "react-intl";

function AccountForm({ gotoHomePage }) {
  const intl = useIntl();

  const onFinish = useCallback(async (values) => {}, [gotoHomePage]);

  return (
    <Form
      name="account_form"
      className="container-form"
      initialValues={{ sendMeEmails: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your name!",
            whitespace: true,
          },
        ]}
      >
        <Input prefix={<UserAddOutlined />} placeholder="User Name" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "account-settings.form.password.required-message",
            }),
          },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder={intl.formatMessage({
            id: "account-settings.form.password.placehorder",
          })}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="sendMeEmails" valuePropName="checked" noStyle>
          <Checkbox style={{ color: "#989eb5" }}>
            <FormattedMessage
              id="account-settings.form.check.label"
              values={{ companyName: <b>Jala</b> }}
            />
          </Checkbox>
        </Form.Item>
      </Form.Item>
      <Form.Item>
        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
          <FormattedMessage id="account-settings.form.button.label" />
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AccountForm;
