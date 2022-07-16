import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Typography, Table, Button ,Input} from "antd";
import { getContacts } from "../../../service/contactService";

function ContactList({ history }) {
  const [data, setData] = useState([]);
  
  const[dataSource,setDataSource] = useState([]);
  const [value, setValue] = useState('');
  const getData = async () => {
    const res = await getContacts();
    if (res.status === 200) {
      //add to object key
      res.data.map((item, index) => {
        item.key = index;
      });
      setData(res.data);
      setDataSource(res.data);
    }
  };

  const [sortedInfo, setSortedInfo] = useState({});

  const FilterByNameInput = (
    <Input
      placeholder="Search Name"
      value={value}
      onChange={e => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredData = data.filter(entry =>
          entry.name.includes(currValue)
        );
        setDataSource(filteredData);
      }}
    />
  );
  const columns = [
    {
      title: "id",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key,
      sortOrder: sortedInfo.columnKey === "key" && sortedInfo.order,
    },
    {
      title: FilterByNameInput,
      dataIndex: "name",
      key: "name",
      sorter: (a,b ) => a.email.localeCompare(b.email),
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    setSortedInfo(sorter);
  };



  const { Title } = Typography;

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Row style={{ marginBottom: "1%" }}>
        <Col span={12}>
          {" "}
          <Title level={3}>All contacts</Title>
        </Col>
        <Col span={12}>
          <Link to="/contacts/new">
            <Button style={{ float: "right" }} type="primary">
              Add Contact
            </Button>
          </Link>
        </Col>
      </Row>
      <Table columns={columns} dataSource={dataSource} onChange={onChange} />;
    </>
  );
}

ContactList.propTypes = {};

export default ContactList;
