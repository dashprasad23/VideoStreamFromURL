import axios from "axios";
import { Request, Response } from "express";

class VideoStreamControler {
  url: string;
  size: number;
  range: string;
  start: number;
  end: number;

  async stream(req: Request, res: Response) {
    const qparam = req.query as { url: string; size: string };
    this.size = parseInt(qparam.size);
    this.url = qparam.url;
    this.range = req.headers.range as string;
    const contentLength: number = this.getStreamContentLength();
    try {
      res.writeHead(206, this.getStreamRequestHeader(contentLength));
      const { data: videoData } = await axios.get(
        this.url,
        this.responseHeader()
      );
      videoData.pipe(res);
    } catch (err) {
        console.log(err)
      res.status(401).send("Err");
    }
  }

  /**
   *   create the request header for axios
   * @param contentLength
   * @returns
   */
  getStreamRequestHeader(contentLength: number) {
    return {
      "Content-Range": `bytes ${this.start} - ${this.end}/${this.size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
  }

  responseHeader(): any {
    var options = {
      headers: {
        range: "bytes=" + this.start + "-" + this.end,
        connection: "keep-alive",
      },
      responseType: "stream",
    };

    return options;
  }

  /**
   *  generate the stream content length
   * @returns
   */
  getStreamContentLength(): number {
    const CHUNK_SIZE = 10 ** 6;
    const CHUNK_RANGE= this.range.split("=")[1].split("-");
    this.start = Number(CHUNK_RANGE[0]);
    this.end = CHUNK_RANGE[1]? Number(CHUNK_RANGE[1]) :Math.min(this.start + CHUNK_SIZE, this.size - 1);
    const contentLength = this.end - this.start + 1;
    return contentLength;
  }
}

export default VideoStreamControler;
