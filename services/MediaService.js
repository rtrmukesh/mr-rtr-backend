const path = require('path');
const youtubedl = require('youtube-dl-exec');

class VideoService {

    static getVideoQualities(videoUrl) {
        return new Promise((resolve, reject) => {
            youtubedl(videoUrl, {
                cookies: path.resolve('./chromewebstore.google.com_cookies.txt'), // Path to your cookies file
                dumpSingleJson: true,
                noWarnings: true,
                format: 'all', // Fetch all available formats
            })
                .then((info) => {
                    console.log('Cookie path:', path.resolve('./chromewebstore.google.com_cookies.txt'));

                    const formats = info.formats
                        .filter((file) => file.url) // Ensure only formats with URLs are included
                        .map((file) => ({
                            id: file.format_id,
                            label: file.format_note || 'Unknown',
                            resolution: file.vcodec && file.height ? `${file.height}p` : 'Audio',
                            url: file.url,
                            format: file.mimeType || 'Unknown',
                        }));
                    resolve(formats);
                })
                .catch((err) => {
                    console.error('Error fetching qualities:', err);
                    reject(err);
                });
        });
    }


    // static downloadVideo(videoUrl, formatId, outputDir) {
    //     return new Promise((resolve, reject) => {
    //         const outputFilePath = path.join(outputDir, '%(title)s.%(ext)s');

    //         youtubedl(videoUrl, {
    //             format: formatId,
    //             output: outputFilePath,
    //         })
    //             .then((output) => {
    //                 console.log('Video downloaded successfully:', output);
    //                 resolve(output);
    //             })
    //             .catch((err) => {
    //                 console.error('Error downloading video:', err);
    //                 reject(err);
    //             });
    //     });
    // }

    static async getQualitiy(req, res, next) {
        let videoUrl = req.query.url;
        VideoService.getVideoQualities(videoUrl)
            .then((qualities) => {
                return res.status(200).json({ qualities });
            })
            .catch((err) => console.error('Error:', err));
    }
}

module.exports = VideoService



