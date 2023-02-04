# VideoStreamFromURL
This application is all about streaming video from video URL 
---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

## Install

    $ git clone https://github.com/dashprasad23/VideoStreamFromURL.git
    $ cd VideoStreamFromURL
    $ npm install
## Running the project
    For Developement
    $ npm run start:dev
    For production
    $ npm run start:prod

## streaming video
   After you start the project 
   pest the URL in src of HTML video tag
   the URL format should be like this
   http://localhost:[PORT]/api/video?url=[Your video file URL(s3 bucket URL)]&size=[size of video file in bytes]

