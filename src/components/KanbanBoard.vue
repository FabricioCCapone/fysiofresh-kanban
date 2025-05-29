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

        
        <draggable
          v-model="column.cards"
          :group="'tasks'"
          item-key="id"
          class="draggable-list"
        >
          <template #item="{ element: card }">
            <v-card :key="card.id" class="mb-3" :color="column.color">
              <template v-if="editingTaskId === card.id">
                <v-text-field
                  v-model="card.title"
                  :rules="titleRules"
                  label="Title"
                  dense
                />
                <v-textarea
                  v-model="card.description"
                  :rules="descriptionRules"
                  label="Description"
                  dense
                />
                <v-btn @click="editingTaskId = null">Done</v-btn>
              </template>

              <template v-else>
                <v-card-title>{{ card.title }}</v-card-title>
                <v-card-text>{{ card.description }}</v-card-text>
                <v-btn @click="editingTaskId = card.id">Edit</v-btn>
                <v-btn @click="deleteTask(card.id)">Delete</v-btn>
              </template>
            </v-card>
          </template>
        </draggable>
      </v-col>
    </v-row>

    <!-- Form -->
    <AddTaskForm @add-card="addCard" />
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'
import AddTaskForm from './AddTaskForm.vue'

const board = ref([
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
])

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
  v => v.length <= 50 || 'Task title must be under 50 characters'
]

const descriptionRules = [
  v => v.length <= 200 || 'Description must be under 200 characters'
]
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
</style>

