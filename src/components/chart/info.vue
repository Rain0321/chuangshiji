<template>
  <div class="part-info">
    <el-table
      :data="infoList"
      :show-header="false"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column label="消息">
          <template slot-scope="scope">
              <el-avatar :src="scope.row.avatar"></el-avatar>
              <span class="info-content">
                  <p class="name-text">{{ scope.row.userName }}</p>
                  <p class="latest-new">{{ scope.row.infoContent[0].text }}</p>
              </span>
          </template>
      </el-table-column>
  </el-table>
  </div>
</template>
<style lang="scss" scoped>
.part-info {
  ::v-deep .cell {
    display: flex;
    span {
      // display: inline-block;
      &:first-child {
        width: 40px;
        margin-right: 10px;
      }
      &:nth-child(2) {
        flex: 1;
        .latest-new {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          font-size: 13px;
          margin-top: 3px;
          // white-space: nowrap;
        }
      }
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      infoList: [
          {
              avatar: "https://pic.qqtn.com/up/2018-5/15253139537308866.jpg",
              userId: 1,
              userName: "梦中飞翔",
              infoContent: [
                  {
                      infoId: 1,
                      text: "你好，我叫某某，是通过群聊加您好友的",
                      data: "2023-5-28"
                  }
              ]
          },
          {
              avatar: "https://pic.qqtn.com/up/2018-4/15239319654651823.jpg",
              userId: 1,
              userName: "肖恩",
              infoContent: [
                  {
                      infoId: 1,
                      text: "你好，我叫某某，是通过群聊加您好友的",
                      data: "2023-5-28"
                  }
              ]
          },
          {
              avatar: "https://pic.qqtn.com/up/2018-4/15239319654651823.jpg",
              userId: 1,
              userName: "彤彤",
              infoContent: [
                  {
                      infoId: 1,
                      text: "你好，我叫某某，是通过群聊加您好友的",
                      data: "2023-5-28"
                  }
              ]
          },
          {
              avatar: "https://pic.qqtn.com/up/2018-4/15239319654651823.jpg",
              userId: 1,
              userName: "肖恩",
              infoContent: [
                  {
                      infoId: 1,
                      text: "你好，我叫某某，是通过群聊加您好友的",
                      data: "2023-5-28"
                  }
              ]
          },
          {
              avatar: "https://pic.qqtn.com/up/2018-4/15239319654651823.jpg",
              userId: 1,
              userName: "肖恩",
              infoContent: [
                  {
                      infoId: 1,
                      text: "你好，我叫某某，是通过群聊加您好友的",
                      data: "2023-5-28"
                  }
              ]
          },
          {
              avatar: "https://pic.qqtn.com/up/2018-4/15239319654651823.jpg",
              userId: 1,
              userName: "肖恩",
              infoContent: [
                  {
                      infoId: 1,
                      text: "你好，我叫某某，是通过群聊加您好友的",
                      data: "2023-5-28"
                  }
              ]
          },
          {
              avatar: "https://pic.qqtn.com/up/2018-4/15239319654651823.jpg",
              userId: 1,
              userName: "肖恩",
              infoContent: [
                  {
                      infoId: 1,
                      text: "你好，我叫某某，是通过群聊加您好友的",
                      data: "2023-5-28"
                  }
              ]
          },
          {
              avatar: "https://pic.qqtn.com/up/2018-4/15239319654651823.jpg",
              userId: 1,
              userName: "肖恩",
              infoContent: [
                  {
                      infoId: 1,
                      text: "你好，我叫某某，是通过群聊加您好友的",
                      data: "2023-5-28"
                  }
              ]
          },
          {
              avatar: "https://pic.qqtn.com/up/2018-4/15239319654651823.jpg",
              userId: 1,
              userName: "肖恩",
              infoContent: [
                  {
                      infoId: 1,
                      text: "你好，我叫某某，是通过群聊加您好友的",
                      data: "2023-5-28"
                  }
              ]
          },
          {
              avatar: "https://pic.qqtn.com/up/2018-4/15239319654651823.jpg",
              userId: 1,
              userName: "肖恩",
              infoContent: [
                  {
                      infoId: 1,
                      text: "你好，我叫某某，是通过群聊加您好友的",
                      data: "2023-5-28"
                  }
              ]
          },
          {
              avatar: "https://pic.qqtn.com/up/2018-4/15239319654651823.jpg",
              userId: 1,
              userName: "肖恩",
              infoContent: [
                  {
                      infoId: 1,
                      text: "你好，我叫某某，是通过群聊加您好友的",
                      data: "2023-5-28"
                  }
              ]
          }
      ]
    }
  },
  methods: {
    
  }
}
</script>