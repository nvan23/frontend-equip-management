import React, { useState, useEffect } from 'react'

import {
  List,
  Button,
  message,
  Typography,
  Collapse,
  Input,
  Row,
  Col,
  Card,
} from 'antd';

import {
  CheckCircleTwoTone,
  CheckCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import storage from '../../utils/localStorage'
import fakeData from '../../utils/fakeData'

const { Text, Paragraph, Title } = Typography
const { Panel } = Collapse
const { TextArea } = Input

const TodoList = () => {

  const [todoTitle, setTodoTitle] = useState('')
  const [todoDesc, setTodoDesc] = useState('')
  const [list, setList] = useState(storage.get().reverse())

  useEffect(() => {
    if (list.length === 0) {
      storage.set(fakeData)
      setList(fakeData.reverse())
    }
  }, [list])

  const handleRemove = (index) => {
    try {
      let todos = storage.get().reverse()

      todos.splice(index, 1)

      storage.set(todos.reverse())
      setList(todos.reverse())
      message.success('Todo item removed successfully.')
    } catch {
      message.error('Fail to remove todo item.')
    }
  }

  const handleToggleComplete = (index) => {
    let todos = storage.get().reverse()

    todos[index].completed = !todos[index].completed
    storage.set(todos.reverse())
    setList(todos.reverse())

    return true
  }

  const onChangeTitleInput = (e) => {
    setTodoTitle(e.target.value)
  }

  const onChangeDescInput = (e) => {
    setTodoDesc(e.target.value)
  }

  const handleAddTodo = (title, desc) => {
    try {
      let todos = storage.get()
      let id = todos.length

      !desc.trim() ? desc = 'No description.' : desc.trim()

      todos.push({
        id,
        title: title,
        description: desc,
        completed: false,
      })

      storage.set(todos)
      setList(todos.reverse())

      setTodoTitle('')
      setTodoDesc('')

      message.success('Adding todo item successfully.')
    } catch {
      message.error('Fail to add todo item.')
    }
  }

  return (

    <Row wrap={true} justify='space-between' gutter={[16, 16]} style={{ flexDirection: 'row-reverse' }}>

      {/* Adding todo item */}
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <Card>

          <Collapse ghost>
            <Panel
              showArrow={false}
              header={
                <Row wrap={false}>
                  <Col flex="auto">
                    <div style={{ padding: '0 16px 0 6px' }}>
                      <Input
                        placeholder="Add a Todo"
                        allowClear
                        value={todoTitle}
                        onChange={onChangeTitleInput}
                      />
                    </div>
                  </Col>
                  <Col flex="none">
                    <Button
                      type="primary"
                      disabled={!todoTitle.trim()}
                      onClick={() => handleAddTodo(todoTitle, todoDesc)}
                    > Add </Button>
                  </Col>
                </Row>
              }
            >
              <TextArea
                allowClear
                placeholder="Add a description for Todo"
                autoSize={{ minRows: 2, maxRows: 6 }}
                value={todoDesc}
                onChange={onChangeDescInput}
              />
            </Panel>
          </Collapse>

        </Card>
      </Col>

      {/* Todo List */}
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <Card>

          <List
            itemLayout="horizontal"
            pagination={list.length > 0 && {
              total: list.length,
              showQuickJumper: true,
              showSizeChanger: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              defaultPageSize: 5,
              defaultCurrent: 1,
              pageSizeOptions: [5, 10, 20, 50, 100],
            }
            }
            dataSource={list}
            // header={addTodoContainer}
            header={<Title level={5}>Todo List</Title>}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <Button
                    block
                    type='text'
                    icon={
                      item.completed
                        ? <CheckCircleTwoTone twoToneColor="#52c41a" />
                        : <CheckCircleOutlined />
                    }
                    onClick={() => handleToggleComplete(index)}
                  />,
                  <Button
                    type="text"
                    icon={<DeleteOutlined style={{ fontSize: 15, color: '#ff4d4f' }} />}
                    onClick={() => handleRemove(index)}
                  />
                ]}
              >
                <List.Item.Meta
                  title={<Text strong={!item.completed} delete={item.completed}>{item.title}</Text>}
                  description={<Paragraph disabled={item.completed}>{item.description}</Paragraph>}
                />
              </List.Item>
            )}
          />

        </Card>
      </Col>

    </Row>

  )
}

export default TodoList