<template>
  <form @submit.prevent>
    <h3>Создание поста</h3>
    <my-input
        v-model="post.title"
        @input="post.title = $event.target.value"
        type="text"
        placeholder="Название"
    />
    <my-input
        v-model="post.body"
        @input="post.body = $event.target.value"
        type="text"
        placeholder="Описание"
    />
    <my-btn
        style="align-self: flex-end; margin-top: 15px"
        @click="createPost"
    >
      создать
    </my-btn>
  </form>
</template>

<script>
import MyInput from "@/components/UI/MyInput";

export default {
  components: {MyInput},
  data() {
    return {
      post: {
        title: '',
        body: '',
      }
    }
  },
  methods: {
    createPost(event) {
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
        title: '',
        body: '',
      }
    }
  }
}
</script>

<style scoped>

form {
  display: flex;
  flex-direction: column;
}
</style>