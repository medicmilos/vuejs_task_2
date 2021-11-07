<template>
  <div id="app">
    <div class="gists">
      <div class="header"><p>Gists</p></div>
      <div v-show="loading" class="loader">Loading...</div>
      <div
        v-show="gists.length > 0 && !loading"
        ref="gistsItems"
        class="gists-items"
      >
        <Gist v-for="gist in gists" :key="gist.id" :gist="gist" />
      </div>
      <div class="footer">
        <Pagination
          :currentPage="currentPage"
          :minPageNum="minPageNum"
          :maxPageNum="maxPageNum"
          @goPrev="goPrev"
          @goNext="goNext"
          @changeCurrentPage="changeCurrentPage"
        />
      </div>
      <transition name="fade">
        <img v-if="showAvatar" :src="userAvatarUrl" class="user-avatar" />
      </transition>
    </div>
  </div>
</template>

<script>
import Gist from "./components/Gist"
import Pagination from "./components/Pagination"

export default {
  name: "App",
  components: { Gist, Pagination },
  data() {
    return {
      minPageNum: 1,
      maxPageNum: 100,
      perPage: 30,
      currentPage: 1,
      gists: [],
      loading: true,
      authToken: "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",
      showAvatar: false,
      userAvatarUrl: null
    }
  },
  created() {
    this.getGists(this.currentPage)

    this.$root.$on("showAvatar", avatarUrl => {
      this.userAvatarUrl = avatarUrl
      this.showAvatar = true
      setTimeout(() => {
        this.showAvatar = false
      }, 1000)
    })
  },
  watch: {
    currentPage(newValue) {
      this.getGists(newValue)
    }
  },
  methods: {
    getGists(currentPage) {
      this.loading = true
      const url =
        "https://api.github.com/gists/public?page=" +
        currentPage +
        "&per_page=" +
        this.perPage

      fetch(url, {
        headers: {
          //auth token is needed, since api is limited on 60 requests per hour for non authorized users
          Authorization: "token " + this.authToken
        }
      })
        .then(response => response.json())
        .then(data => {
          this.gists = data
          this.loading = false

          //we use nextTick here, since we depend on the post-update DOM state
          this.$nextTick(() => {
            this.$refs.gistsItems.scrollTop = 0
          })
        })
        .catch(error => console.error(error))
    },
    goPrev() {
      this.currentPage--
    },
    goNext() {
      this.currentPage++
    },
    changeCurrentPage(num) {
      this.currentPage = num
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}
.gists {
  font-family: Arial, Helvetica, sans-serif;

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
  }
  .header,
  .gists-items,
  .footer {
    position: absolute;
    left: 0px;
    right: 0px;
    overflow: hidden;
  }
  .header {
    background: #f3f3f3;
    padding: 6px 16px 4px 16px;
    top: 0px;

    p {
      font-weight: bold;
      font-size: 15px;
      margin: 0;
    }
  }
  .gists-items {
    padding: 16px;
    top: 27px;
    bottom: 49px;
    overflow: auto;
  }
  .footer {
    background: #fff;
    padding: 13px 24px 11px 16px;
    bottom: 0px;
    height: 25px;
    text-align: right;
    span {
      color: #06a9f6;
      margin-right: 5px;
      cursor: pointer;
      vertical-align: sub;
    }
    .active {
      color: #000;
    }
  }
  .user-avatar {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
