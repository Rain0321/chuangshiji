<template>
    <div class="part-input">
        <div class="input-field-tool_emoji" @click="isShowEmoji = !isShowEmoji"></div>
        <div class="emoji-choose" v-show="isShowEmoji"  @blur="isShowEmoji = false">
            <span v-for="item in emoji" :key="item.id" @click="chooseHandle(item.emojiText)">{{item.emojiText}}</span>
        </div>
        <!-- v-html="msg" 
        @input="msg=$event.target.innerHTML" -->
        <div class="send-box" ref="msgIput" 
            contenteditable="true" 
            @blur="blurHandle" 
            @click="focusHandle"
            @paste="pasteHandle"
            @copy="copyHandle"
            @keyup="keyupHandel"
            >
        </div>
        <!-- <textarea name="" id="" v-model="msg" @keyup.enter="sendMsg" @blur="blurHandle" ref="msgIput" @focus="focusHandle"></textarea> -->
        <div class="send-btn">
            <input type="button" value="发送" @click="sendMsg">
        </div>
    </div>
</template>
<style lang="scss" scoped>
.part-input {
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
</style>
<script>
export default {
    data() {
        return {
            isShowEmoji: false,
            emoji: [ 
                {id:1,text:"开心",emojiText: "😄"}, 
                {id:2,text:"开心",emojiText: "😆"},
                {id:3,text:"开心",emojiText: "😊"},
                {id:4,text:"开心",emojiText: "😃"},
                {id:5,text:"开心",emojiText: "😏"},
                {id:6,text:"开心",emojiText: "😍"},
                {id:7,text:"开心",emojiText: "😘"},
                {id:8,text:"开心",emojiText: "😚"},
                {id:9,text:"开心",emojiText: "😳"},
                {id:10,text:"开心",emojiText: "😌"},
                {id:11,text:"开心",emojiText: "😆"},
                {id:12,text:"开心",emojiText: "😁"},
                {id:13,text:"开心",emojiText: "😉"},
                {id:14,text:"开心",emojiText: "😝"},
                {id:15,text:"开心",emojiText: "😀"},
                {id:16,text:"开心",emojiText: "😗"},
                {id:17,text:"开心",emojiText: "😙"},
                {id:18,text:"开心",emojiText: "😛"},
                {id:19,text:"开心",emojiText: "😴"},
                {id:20,text:"开心",emojiText: "😟"},
                {id:21,text:"开心",emojiText: "😡"},
                {id:22,text:"开心",emojiText: "👿"},
                {id:23,text:"开心",emojiText: "😦"},
                {id:24,text:"开心",emojiText: "💛"}
            ],
            msg: '你好',
            carePosition: {start: 0, end: 0},
            //contenteditabled编辑框的光标位置
            winFouce: '',
            rangeFouce: ''
        }
    },
    mounted() {
        this.toLast(this.$refs.msgIput);
        document
            .getElementsByClassName('page-chart')[0]
            .addEventListener('click', this.setHideClick);
        this.$once('hook:beforeDestroy',() => {
            document.getElementsByClassName('page-chart')[0] &&
            document
                .getElementsByClassName('page-chart')[0]
                .removeEventListener('click',this.setHideClick);
        })   
    },
    methods: {
        blurHandle(e) {
            this.getContentCursorPosition();
            // console.log(this.winFouce,this.rangeFouce);
        },
        //获取焦点时的操作
        focusHandle(e) {
            this.getContentCursorPosition();
            //console.log(this.winFouce,typeof(this.rangeFouce));
        },
        chooseHandle(e) {
            /* if (typeof(this.rangeFouce) !== 'object') {
                
            } */
            this.isShowEmoji = false;
            this.insertText(e);
            //console.log("插入表情",typeof(e));
        },
        //发送消息
        sendMsg() {
            let msg = this.$refs.msgIput.innerHTML;
            this.$socket.emit('hello',msg);
            console.log('发送消息',msg,msg.length);
            this.$refs.msgIput.innerHTML = '';
        },
        //监听按键
       keyupHandel(e) {
            // e.preventDefault();
            if ( e.key === 'Enter') {
                e.preventDefault();
                this.sendMsg();
            }
            if (e.key === 'ArrowDown' || 
                e.key === 'ArrowRight' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowUp') {
                    this.getContentCursorPosition();
                }
           //发送post请求提交消息信息
        },
        toLast(obj) {
          // 将光标移到最后，obj为输入框节点
          if (window.getSelection) {
            let winSel = window.getSelection(); 
            winSel.selectAllChildren(obj);
            winSel.collapseToEnd();
          }
        },
        setHideClick(event) {
            let target = event.srcElement;
            let nameList = ['input-field-tool_emoji','emoji-choose'];
            if (
                !nameList.includes(target.className) &&
                !nameList.includes(target.parentElement.className)
            ) {
                this.isShowEmoji = false;
            }
        },
        //粘贴图片处理
        pasteHandle(e) {
            e.preventDefault();
            //const text = await this.onPaste();
            let clipboardData = e.clipboardData;
            for (let i = 0, len = clipboardData.items.length; i < len; i++) {
                const item = clipboardData.items[i];
                if (item.type === 'text/plain') {
                    //let text = clipboardData.getData('text/plain');
                    //this.insertText(text);
                    //console.log(text);
                    item.getAsString((str) => {
                        this.insertText(str);

                    })
                } else if (item.type === 'image/png') {
                    let file = item.getAsFile();
                    const reader = new FileReader(file);
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        let imgURL = reader.result;
                        //let imgNode = document.createElement('img');
                        let imgNode = new Image();
                        imgNode.src = imgURL;
                        this.insertText(imgNode);
                        this.setImgWH(imgNode,200);
                    };
                } else {
                    item.getAsString((str) => {
                        console.log('复制html类型',str);

                    })
                }
            }
            //console.table(clipboardData);
            
        },
        //根据可显示最大宽度设置图片的宽高
        setImgWH (img,maxwidth) {
            img.onload = () => {
                            if (img.width > maxwidth) {
                                const proportion = img.width / img.height
                                const height = 200 / proportion
                                img.width = maxwidth;
                                img.height = height;
                            }
                            console.log(img.width,img.height);
                        }
        },
        //复制
        async copyHandle(e) {
            let clipboardData = e.clipboardData || window.clipboardData;
		    // 如果 未复制或者未剪切，直接 return 
		    if(!clipboardData) return ;
		    // Selection 对象 表示用户选择的文本范围或光标的当前位置。
		    // 声明一个变量接收 -- 用户输入的剪切或者复制的文本转化为字符串
		    let text = window.getSelection().toString();
            console.log(text);
            if(text){
			    // 如果文本存在，首先取消默认行为
			    e.preventDefault();
			    // 通过调用 clipboardData 对象的 setData(format,data) 方法，设置相关文本 
			    // format 一个 DOMString 类型 表示要添加到 drag object 的拖动数据的类型
			    // data 一个 DOMString 表示要添加到 drag object 的数据
                text += '\r\n追加内容'
			    clipboardData.setData('text/plain', text)
		    }
        },

       //contentditable 获取光标位置的
       getContentCursorPosition() {
            this.winFouce = window.getSelection(); //获取文本范围
            this.rangeFouce = this.winFouce.getRangeAt(0);
        },
        //插入内容
        insertText(text) {
            let selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(this.rangeFouce);
            let range = selection.getRangeAt(0);
            let textNode = range.startContainer;
            console.log(textNode);
                //文本节点插入内容
                let start = range.startOffset;
                if (textNode.nodeType === 3 && text !== '' && typeof(text) == 'string') {
                    textNode.insertData(start, text) //向文本、注释节点插入数据
                    console.log('点击插入表情',textNode,start);
                    range.setStart(textNode,start+text.length); //设置光标位置
                } 
                if (textNode.nodeType === 3 && text !== '' && typeof(text) == 'object') {
                    range.insertNode(text);
                    range.setEndAfter(text);
                    selection.collapseToEnd();
                }
                if (textNode.nodeType === 1 && text !== '' && typeof(text) == 'string') {
                    let  insertNode = document.createTextNode(text);
                    range.insertNode(insertNode); 
                    range.setStart(textNode,start+1); //设置光标位置
                } 
                if (textNode.nodeType === 1 && text !== '' && typeof(text) == 'object') {
                    range.insertNode(text);
                    range.setEndAfter(text);
                    selection.collapseToEnd();
                }
        }
    }
}
</script>