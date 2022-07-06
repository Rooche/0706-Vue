import myBoardList from '../components/myBoardList.js'
import myBoardRead from '../components/myBoardRead.js'
import myBoardWrite from '../components/myBoardWrite.js'

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'boardList',
      component: myBoardList

    },
    {
      path : '/boardRead/:post',
      name : 'boardRead',
      component : myBoardRead,
      props : true
    },
    {
      path : '/boardWrite/:contentId',
      name : 'boardWrite',
      component : myBoardWrite,
      props : true
    },
    { // 지정한 경로가 아닌것이 들어오면 루트로 보냄.
      path : '*',
      redirect : '/'
    }
  ]
})