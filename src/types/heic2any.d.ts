declare module 'heic2any' {
  interface Options {
    blob: Blob;
    toType?: 'image/jpeg' | 'image/png';
    quality?: number;
  }

  function heic2any(options: Options): Promise<Blob | Blob[]>;
  export default heic2any;
}
