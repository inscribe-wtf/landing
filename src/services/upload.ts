import { Web3Storage } from "web3.storage";

const client = new Web3Storage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU5MTUwRDJGNjVBNzBjQjJFOGEwZjY3QjM2NDM0ZTk2NTA1YjYzOTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzYzOTQwOTYxODUsIm5hbWUiOiJpbnNjcmliZSJ9.YvGCTGJpUGtiF0jywsaPtTfurYXW8i9vH1rZMcghGco",
});

export async function uploadFolder(files: File[]) {
  // show the root cid as soon as it's ready
  const onRootCidReady = (cid: string) => {
    console.log("uploading files with cid:", cid);
  };

  // when each chunk is stored, update the percentage complete and display
  const totalSize = files.map((f) => f.size).reduce((a, b) => a + b, 0);
  let uploaded = 0;

  const onStoredChunk = (size: number) => {
    uploaded += size;
    const pct = 100 * (uploaded / totalSize);
    console.log(`Uploading... ${pct.toFixed(2)}% complete`);
  };
  // client.put will invoke our callbacks during the upload
  // and return the root cid when the upload completes
  const cid = await client.put(files, { onRootCidReady, onStoredChunk });
  console.log("Upload complete! CID:", cid);
  return `https://${cid}.ipfs.w3s.link/`;
}

export const convertBase64 = (file: any): any => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
