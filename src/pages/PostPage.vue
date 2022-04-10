<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input style="width: 100%"
              v-model="searchQuery"
              placeholder="Поиск..."
    />
    <!--    <my-btn @click="fetchPosts">получить posts</my-btn>-->
    <div class="app_btns">
      <my-btn
          @click="showDialog"
      >
        Создать пост
      </my-btn>

      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>

    <my-dialog
        v-model:show="dialogVisible"
    >
      <post-form
          @create="createPost"
      />
    </my-dialog>

    <post-list
        v-bind:posts="sortedAndSearchedPost"
        @remove="removePost"
        v-if="!isPostsLoading"
    />
    <div v-else>
      Идет загрузка...
    </div>
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>

  <!--  <my-pagination-->
  <!--      :totalPages="totalPages"-->
  <!--      :currentPage="page"-->
  <!--      @changePage="changePage"-->
  <!--  />-->
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyDialog from "@/components/UI/MyDialog";
import MyBtn from "@/components/UI/MyBtn";
import axios from "axios";
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";
import MyPagination from "@/components/UI/MyPagination";

export default {
  components: {
    MyPagination,
    MyInput,
    MySelect,
    MyBtn,
    MyDialog,
    PostList, PostForm
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
        {value: 'id', name: 'По номеру'},
      ],
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => {
        return p.id !== post.id;
      });
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (e) {
        alert('Ошибка: ' + e);
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert('Ошибка: ' + e);
      }
    },

    // changePage(pageNumber) {
    //   this.page = pageNumber;
    //   this.fetchPosts();
    // }
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return String(post1[this.selectedSort])?.localeCompare(String(post2[this.selectedSort]), {}, {numeric: "true"});
      });
    },
    sortedAndSearchedPost() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
  watch: {
   /* selectedSort(newValue) {
      this.posts.sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]);
      });
    }*/
  }
}
</script>

<style scoped>
.app_btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

/*для наглядности*/
.observer {
  height: 30px;
  background: red;
}
</style>