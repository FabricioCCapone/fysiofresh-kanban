<template>
  <v-container class="mt-2">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-sheet elevation="2" rounded class="pa-4" color="white">
          <v-form fast-fail @submit.prevent="addCard">
            <v-row align="end">
              <v-col cols="12" sm="4">
                <v-text-field v-model="newTitle" label="Title" dense maxlength="50" counter required/>
              </v-col>
              <v-col cols="12" sm="8">
                <v-text-field v-model="newDescription" label="Description" dense maxlength="150" counter required/>
              </v-col>
              <v-col cols="12">
                <v-btn :disabled="isAddingInvalid(newTitle, newDescription)" type="submit" color="primary" block class="mt-2">
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

const emit = defineEmits(['add-card'])

function isAddingInvalid(title , description) {
  const t = title.trim()
  const d = description.trim()

  if (!t || t.length < 3) return true
  if (!d || d.length < 3) return true

  return false
}

const addCard = () => {
  emit('add-card', {
    id: Date.now(),
    title: newTitle.value,
    description: newDescription.value
  });

  newTitle.value = '';
  newDescription.value = '';
}
</script>

<style>
.form {
  display: flex;
  align-items: center;
}
</style>