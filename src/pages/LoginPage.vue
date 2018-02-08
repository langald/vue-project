<template>

 <b-container >      
      <b-row align-h="center" class="search-block">  
        <b-col cols="4" class="text-center" v-show="!this.session">
          <b-form-group id="fieldsetLogin"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      description=""
                      label="Логин"
                      label-for="login">
          <b-form-input id="login" v-model="auth.login"></b-form-input>
        </b-form-group>      
        <b-form-group id="fieldsetPassword"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      description=""
                      label="Пароль"
                      label-for="password">
          <b-form-input id="password" v-model="auth.password"></b-form-input>
        </b-form-group>    
        <b-form-group id="fieldsetEnter"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      description=""
                      label=""
                      label-for="enter">
        <b-btn size="lg" variant="success" @click="set_session(auth)">Войти</b-btn><br><br>
        <b-alert show variant="danger" v-show="this.$store.state.autherror">Ошибка авторизации</b-alert>
        </b-form-group>      
        </b-col>
      </b-row>
 </b-container>  
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data () {
      return {
        auth: { login: '', password: '' }
      }
    },
    mounted () {
      this.checkAuth()
    },
    computed: {
      ...mapGetters({
        session: 'session'
      })
    },
    methods: {
      ...mapMutations([
        'set_session'
      ]),
      checkAuth () {
        if (this.session !== '') {
          this.set_session('')
        }
      }
    }
  }
</script>
