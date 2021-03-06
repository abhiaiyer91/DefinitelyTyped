// Type definitions for sass 1.15
// Project: https://github.com/sass/dart-sass
// Definitions by: Silas Rech <https://github.com/lenovouser>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

/// <reference types="node" />

export type ImporterReturnType = { file: string } | { contents: string } | Error | null;

export type Importer = (url: string, prev: string, done: (data: ImporterReturnType) => void) => ImporterReturnType | void;

export interface Options {
    /**
     * Path to a file to compile.
     *
     * @default null
     */
    file?: string;

    /**
     * A string to pass to compile.
     *
     * It is recommended that you use `includePaths` in conjunction with this so that sass can find files when using the @import directive.
     *
     * @default null
     */
    data?: string;

    /**
     * Handles when the @import directive is encountered.
     *
     * A custom importer allows extension of the sass engine in both a synchronous and asynchronous manner.
     *
     * @default undefined
     */
    importer?: Importer | Importer[];

    /**
     * Holds a collection of custom functions that may be invoked by the sass files being compiled.
     *
     * @default undefined
     */
    functions?: { [key: string]: () => void };

    /**
     * An array of paths that should be looked in to attempt to resolve your @import declarations.
     * When using `data`, it is recommended that you use this.
     *
     * @default []
     */
    includePaths?: string[];

    /**
     * Enable Sass Indented Syntax for parsing the data string or file.
     *
     * @default false
     */
    indentedSyntax?: boolean;

    /**
     * Used to determine whether to use space or tab character for indentation.
     *
     * @default 'space'
     */
    indentType?: 'space' | 'tab';

    /**
     * Used to determine the number of spaces or tabs to be used for indentation.
     *
     * @default 2
     */
    indentWidth?: number;

    /**
     * Used to determine which sequence to use for line breaks.
     *
     * @default 'lf'
     */
    linefeed?: 'cr' | 'crlf' | 'lf' | 'lfcr';

    /**
     * Disable the inclusion of source map information in the output file.
     *
     * @default false
     */
    omitSourceMapUrl?: boolean;

    /**
     * Specify the intended location of the output file.
     * Strongly recommended when outputting source maps so that they can properly refer back to their intended files.
     *
     * @default null
     */
    outFile?: string;

    /**
     * Determines the output format of the final CSS style.
     *
     * @default 'expanded'
     */
    outputStyle?: 'compressed' | 'expanded';

    /**
     * Enables the outputting of a source map.
     *
     * @default undefined
     */
    sourceMap?: boolean | string;

    /**
     * Includes the contents in the source map information.
     *
     * @default false
     */
    sourceMapContents?: boolean;

    /**
     * Embeds the source map as a data URI.
     *
     * @default false
     */
    sourceMapEmbed?: boolean;

    /**
     * The value will be emitted as `sourceRoot` in the source map information.
     *
     * @default undefined
     */
    sourceMapRoot?: string;
}

export interface SassException extends Error {
    /**
     * The error message.
     */
    message: string;

    /**
     * The line number of error.
     */
    line: number;

    /**
     * The column number of error.
     */
    column: number;

    /**
     * The status code.
     */
    status: number;

    /**
     * The filename of error.
     *
     * In case file option was not set (in favour of `data`), this will reflect the value `stdin`.
     */
    file: string;
}

export interface Result {
    /**
     * The compiled CSS.
     *
     * Write this to a file, or serve it out as needed.
     */
    css: Buffer;

    /**
     * The source map.
     */
    map?: Buffer;
    stats: {
        /**
         * The path to the scss file, or `data` if the source was not a file.
         */
        entry: string;

        /**
         * `Date.now()` before the compilation.
         */
        start: number;

        /**
         * `Date.now()` after the compilation.
         */
        end: number;

        /**
         * `end - start`
         */
        duration: number;

        /**
         * Absolute paths to all related files in no particular order.
         */
        includedFiles: string[];
    };
}

export function render(options: Options, callback: (exception: SassException, result: Result) => void): void;
export function renderSync(options: Options): Result;
