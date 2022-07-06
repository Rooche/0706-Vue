let template = `
  <div>
    <textarea v-model="context" placeholder="코멘트를 달아줘" rows="3" max-rows="6"></textarea>
    <button @click="createComment">작성하기</button>
  </div>`

export default {
  template: template,
  props: ['contentId', 'reloadComment'],
  data: function () {
    return {
      user: this.$parent.$parent.$parent.getLoginInfo(),
      context: ''
    }
  },
  methods : {
    createComment : function(){
      let commentData = this.$parent.$parent.$parent.getData().commentData;

      let newCommentId = 1;
      if(commentData.length > 0){
        commentData.sort((a,b) => {
          return a.comment_id - b.comment_id
        });

        newCommentId = commentData[commentData.length - 1].comment_id + 1;
      }

      commentData.push({
        comment_id : newCommentId,
        content_id : this.contentId,
        user_id : this.user.user_id,
        context : this.context,
        created_at : '2022-07-06',
        updated_at : ''
      })

      this.$parent.$parent.$parent.setCommentData(commentData);
      this.$parent.reloadComment();
      this.context = '';
    }
  }
}