<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3</div>
    <div class="navbar__btns">
      <my-btn @click="$router.push('/posts')">Страница с постами</my-btn>
      <my-btn @click="$router.push('/about')" style="margin-left: 20px">О нас</my-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>
.navbar {
  height: 50px;
  background: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navbar__btns{
  margin-left:  auto;
}
</style>