import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Table, Switch, Col,Row } from "antd";

const HomeFn = ({ listDispatch, auth, event }) => {
    const [tableDataSource, setTableDataSource] = useState([]);
    const [taskCompleted, setTaskCompleted] = useState([]);
  
    useEffect(() => {
    
      console.log({componentRender : true})
      fetch("https://jsonplaceholder.typicode.com/todos?_start=0&_limit=10")
        .then((response) => response.json())
        .then((json) => setTableDataSource(json));
    }, []);
    
    const subTaskData = [
    {
      "mainTaskId": 1,
      "userId": 1,
      "id": 101,
      "title": "Sub task 1",
      "completed": false
    },
    {
      "mainTaskId": 1,
      "userId": 1,
      "id": 102,
      "title": "Sub task 2",
      "completed": true
    },
    {
      "mainTaskId": 3,
      "userId": 1,
      "id": 103,
      "title": "Sub task 1",
      "completed": true
    },
    {
      "mainTaskId": 4,
      "userId": 1,
      "id": 104,
      "title": "Sub task 1",
      "completed": false
    }
  ];
  
    const columns = [
      {
        title: "Completed",
        dataIndex: "completed",
        key: "completed",
        render: (text, record, index) => {
          return (
            <Switch
              disabled={taskCompleted.includes(index)}
              onChange={(e) => toggleTask(e, text, record, index)}
            />
          );
        },
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        render: (text, record, index) => {
          return taskCompleted.includes(index) ? (
            <del>{text}</del>
          ) : (
            <span>{text}</span>
          );
        },
      },
    ];
  
    const toggleTask = (e, text, record, index) => {
      setTaskCompleted(taskCompleted.concat(index));
    };
    return (
      <Row>
        <Col span={3}></Col>
        <Col span={18}>
          <h1 style={{textAlign:'center'}}>TODO LIST</h1>
          <Table
            dataSource={tableDataSource}
            columns={columns}
            pagination={false}
            rowKey={(record) => record.id}
          />
        </Col>
        <Col span={3}></Col>
      </Row>
    );
}



const mapStateToProps = (state) => {
    console.log({ ...state })
    return { auth: state.auth, event: state.event }
};
const listDispatch = (payload) => ({ type: 'LIST_EVENT', payload });

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators(
            {
                listDispatch
            },
            dispatch
        )
    };
}

/**
 * COUNTER COMPONENT EXPORT(Usually)
 */
const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeFn);
export default Home;