<template>
  <div class="custom-select">
    <input
      v-model="searchText"
      type="text"
      placeholder="Выберите пользователя..."
      :class="{ open: isOpen }"
      @blur="closeOptions"
    />
    <ul v-show="isOpen" :class="{ open: isOpen }">
      <li
        v-for="option in options"
        :key="option.id"
        :value="option.login"
        @click="selectOption(option.login)"
      >
        <span
          :style="{
            'font-weight': option.login === searchText ? 'bold' : 'medium',
          }"
          >@{{ option.login }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { fetchUsers } from "@/api/rest/users";
import { ref } from "vue";
import { watchDebounced } from "@vueuse/core";

interface User {
  id: number;
  login: string;
}
const searchText = ref("");
const isOpen = ref(false);
const isLoading = ref(false);
const isSelected = ref(false);
const options = ref<User[]>([]);

watchDebounced(
  () => searchText.value,
  () => {
    if (!searchText.value && !isSelected.value) return;
    else {
      isLoading.value = true;
      fetchUsers(searchText.value).then(({ data }) => {
        isSelected.value = false;
        isLoading.value = false;
        isOpen.value = true;
        options.value = data.items;
      });
    }
  },
  {
    debounce: 500,
    maxWait: 1000,
  }
);
const selectOption = (option: string) => {
  isSelected.value = true;
  isOpen.value = false;
  searchText.value = option;
};
const closeOptions = () => {
  if (!isSelected.value) return;
  else isOpen.value = false;
};
</script>

<style scoped>
.custom-select {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
}

.custom-select::before {
  content: "@";
  position: absolute;
  top: 10px;
  left: 5px;
  pointer-events: none;
}

.custom-select input {
  width: 200px;
  padding: 10px;
  outline: none;
  outline-offset: 0;
  box-shadow: none;
  border-image-slice: 1;
  border-image-source: linear-gradient(92.04deg, #ffc802 0%, #a6e870 100%);
  border-radius: 10px;
  padding-left: 18px;
}

.custom-select ul {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  list-style-type: none;
  margin: 0;
  padding: 0;
  border-image-slice: 1;
  border-image-source: linear-gradient(92.04deg, #ffc802 0%, #a6e870 100%);
  border-top: none;
  border-radius: 0 0 4px 4px;
  background-color: #fff;
  transition: max-height 0.3s;
}

.custom-select ul.open {
  max-height: 500px;
  border-image-slice: 1;
  border-image-source: linear-gradient(92.04deg, #ffc802 0%, #a6e870 100%);
}

.custom-select li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.custom-select li:hover {
  background-color: rgba(255, 201, 4, 0.17);
}

.custom-select input.open,
.custom-select ul.open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-image-slice: 1;
  border-image-source: linear-gradient(92.04deg, #ffc802 0%, #a6e870 100%);
}
</style>
