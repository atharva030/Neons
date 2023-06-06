import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import TaskContext from '../Context/taskContext'

const Context = () => {
    const con=useContext(TaskContext)
  return (
    <View>
      <Text>{con.name}</Text>
    </View>
  )
}

export default Context