<template>
<v-container class="mt-4">
  <v-row>
    <v-col
      v-for="(column, colIndex) in board"
      :key="colIndex"
      cols="3"
      class="column with-border"
    >
      <h2 class="text-center">{{ column.name }}</h2>

      <v-card
        v-for="(card, cardIndex) in column.cards"
        :key="card.id"
        class="mb-3"
        :color="column.color"
      >
        <!-- If the task is being edited, this will be displayed -->
        <template v-if="editingTaskId === card.id">
          <v-text-field v-model="card.title" :rules="titleRules" label="Title" dense />
          <v-textarea v-model="card.description" :rules="descriptionRules" label="Description" dense />
          <v-btn @click="editingTaskId = null">Done</v-btn>
        </template>

        <!-- Default display -->
        <template v-else>
          <v-card-title>{{ card.title }}</v-card-title>
          <v-card-text>{{ card.description }}</v-card-text>
          <v-btn @click="editingTaskId = card.id">Edit</v-btn>
          <v-btn @click="deleteTask(card.id)">Delete</v-btn>
        </template>
      </v-card>
    </v-col>
  </v-row>
</v-container>

  <v-container>
    <v-sheet class="mx-auto" width="300">
      <!-- I send the input to addTitle(title, description) to generate a new card  -->
      <v-form fast-fail @submit.prevent="addTask" >
        <v-text-field v-model="newTitle" :rules="titleRules" label="Title"></v-text-field>
        <v-text-field v-model="newDescription" :rules="descriptionRules" label="Description"></v-text-field>
        <v-btn class="mt-2" type="submit" block>Add Task</v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'

const newTitle = ref('')
const newDescription = ref('')

const editingTaskId = ref(null)

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

// Rules to prevent that the input is too long
const titleRules = [
  v => v.length <= 50 || 'Task title must be under 50 characters'
]
// Rules to prevent that the input is too long
const descriptionRules = [
  v => v.length <= 200 || 'Description must be under 200 characters'
]

//Verifies that newTask and newDescription are not empty. If that is the case, pushes an object (Card) to Board[0] (Backlog)
// and generates an unique Id, and asigns the title and description.
const addTask = () => {
  if (newTitle.value.trim() && newDescription.value.trim()) {
    board.value[0].cards.push({
      id: Date.now(),
      title: newTitle.value,
      description: newDescription.value
    })
    newTitle.value = ''
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
