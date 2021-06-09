<template>
  <div>
    <p style="padding:5px 15px 5px 15px; background-color: white;border-radius: 10px;">
          用户在进行注册程序过程中点击"同意" 按钮即表示用户完全接受本服务协议
      <br>用户同意保障和维护本平台及其他用户的合法权益，如因用户违反有关法律、法规或本协议项下的任何条款而给本平台及其关联公司或任何其他任何第三方造成损失，用户同意承担由此造成的损害赔偿责任。
      <br>本平台有权随时修改本协议的任何条款，一旦本协议的内容发生变动，本平台将会在主页上公布修改之后的协议内容。
      <br>鉴于网络服务的特殊性（包括但不限于服务器的稳定性问题、恶意的网络攻击等行为的存在及其他本平台无法控制的情形），用户同意本平台有权随时中断或终止部分或全部服务。
      <br>用户理解，本平台需要定期或不定期地对提供服务的平台（如互联网网站、应用程序等）或相关的设备进行检修或者维护，如因此类情况而造成服务在合理时间内的中断，本平台无需为此承担任何责任。
    </p>
    <div style="padding: 0 20px 60px 20px;">
      <br>
      <x-button @click.native="nav" style="color:white;background-color: #3cc51f">返回</x-button>
    </div>
  </div>

</template>


<script>
  import { XButton } from 'vux'
  export default {
    components: {
      XButton
    },
    methods: {
      nav () {
        this.$router.go(-1)
      }
    }
  }
</script>
