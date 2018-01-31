<template>
  <div class="row">
    <div id="contact" class="col-4">
      <div class="group-contact">
        <h5 class="label contact-label"><span class="fa fa-address-book"></span>History</h5>
        <search-user></search-user>
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
          <chat-item v-for="list, key in lists" :user="list.user" :message="list.message" :mc="list.mc" :key="key"/>
        </ul>  
        <div class="editor-panel">
            <div class="row">
              <div class="col-9">
                <input @keyup.enter="sendMessage" id="chateditor" placeholder="Type a message" v-model="message.content"/>
              </div>
              <div class="col-3">
                <a href="javascript:;" class="button btn-emoji"><span class="fa fa-smile-o"></span></a>
                <a @click.prevent="sendMessage" class="button btn-send"><span class="fa fa-paper-plane"></span></a>
              </div>
            </div>
        </div>
      </div>    
    </div>
    <router-link :to="{name: 'Signin', query:{signout: true}}" class="signout" title="signout"><span class="fa fa-sign-out"></span></router-link>
  </div>
</template>

<script>
import chatLists from './chat-lists'
import searchUser from './searchUser'
export default {
  name: 'Chat',
  data () {
    return {
      user: JSON.parse(this.$store.getters.currentUser),
      message: {
        content: '',
        date: Date.now()
      },
      lists: []
    }
  },
  sockets: {
    connect: function() {
      console.log('connected');
    },
    message: function(val) {
      if(val.user.email === this.user.email) {
        val.mc ='right';
      } else {
        val.mc ='left';
      }
      this.lists.push(val);
    }
  },
  methods: {
    sendMessage() {
      if(/\S/.test(this.message.content) && this.message.content !== '') {
        let that = this;
        this.$store.dispatch('postApi', {
          url: this.$store.getters.getApiUri('message'),
          data: that.message,
          type: 'application/json',
          success: function (res) {
            that.message.content = '';
          }
        });
      }
    }
  },
  components: {
    'chat-item': chatLists,
    'search-user': searchUser
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
