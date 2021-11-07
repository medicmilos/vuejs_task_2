<template>
  <div class="gist" @click="activateRow()">
    <div
      class="user-avatar-img"
      :class="{ 'active-image': active == true }"
      :style="{ backgroundImage: 'url(' + gist.owner.avatar_url + ')' }"
    ></div>
    <p :class="{ 'active-text': active == true }" :title="filesNames">
      {{ filesNames }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Gist",
  props: { gist: Object },
  data() {
    return { filesNames: "", active: false }
  },
  created() {
    this.extractFilesNames()
  },
  methods: {
    activateRow() {
      this.active = true
      this.$root.$emit("showAvatar", this.gist.owner.avatar_url)
    },
    extractFilesNames() {
      //since gist's files object have random number of files, join them with comma
      this.filesNames = Object.keys(this.gist.files).join(",")
    }
  }
}
</script>

<style scoped lang="scss">
.gist {
  padding-bottom: 12px;
  margin-bottom: 13px;
  border-bottom: 1px solid #eaeaea;
  cursor: pointer;

  p {
    margin: 0;
    display: inline-block;
    width: calc(100% - 90px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
  }
  .user-avatar-img {
    display: inline-block;
    width: 74px;
    height: 74px;
    margin-right: 16px;
    vertical-align: middle;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .active-image {
    position: relative;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-image: linear-gradient(
        rgba(48, 49, 51, 0.5),
        rgba(48, 49, 51, 0.5)
      );
    }
  }
  .active-text {
    color: #06a9f6;
  }
}
</style>
