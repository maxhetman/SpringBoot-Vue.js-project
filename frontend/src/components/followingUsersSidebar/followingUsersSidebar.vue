<template>
  <div>

    <div class="w3-quarter followersContainer">
      <div class="w3-white w3-text-grey w3-card-4">
        <div class="w3-display-container">
          <div class="w3-container" style="padding: 0;">
            <a v-bind:href="/profile/ + user.nickName" v-for="user in followingUsers">
              <div class="follower-div">
                <img  v-bind:src="getImgUrl(user.avatarUrl)"class="follower-icon fa-briefcase w3-margin-right">
                <span class="following-user-name">{{user.nickName}}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'following-users-sidebar', // this is the name of the component,
    props:{
      followingUsers: {
        type: Array,
        required: true
      }
    },
    methods: {
      getImgUrl(pet) {
        if(!pet || /^\s*$/.test(pet)){
          pet = "empty.png"
        }
        var images = require.context('../../assets/');
        return images('./' + pet )
      }
    }
  }
</script>

<style>

  @import url(https://www.w3schools.com/w3css/4/w3.css);
  @import url(https://fonts.googleapis.com/css?family=Roboto);
  @import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);
  .follower-div{
    padding-left: 10px;
    text-align: left;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .follower-div:hover {
    background-color: aqua;
  }
  .follower-icon {
    width: 3em;
  }
  .following-user-name {
    text-decoration: none;
  }

  .followersContainer{
    width: 100%;
  }

  html,body,h1,h2,h3,h4,h5,h6 {font-family: "Roboto", sans-serif}
</style>
