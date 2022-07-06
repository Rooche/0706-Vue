let template = `
 <div>
  <input type="text" v-model="title" placeholder="제목을 입력해주세요."><br>
  <textarea v-model="context"
            placeholder="내용을 입력해 주세요"
            row="5"
            max-row="10">
  </textarea>
  <button v-on:click="updateMode ? updateContent() : uploadContent()">저장</button>
  <router-link tag="button" v-bind:to="{ name : 'boardList' }">취소</router-link>
 </div>`
export default {
  template : template,
  props : {
    'contentId' :{
        default : null
    }   
},
  data : function(){
    return {
      // 게시글 등록시 필요한 정보
      title : '',
      context : '',
      user_id : '',
      created_at : '',

      // 게시글 수정시 필요한 정보
      update_at : '',
      updateObject : '',

      // 모드 전환용 정보
      updateMode : '',
    }
  },
  created : function(){
    if(this.contentId > 0){
      //수정모드
      this.contentId = Number(this.contentId);

      //컴포넌트 출력 모드를 변경하고 원본 데이터를 가져옴.
      this.updateMode = true;
      this.updateObject = this.$parent.getData().postData.filter(post =>{
        return post.content_id == this.contentId
      })[0];

      //원본 데이터에서 필요한 정보를 렌더링
      this.title = this.updateObject.title;
      this.context = this.updateObject.context;

      //수정일자를 셋팅
      this.update_at = this.getDate();
    } else {
      //새글모드
      this.updateMode = false;
      this.user_id = this.$parent.getLoginInfo().user_id; //뷰인스턴스가 생성될때 로그인정보를 같이 넣을것. 필요할때마다 아이디를 가져오겠다.
      this.created_at = this.getDate();
    }
  },
  methods : {
    getDate : function(){ // 현재 날짜 뽑는 공식이라 외워두면 편하다 ..@@@@@@@@@@
      let today = new Date();

      let year = today.getFullYear();
      let month = ('0' + (today.getMonth() + 1)).slice(-2);
      let day = ('0' + today.getDate()).slice(-2); 

      return year + '-' + month + '-' + day;
    },
    uploadContent : function(){
      let contentData = this.$parent.getData().contentData;

      let newContentId = 1;
      if(contentData.length > 0){
        //데이터 정렬
        contentData.sort((a,b) =>{
          return a.content_id - b.content_id //content_id로 올림차순. +면 내림차순, a와 b에 대해서 검색을 할때 이 두개를 어떤식으로 정렬할껀지 했을때
                                            //오름차순으로 하려면 리턴되는 값이 -1이 되도록하고 내림차순으로 할꺼면 +1이 되도록하면된다
        });
        //마지막 데이터의 contnent_id에 1을 증가
        newContentId = contentData[contentData.length - 1].content_id + 1;
      }

      contentData.push({
        content_id : newContentId,
        user_id : this.user_id,
        title : this.title,
        context : this.context,
        created_at : this.created_at,
        updated_at : this.updated_at
      })

      this.$parent.setContentData(contentData);
      this.$router.push({name : 'boardList'});
    },
    updateContent : function(){
      let contentData = this.$parent.getData().contentData;
      for(let i =0; i<contentData.length; i++){
        if(contentData[i].content_id == this.updateObject.content_id){
          contentData[i].title = this.title;
          contentData[i].context = this.context;
        }
      }

      this.$parent.setContentData(contentData);
      this.$router.push({name:'boardList'});
    }
  }
}