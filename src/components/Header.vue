<template>
  <header class="header">
    <symbol id="icon-cart" viewBox="0 0 38 32">
      <title>cart</title>
      <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
      <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
      <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
      <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
    </symbol>
    <div class="navbar">
      <div class="navbar-left-container">
        <a href="/">
          <img class="navbar-brand-logo" src=""></a>
      </div>
      <div class="navbar-right-container" style="display: flex;">
        <div class="navbar-menu-container">
          <!--<a href="/" class="navbar-link">我的账户</a>-->
          <span class="navbar-link"></span>
          <span v-text="nickName" v-if="nickName"></span>
          <a href="javascript:void(0)" class="navbar-link" v-if="!nickName" @click="loginModelFlag=true">登录</a>
          <a href="javascript:void(0)" class="navbar-link" v-if="!nickName" @click="eraseSpoor">注册</a>
          <a href="javascript:void(0)" class="navbar-link" v-if="nickName" @click="logout">退出</a>
          <div class="navbar-cart-container">
            <span class="navbar-cart-count"></span>
             <router-link to="/cart" v-show="cart"  class="navbar-link navbar-cart-link">
              <svg class="navbar-cart-logo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>

      <!-- 登录框 -->
    <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':loginModelFlag}" >
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">登录</div>
          <button class="md-close" @click="loginModelFlag = false">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error error-show" v-show="errorTip">用户名或密码错误</span>
            </div>
            <ul>
              <li class="regi_form_input">
                <i class="icon IconUser"></i>
                <input type="text" tabindex="1" name="loginname" placeholder="User Name" v-model="userName" data-type="loginname" class="regi_login_input regi_login_input_left">
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="2" name="password" placeholder="Password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" @keyup.enter="login">
              </li>
            </ul>
          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="login">登录</a>
          </div>
        </div>
      </div>
    </div>
      <!-- 注册框 -->
    <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':registerModelFlag}" >
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">注册</div>
          <button class="md-close" @click="registerModelFlag = false">关闭</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error error-show" v-show="errorOccupy">用户名已被占用</span>
              <span class="error error-show" v-show="errorPassword">重复密码错误，请重新输入</span>
              <span class="error error-show" v-show="errorTip">请用字母开头加数字的组合4位数以上</span>
              <span class="error error-show" v-show="missUser">用户名不能为空请勿包含空格</span>
              <span class="success success-show" v-show="pProgID">该用户可以注册</span>
              <span class="error error-show" v-show="busy">系统繁忙</span>
            </div>
            <ul>
              <li class="regi_form_input">
                <i class="icon IconUser"></i>
                <input type="text" tabindex="1" name="loginname" @input="checkForm" placeholder="User Name" v-model="userName" data-type="loginname" class="regi_login_input regi_login_input_left">
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="2" name="password" @input="checkForm" placeholder="Password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" @keyup.enter="login">
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="3" name="checkPassword" @input="checkForm" placeholder="confirm password" v-model="checkUserPwd" class="regi_login_input regi_login_input_left login-input-no input_text" @keyup.enter="login">
              </li>
            </ul>
          </div>
          <div class="login-wrap">
            <button class="btn-login" @click="register" v-bind:disabled="checkReg">确认注册</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 登录遮罩层 -->
    <div class="md-overlay" v-if="loginModelFlag" @click="loginModelFlag = false">
    </div>
     <!-- 注册遮罩层 -->
    <div class="md-overlay" v-if="registerModelFlag" @click="registerModelFlag = false">
    </div>
  </header>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'Header',
    // 存放数据变量
    data () {
      return {
        cart: false,
        loginModelFlag: false,
        registerModelFlag: false,
        userName: '',
        userPwd: '',
        checkUserPwd: '',
        checkReg: true,
        busy: false,
        missUser: false,
        errorTip: false,
        pProgID: false,
        errorPassword: false,
        errorOccupy: false,
        nickName: ''
      }
    },
    // 生命周期挂载,在页面打开时调用
    mounted: function() {
      this.checkLogin();
    },
    methods: {
      // 检测用户是否登录
      checkLogin () {
        axios.get("/users/checkLogin").then((response) => {
          let res = response.data;
          if (res.status === '0') {
            this.nickName = res.result;
            this.cart = true;
          }
        })
      },
      // 注册前端验证
      checkForm () {
        if(!this.userName ||  /\s/g.test(this.userName)){
          this.missUser = true
          this.pProgID = false;
          this.errorTip = false;
          this.errorOccupy = false;
          this.errorPassword = false;
          this.checkReg = true;
          return false;
        } else if (this.userName.length < 4 || !/^[a-zA-Z]+\w+/.test(this.userName)) {
          this.errorTip = true;
          this.pProgID = false;
          this.missUser = false;
          this.errorOccupy = false;
          this.errorPassword = false;
          this.checkReg = true;
          return false;
        } else if (this.userPwd != this.checkUserPwd) {
          this.errorPassword = true;
          this.missUser = false;
          this.errorTip = false;
          this.errorOccupy = false;
          this.pProgID = false;
          this.checkReg = true;
          return false;
        } else {
          axios.post("/users/checkUserName",{
            userName:this.userName
          }).then(
            (result)=>{
              let res = result.data;
              if (res.status === '1') {
                this.errorOccupy = true;
                this.pProgID = false;
                this.missUser = false;
                this.errorTip = false;
                this.errorPassword = false;
                this.checkReg = true;
              } else {
                this.errorTip = false;
                this.missUser = false;
                this.errorOccupy = false;
                this.pProgID = true;
                this.errorPassword = false;
                this.checkReg = false;
              }
            }
          )
        }
      },
      // 清除注册痕迹
      eraseSpoor () {
        this.registerModelFlag = true;
        this.errorOccupy = false;
        this.pProgID = false;
        this.missUser = false;
        this.errorTip = false;
        this.errorPassword = false;
        this.busy = false;
        this.userName = '';
        this.userPwd = '';
        this.checkUserPwd = '';
      },
      // 注册
      register () {
        axios.post("users/register", {
          userName: this.userName,
          userPwd: this.userPwd
        }).then( (result) => {
          let res = result.data;
          if (res.status === '0') {
            this.registerModelFlag = false;
            this.login();
          } else {
            this.busy = true;
          }
        })
      },
      // 登录
      login () {
        if (!this.userName || !this.userPwd) {
          this.errorTip = true;
          return false;
        }

        axios.post("/users/login", {
          userName: this.userName,
          userPwd: this.userPwd
        }).then( (response) => {
          let res = response.data;
          console.log(response)
          if (res.status === '0') {
            this.loginModelFlag = false;
            this.nickName = res.result.userName;
            this.cart = true;
          }else {
            this.errorTip = true
          }
        })
      },
      // 退出
      logout () {
        axios.post('/users/logout').then( (response) => {
          let res = response.data;
          if (res.status === '0') {
            this.nickName = '';
            this.cart = false;
            // 在这里清除 cookie
          }
        })
      }
    }
  }
</script>

<style>

</style>
