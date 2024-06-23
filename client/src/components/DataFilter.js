
import React, { useState } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Search from 'antd/es/transfer/search';

const DataFilter = ({ data }) => {
  const [dataSource, setDataSource] = useState(data);

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={Search `${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  });

  const columns = [
    {
      title: 'Column 1',
      dataIndex: 'column1',
      key: 'column1',
      ...getColumnSearchProps('column1'),
    },
    {
      title: 'Column 2',
      dataIndex: 'column2',
      key: 'column2',
      ...getColumnSearchProps('column2'),
    },
    // Add more columns as per your Excel structure
  ];
  <br/>

//   return <Table dataSource={dataSource} columns={columns} />;
};

export default DataFilter;