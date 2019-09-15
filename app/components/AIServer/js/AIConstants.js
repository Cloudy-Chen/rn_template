import {SCREEN_WIDTH,SCREEN_HEIGHT} from "../../../utils/tools";
import {AudioUtils} from "react-native-audio";
/**
 * AIConstants.js
 */

export default {
    SCREEN_HEIGHT : SCREEN_HEIGHT,
    SCREEN_WIDTH : SCREEN_WIDTH,
    RecordPathOption:{
        SampleRate: 16000.0, //采样率
        Channels: 1, //通道
        AudioQuality: 'High', //音质
        AudioEncoding: 'aac', //音频编码
        OutputFormat: 'mpeg_4', //输出格式
        MeteringEnabled: false, //是否计量
        MeasurementMode: false, //测量模式
        AudioEncodingBitRate: 32000, //音频编码比特率
        IncludeBase64: true, //是否是base64格式
        AudioSource: 0, //音频源
    },
    audioPath:AudioUtils.DocumentDirectoryPath + '/record.aac',
    request_Record_Permission: "请前往设置开启录音权限",
    is_recording:"正在录音中...",
    convert_fail:"转换失败",
    convert_success:"转换成功",
}
