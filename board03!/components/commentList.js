import commentListItem from './commentListItem.js'
import commentCreate from './commentCreate.js'

let template = `
    <div>
      <div v-for="item in comments" :key="item.comment_id"> <!-- 해당 게시글에 있는 글을 반복. -->
        <comment-list-item :commentObj="item"></comment-list-item>
      </div>
      <comment-create :contentId="contentId" :reloadComment="reloadComment"></comment-create> <!-- 자식컴포넌트 -->
    </div>`

export default {
  template : template,
  components : {
    commentListItem,
    commentCreate
  },
  props : ['contentId'],
  data : function(){
    return {
      comments : this.$parent.$parent.getData().commentData.filter(comment =>{
        return comment.content_id == this.contentId;
      })
    }
  },
  methods : {
    reloadComment : function(){
      this.comments = this.$parent.$parent.getData().commentData.filter(comment => {
        return comment.content_id == this.contentId;
      })
    }
  }
}