import myHeader from './components/myHeader.js'
import router from './router/router.js'
import originalData from './data/index.js'

let template = `
  <div>
    <my-header></my-header>
    <router-view></router-view>
  </div>`

new Vue({
  el : '#app',
  router,
  template : template,
  components : {
    myHeader
  },
  data : {
    userData : [],
    contentData : [],
    commentData : [],
    loginUser : {}
  },
  computed : {
    postData : function(){
      return this.contentData.map(content => {
        let selectUserName = this.userData.filter(user => {
          return (user.user_id == content.user_id);
        })[0].name;
        return {
          ...content,
          user_name : selectUserName
        }
      })
    }
  },
  created : function(){
    this.userData = originalData['User'];
    this.contentData = originalData['Content'];
    this.commentData = originalData['Comment'];
    this.loginUser = this.userData[0];
  },
  methods : {
    getLoginInfo : function(){
      return this.loginUser;
    },
    getData : function(){
      return{
        userData : this.userData,
        contentData : this.contentData,
        commentData : this.commentData,
        postData : this.postData
      }
    },
    setContentData : function(contentData){
      this.contentData = this.contentData;
    },
    setCommentData : function(commentData){
      this.commentData = this.commentData;
    }
  }
});