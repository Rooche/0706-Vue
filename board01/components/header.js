export default {
  name : 'my-header',
  template : `
    <header>
    <h2>간단한 게시판 만들어 보아요</h2>
      <p>게시판 데이터 json 파일 읽기</p>
      <input type="file" @change="loadData($event)">
      <button @click="saveBoardList">저장하기</button>
    </header>`,
    props : ['parentData'],
    methods : {
      loadData: function (event) {
        let file = event.target.files[0].name;    
        if(file){
          fetch(file)
          .then(response => response.json())
          .then(data => {
            this.parentData.dataArray = data;
            if(this.parentData.dataArray != null && this.parentData.dataArray['board'].length > 0) {
              this.parentData.listOk = true;
            }
            // 자식 컴포넌트 호출 시 :parentData.sync="뷰 인스턴스 프로퍼티"
            this.$emit('update:parentData', this.parentData);
          }).catch(err => console.log(err));
        }
      },
      saveBoardList : function(){
        let data = this.parentData.dataArray;

        if(data.length == 0){
          alert('저장할 게시판 내용이 없습니다.');
          return; //
        }
        
        if(typeof data == 'object'){
          data = JSON.stringify(data, undefined, 4); // JSON.stringify() 메서드는 JavaScript 값이나 객체를 JSON 문자열로 변환.
        }

        let blob = new Blob([data], {type:'text/json'});
        let a = document.createElement('a');

        a.download = 'board.json';
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        a.click();
      }
    }
}