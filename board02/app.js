import myHeader from './components/myHeader.js'
import router from './router.js'

// 프로젝트 시작시 보이는 화면만 들고오면 된다.

let template = `
  <div>
    <my-header :parentData.sync="this.$data"></my-header>
    <router-view></router-view>
  </div>`

  let v1 = new Vue({
    el: '#app',
    router, // router : {} 이건 약식으로 표현 원래라면 router : router
    data: {
      dataArray: []
    },
    template: template,
    components: {
      myHeader
    },
    methods: { //거의 다 라우터쪽으로 넘겼기에 거의 필요가 없다. 각각 개별객체니깐 데이터에 적용할때 get,set 응용.
      getParentData : function(){
        return this.dataArray['board'];
      },
      setParentData : function(dataArray){
        this.dataArray['board'] = dataArray;
      }
    }
  })