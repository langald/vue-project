<template>
  <b-container >
    <div class="menu-links">
      <router-link to="/" v-show="this.session"><i class="material-icons">home</i></router-link>
      <router-link to="/login" >{{this.session ? 'Выйти' : 'Авторизация' }}</router-link>
    </div>
  </b-container>
 
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    // mix the getters into the computed object
    ...mapGetters([
      'session'
    ])
  }
}
</script>

<style>
.menu-links a {
  display: inline-block;
  text-decoration: none;
  color: #fff;
  margin-right: 30px;
}
.menu-links a:hover {
   color: #ccc;
}
.menu-links .material-icons {
  vertical-align: bottom!important;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
}
.menu-links .material-icons:hover {
  color: #ccc;
}
</style>
