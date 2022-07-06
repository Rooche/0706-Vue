import main from './components/main.js'
import myBoardList from './components/myBoardList.js'
import myBoardRead from './components/myBoardRead.js'
import myBoardWrite from './components/myBoardWrite.js'

export default new VueRouter({
  mode : 'history', // hash와 history가 있다. default : hash -> '#'/path  ,  history 사용시 윈도우에서 제공하는 정보를 사용할수있다.
                    // 서버와 통신할때는 hash는 사용 안하는게 좋다.
  routes : [
    // 처음들어갈때 보이는 main
    {
      path : '/',
      name : 'main',
      component : main,
      props : true
    },

    //boardList
    {
      path : '/boardList',
      name : 'boardList',
      component : myBoardList,
      props : true
    },

    //boardRead
    {
      path : '/boardRead/:item', // boardread와 연결된 컴포넌트에서 콜론(:)다음에 이름을 정해주면된다.
      name : 'boardRead',
      component : myBoardRead,
      props : true
    },

    //boardWrite
    {
      path : '/boardWrite',
      name : 'boardWrite',
      component : myBoardWrite,
      props : true
    },

    //엉뚱한 값이 들어올때는.
    {
      path : '*',
      redirect : '/'
    }
  ]
})