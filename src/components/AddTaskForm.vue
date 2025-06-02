<template>
  <v-container class="mt-2">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-sheet elevation="2" rounded class="pa-4" color="white">
          <v-form fast-fail @submit.prevent="addCard">
            <v-row align="end">
              <v-col cols="12" sm="4">
                <v-text-field v-model="newTitle" :rules="titleRules" label="Title" dense />
              </v-col>
              <v-col cols="12" sm="8">
                <v-text-field v-model="newDescription" :rules="descriptionRules" label="Description" dense />
              </v-col>
              <v-col cols="12" >
                <v-btn type="submit" color="primary" block class="mt-2">
                  Add Task
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup>
import { ref } from 'vue'

const newTitle = ref('')
const newDescription = ref('')

// Rules to prevent that the input is too long
const titleRules = [
  v => v.length <= 50 || 'Task title must be under 50 characters'
]
// Rules to prevent that the input is too long
const descriptionRules = [
  v => v.length <= 200 || 'Description must be under 200 characters'
]

//Verifies that newTask and newDescription are not empty. If that is the case,
// generates an unique Id, and asigns the title and description.
// Then it pushes an object (Card) to Board[0] (Backlog).

const emit = defineEmits(['add-card'])

const addCard = () => {
  if (newTitle.value.trim() && newDescription.value.trim()) {
    emit('add-card', {
      id: Date.now(),
      title: newTitle.value,
      description: newDescription.value
    })
    newTitle.value = ''
    newDescription.value = ''
  }
}
</script>

<style>
.form {
  display: flex;
  align-items: center;
}
</style>