<script setup>
</script>

<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="3" class="column with-border"><h2 class="title-kanban">Backlog</h2></v-col>
        <v-col cols="3" class="column with-border"><h2 class="title-kanban">In Progress</h2></v-col>
        <v-col cols="3" class="column with-border"><h2 class="title-kanban">Testing</h2></v-col>
        <v-col cols="3" class="column with-border"><h2 class="title-kanban">Done</h2></v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.title-kanban {
  text-align: center;
}

.column {
  min-height: 1500px; 
  padding: 16px;
}

.with-border {
  border: 1px solid #ccc;
}
</style>