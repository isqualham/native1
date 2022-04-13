import React, { useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View , StyleSheet, TextInput} from "react-native";
import Icon from 'react-native-vector-icons/Feather';


import trashIcon from '../assets/icons/trash/trash.png'
import { PropsEditTask } from "../pages/Home";
import { Task } from "./TasksList";


interface TaskItemProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({taskId, taskNewTitle}: PropsEditTask) => void;
  }

export function TaskItem({task,editTask,toggleTaskDone, removeTask}: TaskItemProps) {
    const [isEdit, setIsEdit] = useState(false);
    const [taskNewT, setTaskNewT] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEdit(){
        setIsEdit(true);
    }

    function handleCanceledEdit(){
        setTaskNewT(task.title)
        setIsEdit(false);
    }

    function handleSubmitEdit(){
        editTask({taskId: task.id, taskNewTitle: taskNewT});
        setIsEdit(false)
    }

    useEffect(()=>{
        if(textInputRef.current){
            if(isEdit){
                textInputRef.current.focus();
            }else{
                textInputRef.current.blur();
            }
        }
    },[isEdit])


    return(
    <View style={styles.container}>
        <View style={styles.infoContainer}>
        <TouchableOpacity
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={() => toggleTaskDone(task.id)}
        >
        <View 
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
        >
            { task.done && (
            <Icon 
                name="check"
                size={12}
                color="#FFF"
            />
            )}
        </View>
        
        <TextInput
            value={taskNewT}
            onChangeText={setTaskNewT}
            editable={isEdit}
            onSubmitEditing={handleSubmitEdit}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
         />
        </TouchableOpacity>
        </View>
    

        <View style={styles.iconsContainer}>
            {isEdit ? (
            <TouchableOpacity
            onPress={handleCanceledEdit}
            >
                <Icon name="X" size={24} color="#b2b2b2" />
            </TouchableOpacity>
            ) : (
                <TouchableOpacity
                onPress={handleStartEdit}
                >
                    <Icon name="a" size={24} color="#b2b2b2" />
                </TouchableOpacity>                 
            ) }

            <View style={styles.container} />

       

        <TouchableOpacity
            onPress={() => removeTask(task.id)}
            disabled={isEdit}
        >
            <Image 
                source={trashIcon}
                style={{opacity: isEdit ? 0.2 : 1 }}
             />
        </TouchableOpacity>

        </View>

    
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    infoContainer:{
        flex:1,
    },
    iconsContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 24,

    },
    iconDivider:{
        width:1,
        height:24,
        backgroundColor: 'rgba(196, 196,196, 0.24)',
        marginHorizontal: 12
    },
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    }
  })