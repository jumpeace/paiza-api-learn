import {File, Arg} from './base.mjs';
import paizaExec from './paiza.mjs';

const arg = new Arg(2);

const sourceCode = new File('data/source_code.txt').read();
const input = new File('data/input.txt').read();

const result = await paizaExec(arg.get(0), sourceCode, input, arg.get(1) ?? 2);
console.log(result.output);