import { FileWithPath } from "react-dropzone";

export interface signUrl {
    filePath: string
    destination: string
}

export interface FileData {
    file: FileWithPath;
    dest: string;
    signUrl?: signUrl;
  }