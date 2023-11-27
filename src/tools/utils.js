import { last } from "lodash";
import { resolve } from "../../config/webpack.dev";

//把文件按二进制读取
export function readFile(file) {
    return new Promise(resolve => {
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = ev => {
            resolve(ev.target.result);
        };
    })
}