<template>
  <li :class="mc">
    <span>
      <img src="/static/unknow.png" alt="avatar" class="avatar">
      <span class="text">
        <p>{{message.content}}</p>
        <small>{{message.date}}</small>
      </span>
    </span>
  </li>
</template>

<script>
	export default {
		name: 'chat-lists',
		props:['user','message', 'mc'],
		data() {
			return {

			}
		}
	}
</script>
