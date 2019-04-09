<script type="text/babel">
import {checkbox, flux, dropdown} from 'lexi'
export default {
  name: 'account',
  props:['model'],
  components:{checkbox, flux, dropdown},
  data(){
    // If someone is tryinhg to register, redirect to the
    // Digio nanobox announcemenht page
    if( this.model.accountDefaultScreen == "register"){
      window.location.href = 'https://www.digitalocean.com/nanobox'
    }

    return {
      view               : 'login',
      customUsername     : true,
      registerValid      : false,
      loginValid         : false,
      submittingLogin    : false,
      submittingRegister : false,
      submittingForgot   : false,
      // Form Fields
      user               : '',
      email              : '',
      password           : '',
      name               : '',
      phone              : '',
      company            : '',
      role               : 'pick',
      haveReadTerms      : false,
    }
  },
  methods:{
    // REGISTER
    register(){
      this.$emit('error', '')
      let vals = {
        user          : this.user,
        email         : this.email,
        password      : this.password,
        name          : this.name,
        phone         : this.phone,
        company       : this.company,
        role          : this.role,
        haveReadTerms : this.haveReadTerms
      }
      this.submittingRegister = true
      this.$emit('register', vals, (data)=>{
        this.$emit('error', data.error)
        this.submittingRegister = false
      })
    },
    // LOGIN
    login(){
      this.$emit('error', '')
      let vals = {
        user     : this.user,
        password : this.password
      }
      this.submittingLogin = true
      this.$emit('login', vals, (data)=>{
        this.$emit('error', data.error)
        this.submittingLogin = false
      })
    },
    // FORGOT PASSWORD
    forgotPassword(){
      this.$emit('error', '')
      let vals = {
        email : this.email
      }
      this.submittingForgot = true
      this.$emit('forgot', vals, (data)=>{
        this.$emit('error', data.error)
        this.submittingForgot = false
      })
    },
    // Validate Fields
    validateFields(){
      this.loginValid    = this.validate( ['user', 'password'] )
      this.registerValid = this.validate( ['user', 'email', 'password', 'haveReadTerms'] )
    },
    validate(ar) {
      for ( let item of ar ){
        if (!this[item])
          return false
      }
      return true
    },
  },
  watch : {
    email(val){
      if(!this.customUsername){
        val = val.split("@")[0].split('+')[0]
        this.user =  val.replace(/[^0-9a-zA-Z\-]/g, '-')
      }
    },
    customUsername(){
      this.$el.focus()
      setTimeout( ()=> {
        this.$refs.username.focus()
      }, 500 );
    }
  },
  created(){
    this.validateFields()
  }
}
</script>

<!--
  **** H T M L ****
-->

<template lang="pug">
  .account
    flux

      //- Register - Permanently hidden
      .register(v-if="view == 'never-show-register'" v-bind:class="{full:customUsername}" key="register" @keyup.enter="register")
        .switcher
          .item(@click="view = 'login'") Login
        img.merge(src='../assets/svg/compiled/merge-logos.svg')
        .main-title
          .txt Nanobox Joins DigitalOcean!
        .announcement Some blurb and info here. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        .actions
          a(href="https://www.digitalocean.com/nanobox") Learn more
          a.existing(@click="view = 'login'") Existing users login here


      //- Login
      .login(v-if="view == 'login'" key="login" @keyup.enter="login")
        .switcher
          a(href="https://www.digitalocean.com/nanobox") Sign Up
          .item.divider(@click="view = 'reset'") Forgot Password
        .main-title Nanobox : Login
        label
          .txt username / email
          input.required(spellcheck="false" v-model="user" @keyup="validateFields")
        label
          .txt password
          input.required(v-model="password" type="password" spellcheck="false" @keyup="validateFields")
        .proceed(@click="login")
          .btn.lifecycle(v-bind:class="{disabled:!loginValid, ing:submittingLogin}") Login

      //- Forgot Password
      .forgot(v-if="view == 'reset'" key="reset" @keyup.enter="forgotPassword")
        .switcher
          .item(@click="view = 'login'") Nevermind, I remember my password
        .main-title Reset Password
        label
          .txt email Address
          input.required(spellcheck="false" v-model="email")
        .proceed
          .btn.lifecycle(@click="forgotPassword" v-bind:class="{ing:submittingForgot}") Reset
