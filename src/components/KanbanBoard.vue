<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(column, index) in board"
        :key="index"
        cols="3"
        class="column with-border"
      >
        <h2 class="text-center">{{ column.name }}</h2>
        <v-card
          v-for="card in column.cards"
          :key="card.id"
          class="mb-3"
          :color="column.color"
        >
          <v-card-title>{{ card.title }}</v-card-title>
          <v-card-text>{{ card.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

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
])
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
