import { postData, getData } from './fetch.mjs';
import { performance } from 'perf_hooks';

const create = async (language, sourceCode, input) => {
    const url = "http://api.paiza.io:80/runners/create";
    const data = {
        source_code: sourceCode,
        language: language,
        input: input,
        api_key: "guest",
    };
    return await postData(url, data);
}

const getStatus = async (sessionId) => {
    const url = `http://api.paiza.io/runners/get_status?id=${sessionId}&api_key=guest`;
    return await getData(url);
}

const getDetails = async (sessionId) => {
    const url = `http://api.paiza.io/runners/get_details?id=${sessionId}&api_key=guest`;
    return await getData(url);
}

export default async (language, sourceCode, input, limitTime) => {
    const createResult = await create(language, sourceCode, input);
    
    let isTimeOver = false;

    // 処理が完了するか制限時間を超すまで待つ
    const startTime = performance.now(); // 開始時間
    while(true) {
        const getStatusResult = await getStatus(createResult['id']);

        // 処理が完了した場合
        if (getStatusResult.status === 'completed') {
            break;
        }

        const endTime = performance.now(); // 終了時間
        // 制限時間を越した場合
        if (endTime - startTime >= limitTime * 1000) {
            isTimeOver = true;
            break;
        }
    }
    
    const getDetailsResult = await getDetails(createResult['id']);
    
    let output;
    if (isTimeOver) getDetailsResult.result = 'time_over';

    switch(getDetailsResult.result) {
        case 'success':
            output = getDetailsResult.stdout;
            break;
        case 'failure':
            output = getDetailsResult.stderr;
            break;
        case 'time_over':
            output = "処理時間の上限を超えました。";
            break;
        default:
            output = "不明なエラー";
    }

    return {
        'result': getDetailsResult.result === 'success',
        'output': output,
    }
}