import React, { useState } from "react";
import { Layout, Space, Table, Button } from "antd";

function ContactList({ history }) {
  const data = [
    {
      key: 20,
      name: `adward King `,
      age: 2,
      address: `London, Park Lane no.`,
    },
    {
      key: 10,
      name: `edward King `,
      age: 3,
      address: `London, Park Lane no.`,
    },
    {
      key: 20,
      name: `zdward King `,
      age: 5,
      address: `London, Park Lane no.`,
    },
  ];
  const [sortedInfo, setSortedInfo] = useState({});

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    setSortedInfo(sorter);
  };
  return (
    <Layout style={{ justifyContent: "space-between" }}>
      <div>Contacts</div>
      <Button style={{ width: "20%", marginTop: "16px" }} type="primary">
        Add Contact
      </Button>
      <Table columns={columns} dataSource={data} onChange={onChange} />;
    </Layout>
  );
}

ContactList.propTypes = {};

export default ContactList;
