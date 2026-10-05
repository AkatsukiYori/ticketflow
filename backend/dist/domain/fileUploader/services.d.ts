export declare const FileUploaderServices: (file: Express.Multer.File, module: string, mode: string, document: number) => Promise<{
    message: string;
    savedFile?: never;
} | {
    savedFile: any;
    message?: never;
}>;
export declare const FileRevertServices: (document: number, module: string) => Promise<null | undefined>;
//# sourceMappingURL=services.d.ts.map