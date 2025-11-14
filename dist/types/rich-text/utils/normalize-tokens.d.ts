/**
 * Copied from prism-react-renderer repo
 * https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/utils/normalizeTokens.js
 * */
import Prism from 'prismjs';
type Token = {
    types: string[];
    content: string;
    empty?: boolean;
};
export declare const normalizeTokens: (tokens: Array<Prism.Token | string>) => Token[][];
export {};
