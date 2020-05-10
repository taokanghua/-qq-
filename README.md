# socket部分业务逻辑

## 加入房间

1. 第一步 进入chatPage.vue时候 发送inviteRoom事件
2. 后台监听inviteRoom 并向所有人广播(checkAndJoin)房间号
3. 前台main.vue中监听checkAndJoin然后调用JoinRoom事件 加入房间
4. 在contact.vue设置登陆上就发送用户数据事件(userInfo)
5. 创建一个房间数组 存放已经加入的房间号 防止重复加房间

## 发送消息

1. chatpage发送sendMsg事件 其中把数据进行了一点扩充
2. 后台接收sendMsg事件 并向房间所有人发一个 receiveMsg事件 
3. 前台接收到消息 然后做一系列处理 并放在vuex的session中

## 聊天记录

1. 当用户登陆后(contact.vue) 先在session中提取房间号（getHistory） 然后从后台获取下来
2. 后台在所有聊天记录中筛选房间 并发送 history事件
3. 前台监听history事件 并把聊天记录放到 vuex的history中

