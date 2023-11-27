<template>
    <div class="admin-course">
        <el-button @click="clickHandle">新建课程</el-button>
        <div class="upload-file">
            <uploadBigFile></uploadBigFile>
        </div>
        <video src="/public/uploads/魔女-2018_BD韩语中字.mp4"
            poster="http://localhost:3001/static/img/home/3.jpg"
            preload="auto"
            width="500px"
            controls
            ref="videoRef"
            playsinline
            webkit-playsinline
            muted
        ></video>
        <div id="xg-player"></div>
    </div>
</template>
<script>
import uploadBigFile from '../../../components/uploadBigFile.vue';
import xgPlayer from 'xgplayer';
export default {
    components: { uploadBigFile },
    data() {
        return {
            chunksize: 10,
        }
    },
    mounted() {
        const videoDom = this.$refs.videoRef;
        //videoDom.src = 'https://xxx.mp4';
        videoDom.load();
        videoDom.addEventListener('canplay', this.canPlayVideo);
        this.initPlayer();
    },
    methods: {
        clickHandle() {
            let url = this.$router.resolve({
                path:'/admin/course/create'
            });
            window.open(url.href,'_blank');
        },
        canPlayVideo() {
            const videoDom = this.$refs.videoRef;
            if (!videoDom) return;
            /* if (videoDom.currentTime > 0) {
                videoDom.currentTime = 0;
            } */
            videoDom.currentTime = 60 * 30;
            videoDom.play();
            /* this.videoLoading = false;
            this.isPaused = videoDom.paused;  */// 后续 UI 样式
            videoDom.removeEventListener('canplay', this.canPlayVideo);
        },
        initPlayer() {
            const config = {
            id: 'xg-player',
            url: '/public/uploads/魔女-2018_BD韩语中字.mp4',
            width: 600,
          };
            const player = new xgPlayer(config);


        }
    }
}
</script>