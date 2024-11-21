const ytdlp = require('yt-dlp-exec');

class MediaService {
    static async getQualitiy(req, res, next) {
        const videoUrl = req.query.url;
        try {
            const output = await ytdlp(videoUrl, {
                dumpSingleJson: true,
                noWarnings: true,
                noCallHome: true,
                format: 'bestaudio/best'
            });
            const qualities = output.formats.map(file => ({
                id: file.format_id,
                label: file.format_note,
                resolution: file.height ? `${file.height}p` : 'Audio',
                url: file.url
            }));
            res.status(200).json({ qualities });
        } catch (error) {
            console.error('Error:', error);
            res.json(400, 'Error fetching qualities');
        }

    }
}

module.exports = MediaService;