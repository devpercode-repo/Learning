const chats = [
      {
        path: '/console/chat/:id',
        name: 'chat',
        component: () => import('../views/chats/ChatView.vue')
      },
    ];
  
  export default chats