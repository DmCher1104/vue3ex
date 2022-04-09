<template>
  <div v-show="posts.length > 0">
    <h3>Список постов</h3>
    <transition-group name="postlist">
      <post-item
          v-for="post in posts"
          :post="post"
          :key="post.id"
          @remove="$emit('remove', post)"
      />
    </transition-group>


  </div>
  <h2 v-show="posts.length === 0" style="color: red">список постов пуст</h2>
</template>

<script>
import PostItem from "@/components/PostItem";

export default {
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style scoped>
.postlist-item {

  display: block;
  margin-right: 10px;
}

.postlist-enter-from,
.postlist-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.postlist-leave-active,
.postlist-enter-active{
  transition: all 0.6s ease;
}

.postlist-move {
  transition: transform 0.8s ease;
}
</style>