import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export type PropsEditTask = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskSameTitle = tasks.find(task => task.title === newTaskTitle);

    if(taskSameTitle) {
      return Alert.alert('já existe essa Task')
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
      setTasks(oldTask => [...oldTask, newTask]);   
  }

  function handleToggleTaskDone(id: number) {
    const updateTask = tasks.map(task => ({ ...task}))
    const founditem = updateTask.find(task => task.id === id);
    if(!founditem) {return}
    founditem.done = !founditem.done;
    setTasks(updateTask)
  }

  function handleRemoveTask(id: number) {
    Alert.alert('remover item', 'tem certeza que queer remover item', [
      { 
        style:'cancel', 
        text: 'não'
      },
      {
        style:'destructive',
        text:'sim',
        onPress: () => {
          const updateTask = tasks.filter(item => item.id !== id)
          setTasks(updateTask)
        }
      }
    ])
  }

  function handleEditTask({taskId, taskNewTitle}:PropsEditTask){
    const updateTask = tasks.map(task => ({ ...task}))
    const taskEdit = updateTask.find(task => task.id === taskId);
    if(!taskEdit) {return}
    taskEdit.title = taskNewTitle
    setTasks(updateTask)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})