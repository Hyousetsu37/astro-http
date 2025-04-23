<template>
  <div v-if="isLoading">Loading...</div>
  <button v-else-if="likeCount === 0" @click="likePost">Like Counter</button>
  <button v-else @click="likePost">
    Likes
    <span> {{ likeCount }} </span>
  </button>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import confetti from "canvas-confetti";
import debounce from "lodash.debounce";

interface Props {
  postId: string;
}
const props = defineProps<Props>();
const url = `/api/posts/likes/${props.postId}`;

const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(true);

watch(
  likeCount,
  debounce(() => {
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: likeClicks.value }),
    });
    console.log("sent");
    likeClicks.value = 0;
  }, 500)
);

const likePost = () => {
  likeCount.value++;
  likeClicks.value++;
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: Math.random(), y: Math.random() + 2 },
  });
};

const getCurrentLikes = async () => {
  const resp = await fetch(url);
  const data = await resp.json();
  likeCount.value = data.likes;
  if (!resp.ok) {
    console.log("error");
    likeCount.value = 0;
  }
  isLoading.value = false;
};
getCurrentLikes();
</script>

<style scoped>
button {
  background-color: #5e51bc;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover {
  background-color: #4a3f9a;
}
</style>
