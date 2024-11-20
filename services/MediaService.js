const youtubedl = require('youtube-dl-exec');
const path = require('path');

class VideoService {
    static async getVideoQualities(videoUrl) {
        try {
            const info = await youtubedl(videoUrl, {
                dumpSingleJson: true,
                noWarnings: true,
            });

            const formats = info.formats
                .filter((file) => file.url) // Ensure only formats with URLs are included
                .map((file) => ({
                    id: file.format_id,
                    label: file.format_note || 'Unknown',
                    resolution: file.vcodec && file.height ? `${file.height}p` : 'Audio',
                    url: file.url,
                    format: file.mimeType || 'Unknown',
                }));

            return formats;
        } catch (error) {
            console.error('Error fetching video qualities:', error);
            throw new Error('Unable to fetch video qualities. Please check the video URL.');
        }
    }

    static async getQuality(req, res, next) {
        try {
            const videoUrl = req.query.url;

            if (!videoUrl) {
                return res.status(400).json({ error: 'URL is required' });
            }

            const qualities = await VideoService.getVideoQualities(videoUrl);
            return res.status(200).json({ qualities });
        } catch (error) {
            console.error('Error in getQuality:', error);
            return res.status(500).json({ error: error.message });
        }
    }

    static async downloadVideo(videoUrl, formatId, outputDir) {
        try {
            const outputFilePath = path.join(outputDir, '%(title)s.%(ext)s');

            const output = await youtubedl(videoUrl, {
                format: formatId,
                output: outputFilePath,
            });

            console.log('Video downloaded successfully:', output);
            return output;
        } catch (error) {
            console.error('Error downloading video:', error);
            throw new Error('Video download failed. Please try again.');
        }
    }
}

module.exports = VideoService;
