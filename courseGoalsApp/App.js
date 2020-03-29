import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput'

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (goal) => {
    // this makes sure that always have the latest state snapshot
    setCourseGoals( currentGoals => [...currentGoals, { key: Math.random().toString(), value: goal }]);
    setIsAddMode(false);
  };

  const removeGoalHandler = (goalId) => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => {
        goal.id !== goalId;
      })
    });
  };

  const cancelGoalHandler = () => {
    setIsAddMode(false);
  }

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} visible={!isAddMode} style={styles.goalAdd}/>
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalHandler}/>
      <FlatList 
        data={courseGoals} 
        renderItem={itemData => (<GoalItem id={itemData.item.id} title={itemData.item.value} 
        onDelete={removeGoalHandler}/>)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalAdd: {
    margin: 5,
    padding: 5,
  }
});
