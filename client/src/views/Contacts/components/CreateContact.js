import React, { useState } from "react";
import { Form, Input, Button, Typography, Layout } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { createContact } from "../../../service/contactService";

function CreateContact({ history }) {
  const { Title } = Typography;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const submit = (e) => {
    e.preventDefault();
    createContact(name, email).then((res) => {
      console.log(res);
      if (res.status === 201) {
        history.push("/contacts");
      }
    });
  };
  return (
    <Form
      name="normal_login"
      className="container-form"
      initialValues={{ rememberMe: true }}
      style={{ padding: "6%" }}
    >
      <Title level={3}>Create Contact</Title>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "email",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="nombre"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          type="nombre"
          placeholder="nombre"
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit" onClick={(e) => submit(e)}>
        Create Contact
      </Button>
      <Button
        type="danger"
        onClick={() => history.push("/contacts")}
        style={{ marginLeft: "5%" }}
      >
        Back
      </Button>
    </Form>
  );
}

export default CreateContact;
