export default {
  template: `
    <div>
      <router-link v-bind:to="{name:'boardList'}">{{sitename}}></router-link>
    </div>`,

  data: function () {
    return {
      sitename: 'vue,js 게시판'
    }
  }
}