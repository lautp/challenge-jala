import React, { useCallback, useState } from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { FormattedMessage, useIntl } from "react-intl";
import {preRegisterUser} from "../../../../../service/userService";

function RegistrationForm({ nextAction }) {
  const intl = useIntl();
  const onFinish = useCallback(async (values) => {}, [nextAction]);
  const [email, setEmail] = useState("");
  const submit = (e) =>{
    e.preventDefault();
    const data = {
      email: email,
    }
    preRegisterUser(data).then(res => {
        if(res.status === 201){
          alert('Email Sent')
        }
    })
  }
  return (
    <Form name="signup_form" className="container-form" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[
          {
            type: "email",
            message: intl.formatMessage({
              id: "registration.form.email.invalid-message",
            }),
          },
          {
            required: true,
            message: intl.formatMessage({
              id: "registration.form.email.required-message",
            }),
          },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder={intl.formatMessage({
            id: "registration.form.email.placeholder",
          })}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button style={{ width: "100%" }} type="primary" htmlType="submit" onClick={(e) => submit(e)}>
          <FormattedMessage id="registration.form.button.label" />
        </Button>
      </Form.Item>
    </Form>
  );
}

export default RegistrationForm;
