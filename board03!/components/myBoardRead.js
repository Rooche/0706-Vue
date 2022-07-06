import commentList from './commentList.js'

let template = `
    <div>
      <div>
        <!-- 게시글 -->
        <div>
          <span>{{ post.content_id }}</span>
          <span>{{ post.title }}</span>
          <span>글쓴이 : {{ post.user_name }}</span>
          <span>작성일 : {{ post.created_at }}</span>
        </div>
        <div>{{ post.context }}</div>
      </div>

      <div>
        <!-- 버튼(수정, 삭제) -->
        <router-link tag="button" :to="{ name : 'boardWrite' , params : { contentId : post.content_id }}">수정</router-link>
        <button @click="deleteData">삭제</button>
      </div>

      <div>
        <!-- 해당 게시글 댓글 -->
        <comment-list :contentId="post.content_id"></comment-list>
      </div>
    </div>`

export default {
  template : template,
  components : {
    commentList
  },
  props : ['post'],
  methods : {
    deleteData : function(){
      let contentData = this.$parent.getData().contentData; // this는 인스턴스를 가르킨다.
      for(let i=0; i < contentData.length; i++){
        if(contentData[i].content_id == this.post.content_id){
          contentData.splice(i, 1);
        }
      }
      this.$parent.setContentData(contentData);
      this.$router.push({name : 'boardList'});
    }
  }
}