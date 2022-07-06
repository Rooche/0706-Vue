export default {
  name : 'my-board-read',
  template: `<div>
              <table id="list">
                <tr>
                  <th style="width:50px;">글제목</th>
                  <td>{{object.title}}</td>
                </tr>
                  <tr style="height:300px">
                    <td colspan="2">{{object.content}}</td>
                  </tr>
                   </table>
                   <button style="float:right;" v-on:click="boardList">목록</button>
                   </div>`,
  props: ['object'],

  methods: {
    boardList:function(){
      this.$emit('board-list');
    },
  },
}