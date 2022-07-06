export default {
  name : 'my-board-read',
  template: `<div>
              <table id="list">
                <tr>
                  <th style="width:50px;">글제목</th>
                  <td>{{item.title}}</td>
                </tr>
                  <tr style="height:300px">
                    <td colspan="2">{{item.content}}</td>
                  </tr>
                   </table>
                   <router-link tag="button" style="float:right;" :to="{ name : 'boardList' }">목록</router-link>
                   </div>`,
  props: ['item'],
  
  methods :{
    boardRead: function (info) {
      this.boardInfo = info;

      for(let i=0; i<this.dataArray['board'].length; i++){
        if(this.dataArray['board'][i].no == info.no){
          this.dataArray['board'][i].view = parseInt(this.dataArray['board'][i].view)+1;
        }
      }
    }

  }
}