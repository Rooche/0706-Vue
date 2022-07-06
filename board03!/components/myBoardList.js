let template = `
<div>
<table id="list">
  <!-- 테이블 헤더 -->
  <tr>
    <td>글번호</td>
    <td>제목</td>
    <td>작성자</td>
    <td>작성일</td>
  </tr>
  <!-- 테이블 바디 -->
  <tr v-for="post in currentData" v-bind:key="post.content_id">
  <td>{{post.content_id}}</td>
  <router-link tag="td" v-bind:to="{name:'boardRead', params : {post : post}}">
    {{post.title}}
  </router-link>
  <td>{{post.user_name}}</td>
  <td>{{post.created_at}}</td>
</tr>
  </tr>
</table>
<div>
  <!-- 페이지네이션-->     
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <template v-for="page in pagingInfo.totalPage">
        <li class="page-item">
          <a class="page-link" href="#" v-on:click="currentPage = page">{{ page }}</a>
        </li>
      </template>
    </ul>
  </nav>
<router-link tag="button" v-bind:to="{name : 'boardWrite'}">글쓰기</router-link>
</div>

`
//프로퍼티를 관리하는 속성 3개 data, computed, watch
//진짜 변수처럼 넣고 빼고 할수있는 속성 data
//읽기전용 computed 하지만 자체적으로 값으로 침
//변화를 감지하는것 watch (ex. 쪽지가 왔을때 알람을 전달할때 watch)
export default {
  template: template,
  data: function () { //get,set 움직이는걸 data처리.
    return {
      posts: [],
      currentPage : 1 // 현재 선택된 페이지 정보.
    }
  },
  computed : { //산출이 필요한걸 computed에 적음
    // data 속성을 필요에 따라 산출해서 또 다른 프로퍼티 -> 읽기전용

    // 페이징관련 totalPage
    pagingInfo : function(){
      let perData = 10;
      let totalPage = Math.ceil(this.posts.length/perData); // 토탈페이지를 구할땐 올림을 하여 감싸준다.

      let totalPageArray = [];
      for(let i=1; i<=totalPage; i++){
        totalPageArray.push(i);
      }

      return {
        perData : perData,
        totalPage : totalPageArray
      }
    },

    // 현재 페이지에 따라 출력될 데이터
    currentData : function(){
      let firstIndex = (this.currentPage - 1) * this.pagingInfo.perData;
      let lastIndex = firstIndex + this.pagingInfo.perData - 1;

      return this.posts.filter((post, index) =>{
        return index >= firstIndex ? ( index <= lastIndex ? true : false) : false;
      })
    }
  },
  watch : {
    //프로퍼티 변화를 감지해서 진행해야하는 프로세스를 정의

  },
  created: function () {
    //인스턴스 라이프사이클 중에서 어느시점에 진행해야 하는 프로세스 정의
    this.posts = this.$parent.getData().postData;
  }
}
