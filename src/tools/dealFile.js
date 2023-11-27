import md5 from 'js-md5' //引入MD5加密
import HttpManager from '@/api/getData';

export const uploadByPieces = (file,pieceSize = 3) => {
    let fileType = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length);
    let chunkSize = 3 * 1024 * 1024;
    let chunkCount = Math.ceil(file.size / chunkSize);
    let chunkList = [];
    let updated = [];
    let render = new FileReader();
    render.readAsBinaryString(file);
   /*  render.addEventListener('load',(e) => 
    }); */
    render.onload = (e) => {
        let fileBolb = e.target.result;
        let fileMD5 = md5(fileBolb);
        let params = {params: {
            filename: file.name,
            identifier: fileMD5,
            objectType: fileType
        }}
        console.log(params);
        //请求服务端判断文件是否上传，已上传：返回文件地址，断电续传返回已上传列表
        HttpManager.getFileExist(params).then((res) => {
            console.log(res);
            
        });

        //readChunkMD5(file,chunkCount, chunkSize);
    }
}



//读取二进制文件
export const fileToBolb = (file) => {
    return new Promise((resolve, reject) => {
        let render = new FileReader();
        render.readAsBinaryString(file);
      /*   render.addEventListener('load',(e) => {

        }) */
        render.onload = (e) => {
            let fileBolb = e.target.result;
            if (fileBolb) {
                resolve(fileBolb);
            } else {
                reject('文件读取失败')
            }
        }
    })
};

/***
   * 获取每一个分片的详情
   **/
export const getChunkInfo = (file, currentChunk, chunkSize) => {
    let start = currentChunk * chunkSize
    let end = Math.min(file.size, start + chunkSize)
    let chunk = file.slice(start, end)
    return {
      start,
      end,
      chunk
    }
};

/***
   * 针对每个文件进行chunk处理
   **/
const readChunkMD5 = (file,chunkCount, chunkSize) => {
    // 针对单个文件进行chunk上传
    for (var i = 0; i < chunkCount; i++) {
      const {
        chunk
      } = getChunkInfo(file, i, chunkSize)
 
      // 判断已经上传的分片中是否包含当前分片
      if (uploaded.indexOf(i + '') == -1) {
        uploadChunk({
          chunk,
          currentChunk: i,
          chunkCount
        })
      }
    }
};

/***
   * 原始上传
   **/
export const uploadChunk = (chunkInfo) => {
    var sd = parseInt((chunkInfo.currentChunk / chunkInfo.chunkCount) * 100);
    console.log(sd, '进度');
    //process(sd)     //进度条
    console.log(chunkInfo, '分片大小');
    //let inde = chunkInfo.currentChunk + 1;
    var index = file.name.lastIndexOf('.')
    var tp = file.name.substring(index + 1, file.name.length)
    // 构建上传文件的formData
    let fetchForm = new FormData()
    fetchForm.append('identifier', fileMD5)
    fetchForm.append('chunkNumber', chunkInfo.currentChunk + 1)
    fetchForm.append('chunkSize', chunkSize)
    fetchForm.append('currentChunkSize', chunkInfo.chunk.size)
    const chunkfile = new File([chunkInfo.chunk], file.name)
    fetchForm.append('file', chunkfile)
    // fetchForm.append('file', chunkInfo.chunk)
    fetchForm.append('filename', file.name)
    fetchForm.append('relativePath', file.name)
    fetchForm.append('totalChunks', chunkInfo.chunkCount)
    fetchForm.append('totalSize', file.size)
    fetchForm.append('objectType', tp)
    // 执行分片上传
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    }
    //上传分片 成功 添加到已上传列表中，判断是否全部上传完
    HttpManager.postChunkFile(fetchForm).then((res) => {
        console.log(1111)
    })
}

