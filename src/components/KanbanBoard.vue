<template class="wrapper">
  <AppHeader />
  <v-container class="mt-4">
    <v-row>
      <v-col v-for="(column, colIndex) in board" :key="colIndex" cols="12" sm="6" md="3" class="column with-border">
        <h2 class="text-center mb-5">{{ column.name }}</h2>
        <draggable v-model="column.cards" :group="'tasks'" item-key="id" class="draggable-list">
          <template #item="{ element: card }">
            <v-card :key="card.id" class="mb-3" :color="column.color">
              <template v-if="editingTaskId === card.id">
                <v-text-field v-model="card.title" :rules="titleRules" label="Title" dense maxlength="50"/>
                <v-textarea v-model="card.description" :rules="descriptionRules" label="Description" dense maxlength="150"/>
                <v-btn :disabled="isEditInvalid(card)" @click="editingTaskId = null">Done</v-btn>
              </template>
              <template v-else>
                <v-card-title>{{ card.title }}</v-card-title>
                <v-card-text>{{ card.description }}</v-card-text>
                <div class="ms-12">
                  <v-btn @click="editingTaskId = card.id" color="primary">Edit</v-btn>
                  <v-btn @click="deleteTask(card.id)" color="primary">Delete</v-btn>
                </div>
              </template>
            </v-card>
          </template>
        </draggable>
      </v-col>
    </v-row>
  </v-container>
  <AddTaskForm @add-card="addCard" />
</template>

<script setup>
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import AddTaskForm from './AddTaskForm.vue'
import AppHeader from './AppHeader.vue'

const defaultBoard = [
  {
    name: 'Backlog',
    color: '#FFF9C4',
    cards: []
  },
  {
    name: 'In Progress',
    color: '#BBDEFB',
    cards: []
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

const savedBoard = localStorage.getItem('board')
const board = ref(savedBoard ? JSON.parse(savedBoard) : defaultBoard)

watch(
  board,
  (newVal) => {
    localStorage.setItem('board', JSON.stringify(newVal))
  },
  { deep: true }
)

const editingTaskId = ref(null)

const deleteTask = (taskId) => {
  for (const column of board.value) {
    const index = column.cards.findIndex(card => card.id === taskId)
    if (index !== -1) {
      column.cards.splice(index, 1)
      break
    }
  }
}

const addCard = (card) => {
  board.value[0].cards.push(card)
}

const titleRules = [
  v => !!v.trim() || 'Title is required',
  v => v.length >= 3 || 'Title must be at least 3 characters'
]

const descriptionRules = [
  v => !!v.trim() || 'Description is required',
  v => v.length >= 3 || 'Description must be at least 3 characters'
]

function isEditInvalid(card) {
  const t = card.title.trim()
  const d = card.description.trim()

  if (!t || t.length < 3) return true
  if (!d || d.length < 3) return true

  return false
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

.draggable-list {
  min-height: 300px;
}

.buttons{
  justify-content: space-between;
}
</style>
