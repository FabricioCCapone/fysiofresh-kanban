<template>
    <v-container>
        <v-sheet class="mx-auto" width="300">
            <!-- I send the input to addTitle(title, description) to generate a new card  -->
            <v-form fast-fail @submit.prevent="addCard">
                <v-text-field v-model="newTitle" :rules="titleRules" label="Title"></v-text-field>
                <v-text-field v-model="newDescription" :rules="descriptionRules" label="Description"></v-text-field>
                <v-btn class="mt-2" type="submit" block>Add Task</v-btn>
            </v-form>
        </v-sheet>
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

//Verifies that newTask and newDescription are not empty. If that is the case, pushes an object (Card) to Board[0] (Backlog)
// and generates an unique Id, and asigns the title and description.

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