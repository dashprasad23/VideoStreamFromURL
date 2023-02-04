import { NextFunction, Request, Response, Router } from "express";
import VideoSteamControler from "../controler/videoSteam.controler";
class VideoStreamRoute {
   router: Router;
   videoSteamControler: VideoSteamControler;
    constructor() {
      this.router = Router();
      this.videoSteamControler = new VideoSteamControler();
      this.createVideoStreamRoute();
    }


    createVideoStreamRoute() {
      this.router?.get('/',this.validateQueryParam,(req,res)=> {
        this.videoSteamControler.stream(req,res);
      })
    }


    validateQueryParam(req: Request,res: Response,next: NextFunction) {

        const headers = req.headers;
        //console.log(headers.range,"===========")
        const qparam = req.query as {url: string, size: string};
        const url:string = qparam.url;
        const size: number = parseInt(qparam.size);
        if(!size && !url) {
            res.status(400).send("Require video URL and size in query param")
        } else if(!headers.range) {
            res.status(400).send("Require range header")
        } else {
            next();
        }

     }

}

export default new VideoStreamRoute();