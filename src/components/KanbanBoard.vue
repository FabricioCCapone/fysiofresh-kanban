<template>

    <v-container>
    <v-sheet class="mx-auto" width="300">
      <!-- Used the v-form with fast-fail rule to avoid invalid input -->
       <!-- I send the input to addTask(task, description) to generate a new card  -->
      <v-form fast-fail @submit.prevent="addTask">
        <v-text-field v-model="newTask" :rules="taskRules" label="Task" ></v-text-field>
        <v-text-field v-model="newDescription" :rules="descriptionRules" label="Description"></v-text-field>
        <v-btn class="mt-2" type="submit" block>Add Task</v-btn>
      </v-form>
    </v-sheet>
  </v-container>

  <v-container>
    <v-row>
      <v-col v-for="(column, index) in board" :key="index" cols="3" class="column with-border">
        <h2 class="text-center">{{ column.name }}</h2>
        <v-card v-for="card in column.cards" :key="card.id" class="mb-3" :color="column.color">
          <v-card-title>{{ card.title }}</v-card-title>
          <v-card-text>{{ card.description }}</v-card-text>
          <!-- <v-btn density="compact" @click.prevent="editCard" block>Edit</v-btn> -->
          <v-btn density="compact" @click.prevent="deleteTask(card.id)" block>Delete</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'


const newTask = ref('')
const newDescription = ref('')

const board = ref([
  {
    name: 'Backlog',
    color: '#FFF9C4',
    cards: [
      { id: 1, title: 'Task A', description: 'Initial idea' },
      { id: 2, title: 'Task B', description: 'Define requirements' }
    ]
  },
  {
    name: 'In Progress',
    color: '#BBDEFB',
    cards: [
      { id: 3, title: 'Task C', description: 'Building feature' }
    ]
  },
  {
    name: 'Testing',
    color: '#C8E6C9',
    cards: []
  },
  {
    name: 'Done',
    color: '#FFE0B2',
    cards: []
  }
]
)

// Rules to prevent empty task title or that the input is too long
const taskRules = [
  v => !!v || 'Task title is required',
  v => v.length <= 50 || 'Task title must be under 50 characters'
]
// Rules to prevent empty description title or that the input is too long
const descriptionRules = [
  v => !!v || 'Description is required',
  v => v.length <= 200 || 'Description must be under 200 characters'
]

//Verifies that newTask and newDescription are not empty. If that is the case, pushes an object (Card) to Board[0] (Backlog)
// and generates an unique Id, and asigns the title and description.
const addTask = () => {
  if (newTask.value.trim() && newDescription.value.trim()) {
      board.value[0].cards.push({
      id: Date.now(),
      title: newTask.value,
      description: newDescription.value
    })
    newTask.value = ''
    newDescription.value = ''
  }
}

//Receive the taskId and use a for to go trough each of the boards columns to find 
// the id.
const deleteTask = (taskId) => {
  for (const column of board.value) {
    const index = column.cards.findIndex(card => card.id === taskId)
    if (index !== -1) {
      column.cards.splice(index, 1)
      break 
    }
  }
}

</script>

<style scoped>
.column {
  min-height: 500px;
  padding: 16px;
}

.with-border {
  border: 1px solid #ccc;
}
</style>
