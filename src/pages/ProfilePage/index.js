import React from 'react'
import { Result, Button, Image, Avatar } from 'antd'

const ProfilePage = ({ user }) => {

  let name = user.name || 'Successfully Purchased Cloud Server ECS!'

  const AvatarProfile = (
    <Avatar
      size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
      src={<Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
    />
  )

  return (
    <Result
      icon={AvatarProfile}
      title={name}
      extra={[
        <Button type="primary" key="console">
          Go Console
        </Button>,
        <Button key="buy">Buy Again</Button>,
      ]}
    />
  )
}

export default ProfilePage