</template>

<!--
  ***** C S S *****
-->

<style lang="scss" >
.lexi.drop-down.custom {width: 48.5%;
  .trigger             {width:100%; border-bottom-color:#EBEFF2 !important; }
}
</style>
<style lang="scss" scoped>
  .account        {
    .main-title   {position: relative;
      label       {right:0; bottom:-10px;  position: absolute;
        .txt:after{left:-17px; top:4px  }
      }
    }
    .form-row     {display: flex; align-items: flex-end; justify-content: space-between; margin-bottom:20px; }
    label         {display: flex; flex-direction: column; @include caps(#93ABB9, 12px); margin-bottom: 20px;
      &.required  {
        .txt:after{content:"*"; font-size:22px; position: absolute; margin-left:3px; margin-top:-5px;  }
      }
    }
    input         {transition: all 300ms;
      &.required  {background: #EBEFF2; margin-top:10px; color:#3D5D70; font-weight: $bold;
        &:focus   {background: #aadbff; color:#153C53; }
      }
      &.optional  {border-bottom: solid 4px #EBEFF2; width:48.5%; padding:0; height:30px; font-weight: $bold; font-size:14px; color:#3D5D70;
        &:focus   {border-bottom-color:#70B6E9; }
        &::-webkit-input-placeholder{color:#B4C6D1; }
        &::-moz-placeholder{color:#B4C6D1; }
        &:-ms-input-placeholder{color:#B4C6D1; }
        &:-moz-placeholder {color:#B4C6D1; }
      }
    }
    .switcher{position: absolute;bottom: -23px; left: 0px;  font-size:15px; font-style:italic; display: flex;
      a,
      .item  {cursor: pointer; color:#96DBFF;
        &:hover{color:white; }
        &.divider{
          &:before{content:" | "; color:#48BBEC; margin: 0 14px; font-style:normal}
        }
      }
    }

    // ------------------------------------ Register
    .login,
    .register,
    .forgot          {width:100%; height:100%; margin:0 auto; position: absolute; padding:45px 63px; }

    .register        {
      .merge         {max-width: 200px; margin-bottom:20px;}
      .actions       {margin-top:20px;}
      a              {font-size: 18px; font-weight: $semibold;  color:#008FE6; display: block; margin-bottom:10px;
        &:hover      {color:#005F99; text-decoration: underline; }
        &.existing   {
          &:hover    {text-decoration: none}
        }
      }
      &.full         {
          .terms     {margin-top:22px;}
        label        {margin-bottom:12px;
          &:last-of-type{margin-bottom: 15px; }
        }
        .form-row    {margin-bottom: 15px; }
      }
      .announcement  {font-size: 18px; color:#778693; font-weight: $semibold; line-height: 1.5;}
    }

    // ------------------------------------ Login

    .proceed         {display: flex; align-items: center;
      .btn           {font-size:14px; padding: 0 35px; }
      .username      {display: flex; margin-right: auto; font-size:13px; font-style: italic; color:#93ABB9; align-items: baseline;
        .label       {@include caps(#93ABB9, 12px); font-style: normal;
          &:after    {content:" : "}
        }
        .user        {color:#33658C; font-size:19px; margin:0 10px 0 5px ;  }
        .change      {color:#19AAF4; font-size:12px; cursor:pointer; }
      }
    }
  }

</style>

<style lang="scss">
.account        {
  .terms{display: flex; align-items: center; margin-top:35px;
    .checkbox {
      .checker{box-shadow:0 1px 2px rgba(black, 0.3); margin-right:20px; }
      .label:hover,
      .label     {color:#93ABB8 !important;}
    }
  }
}

</style>
