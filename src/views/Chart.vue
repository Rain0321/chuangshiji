<template>
    <div class="page-chart">
        <div class="chart-content">
            <div class="chart-top">
                <div class="chart-top-left"></div>
                <div class="chart-top-right">
                </div>
            </div>
            <div class="chart-main">
                <div class="chart-left">
                    <chart-info></chart-info>
                    <!-- <el-table
                        :data="infoList"
                        :show-header="false"
                        border
                        style="width: 100%; margin-top: 20px">
                        <el-table-column label="消息">
                            <template slot-scope="scope">
                                <el-avatar :src="scope.row.avatar"></el-avatar>
                                <div class="info-content">
                                    <div class="name-text">{{ scope.row.userName }}</div>
                                    <div class="latest-new">{{ scope.row.infoContent[0].text }}</div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table> -->
                </div>
                <div class="chart-right">
                    <div class="chart-log">
                    </div>
                    <div class="input-field">
                        <chart-iput></chart-iput>
                        <!-- <div class="input-field-toolbar">
                            <div class="input-field-tool_emoji" @click="isShowEmoji = !isShowEmoji"></div>
                            <div class="emoji-choose" v-show="isShowEmoji"  @blur="isShowEmoji = false">
                                <span v-for="item in emoji" :key="item.id" @click="chooseHandle(item.emojiText)">{{item.emojiText}}</span>
                            </div> -->
                            <!-- v-html="msg" 
                            @input="msg=$event.target.innerHTML" -->
                           <!--  <div class="send-box" ref="msgIput" 
                                contenteditable="true" 
                                @blur="blurHandle" 
                                @click="focusHandle"
                                @paste="pasteHandle"
                                @copy="copyHandle"
                                @keyup="keyupHandel"
                                >
                            </div> -->
                            <!-- <textarea name="" id="" v-model="msg" @keyup.enter="sendMsg" @blur="blurHandle" ref="msgIput" @focus="focusHandle"></textarea> -->
                            <!-- <div class="send-btn">
                                <input type="button" value="发送" @click="sendMsg">
                            </div> -->
                    <!-- </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    * {
        margin: 0;
        padding: 0;
    }
    .page-chart {
        background-color: gainsboro;
        height: 100%;
        min-height: 600px;
        width: 100%;
        position: relative;
        .chart-content {
            width: 1000px;
            height: 580px;
           position: absolute;
           /* top: 0;
           bottom: 0;
           left: 0;
           right: 0;
           margin: auto; */
           left: 50%;
           top: 50%;
           transform: translate(-50%, -50%);
            background-color: #fff;
            overflow: hidden;
            .chart-top {
                background-color: burlywood;
                height: 60px;
                .chart-top-left {
                    width: 280px;
                    height: 60px;
                    float: left;
                    background-color: aqua;
                }
                .chart-top-right {
                    overflow: hidden;
                    background-color: antiquewhite;
                    height: 60px;
                }
            }
            .chart-main {
                overflow: hidden;
                .chart-left {
                    width: 280px;
                    height: 520px;
                    float: left;
                    // background-color: palegoldenrod;
                    overflow: auto;
                    &::-webkit-scrollbar {
                        width: 7px;    
                        height: 4px;
                    }
                    &::-webkit-scrollbar-thumb {
                        border-radius: 10px;
                        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                        background: rgba(0,0,0,0.2);
                    }
                    &::-webkit-scrollbar-track {
                        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                        border-radius: 0;
                        background: rgba(0,0,0,0.1);
                    
                    }
                }
                .chart-right {
                    overflow: hidden;
                    height: 520px;
                    background-color: palevioletred;
                    .chart-log {
                        position: relative;
                        height: 370px;
                        background-color: aliceblue;
                    }
                    .input-field {
                        height: 150px;
                        background-color: azure;
                        .input-field-toolbar {
                            .input-field-tool_emoji {
                                width: 20px;
                                height: 20px;
                                background: url(../img/face.png);
                                margin: 2px 7px;
                                cursor: pointer;
                            }
                        }
                        .emoji-choose {
                            position: absolute;
                            bottom: 150px;
                            width: 281px;
                            background-color: #fff;
                            padding: 3px;
                            display: flex;
                            flex-wrap: wrap;
                            font-size: 22px;
                            span {
                                cursor: pointer;
                            }
                        }
                        .send-box {
                            padding: 6px 10px;
                            width: 700px;
                            height: 90px;
                            background-color: inherit;
                            color: #252525;
                            font-size: 13px;
                            font-family: inherit;
                            word-break: break-all;
                            white-space: normal;
                            overflow-y: auto;
                            border: none;
                            outline: none;
                            textarea {
                                resize: none;
                                width: 700px;
                                height: 90px;
                                border: none;
                                outline: none;
                                background: inherit;
                                font-size: 16px;
                                font-family: monospace;
                            }
                        }
                        .send-btn {
                            float: right;
                            position: relative;
                            top: -14px;
                            right: 10px;
                            input {
                                background-color: #fff;
                                padding: 4px 13px;
                                border: 1px solid #e0e0e0;
                                border-radius: 5px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<script>
import chartInfo from '@c/chart/Info';
import chartIput from '@c/chart/chartInput';
export default {
    components: {chartInfo, chartIput},
    sockets: {
         // 链接成功
         connect(data) {
           console.log(data)
         },
         // 发送消息
         toServer(data) {
           this.$socket.emit('toServer', data)
         },
         // 接收消息
         toClient(data) {
           this.msgList.push(data)
         },
         // 断开链接回调
         disconnect() {
           console.log('disconnect：', '已经断开 socket 链接')
         },
         // 重新连接
         reconnect() {
           // 自动执行，直到链接成功
           this.$socket.emit('connect')
         }
    },
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
                }
            ],
            
        }
    },
    watch: {

    },
    created() {
        this.$socket.emit('hello',111);
        //this.$socket.emit('connect',1);
    },
    mounted() {
        
    },
    methods: {
        //********************textarea******************************** */
    //     focusHandle() {
    //         this.isShowEmoji = false;
    //     },
    //     //点击emojs表情，输入框光标处入表情
    //    chooseHandle(e) {
    //         console.log('点击emoji,表情长度',e.length,"插入位置",this.carePosition);
    //         this.handleSetText(e);
    //         console.log('插入后careposition',this.carePosition,"当前光标位置",this.getCursorPosition(this.$refs.msgIput));
    //         this.$refs.msgIput.focus();
    //         //this.$nextTick(this.$refs.msgIput.setSelectionRange(this.carePosition.start, this.carePosition.end));
    //         setTimeout(() => {
    //              this.$refs.msgIput.setSelectionRange(this.carePosition.start, this.carePosition.end);
                
    //          }, 0); 
    //     },
    //    //发送消息
    //    sendMsg(e) {
    //        console.log('发送消息',e,this.msg);
    //        //发送post请求提交消息信息
    //     },
    //    //输入框失去焦点时记录光标位置
    //    blurHandle() {
    //         this.getContentCursorPosition(this.$refs.msgIput); //textarea失去焦点时记录光标位置
    //         console.log('失去焦点光标位置',this.carePosition,this.msg,this.msg.length);
    //     },
        
    //    //textarea获取光标位置
    //    getCursorPosition(ctrl) {
    //         let carePos = {start: 0, end: 0};
    //         if (ctrl && ctrl.selectionStart) {
    //             carePos.start = ctrl.selectionStart;
    //         }
    //         if (ctrl && ctrl.selectionEnd) {
    //             carePos.end = ctrl.selectionEnd;
    //         }
    //         return carePos;
    //     },
    //    //设置光标位置
    //    setCursorPosition(ctrl,start,end) {
    //         ctrl.focus();
    //         /* if (ctrl && ctrl.selectionStart) {
    //             ctrl.selectionStart = start;
    //         }
    //         if (ctrl && ctrl.selectionEnd) {
    //             ctrl.selectionEnd = end || start;
    //         } */
    //         ctrl.setSelectionRange(start,end);
    //    },
    //    //光标处插入文本
    //    handleSetText(text='') {
    //         let start = this.carePosition.start;
    //         let end = this.carePosition.end;
    //         console.log(this.carePosition);
    //         this.msg = this.msg.slice(0,start) + text +this.msg.slice(end);
    //         this.$set(this.carePosition,"start",start + text.length);
    //         this.$set(this.carePosition,"end",start + text.length)
    //         //console.log(this.carePosition);
    //         //this.$nextTick(() => console.log(this.carePosition));
    //    },
    // ****************contenteditable**************************************************
        //失去焦点
        
    }
}
</script>