const { exec } = require('child_process');
const path = require('path');

class MediaService {
    static async getQualitiy(req, res, next) {
        const videoUrl = req.query.url;
        if (!videoUrl) {
            return res.status(400).json({ error: 'URL parameter is required' });
        }

        // Build yt-dlp command
        const command = `yt-dlp -J --no-warnings --no-call-home --format bestaudio/best ${videoUrl}`;

        // Execute the yt-dlp command
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Error executing yt-dlp:', error);
                return res.status(500).json({ error: 'Error fetching video qualities', details: error.message });
            }

            if (stderr) {
                console.error('yt-dlp stderr:', stderr);
            }

            try {
                const output = JSON.parse(stdout);
                if (!output || !output.formats || output.formats.length === 0) {
                    return res.status(500).json({ error: 'No formats found for the video' });
                }

                // Extract video qualities
                const qualities = output.formats.map(file => ({
                    id: file.format_id,
                    label: file.format_note,
                    resolution: file.height ? `${file.height}p` : 'Audio',
                    url: file.url
                }));

                return res.status(200).json({ qualities });

            } catch (parseError) {
                console.error('Error parsing yt-dlp output:', parseError);
                return res.status(500).json({ error: 'Error parsing yt-dlp output' });
            }
        });
    }
}

module.exports = MediaService;
