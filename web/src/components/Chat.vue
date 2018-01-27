<template>
  <div class="row">
    <div id="contact" class="col-4">
      <div class="group-contact">
        <h5 class="label contact-label"><span class="fa fa-address-book"></span>People</h5>
        <ul class="list contact-list">
          <li class="item-contact">
            <img src="/static/unknow.png" alt="avatar" class="avatar">
            <span class="name"> Person Name </span>
            <span class="status online" title="online"></span>
          </li>
          <li class="item-contact">
            <img src="/static/unknow.png" alt="avatar" class="avatar">
            <span class="name"> Person Name </span>
            <span class="status offline" title="offline"></span>
          </li>
        </ul>
      </div>
    </div>
    <div id="chatroom" class="col-8">
      <div class="group-room">
        <ul class="list chat-list">
          <li class="left">
            <span>
              <img src="/static/unknow.png" alt="avatar" class="avatar">
              <span class="text">
                <p>left chat</p>
                <small>01 Desember 2017</small>
              </span>
            </span>
          </li>
          <li class="right">
            <span>
              <img src="/static/unknow.png" alt="avatar" class="avatar">
              <span class="text">
                <p>right chat</p>
                <small>01 Desember 2017</small>
              </span>
            </span>
          </li>
          <li class="right">
            <span>
              <img src="/static/unknow.png" alt="avatar" class="avatar">
              <span class="text">
                <p>right chat</p>
                <small>01 Desember 2017</small>
              </span>
            </span>
          </li>
          <li class="left">
            <span>
              <img src="/static/unknow.png" alt="avatar" class="avatar">
              <span class="text">
                <p>left chat</p>
                <small>01 Desember 2017</small>
              </span>
            </span>
          </li>
          <li class="left">
            <span>
              <img src="/static/unknow.png" alt="avatar" class="avatar">
              <span class="text">
                <p>left chat</p>
                <small>01 Desember 2017</small>
              </span>
            </span>
          </li>
        </ul>  
        <div class="editor-panel">
            <div class="row">
              <div class="col-9">
                <input id="chateditor" placeholder="Type a message"/>
              </div>
              <div class="col-3">
                <a href="javascript:;" class="button btn-emoji"><span class="fa fa-smile-o"></span></a>
                <a href="javascript:;" class="button btn-send"><span class="fa fa-paper-plane"></span></a>
              </div>
            </div>
        </div>
      </div>    
    </div>
    <router-link :to="{name: 'Signin', query:{signout: true}}" class="signout" title="signout"><span class="fa fa-sign-out"></span></router-link>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  // @import '../assets/scss/bootstrap/bootstrap'
  // @import '../assets/scss/variable'
  // @import '../assets/scss/helper'
  // @import '../assets/scss/chat'
</style>
