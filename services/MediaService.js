const ytdl = require('ytdl-core');
const { URL } = require('url'); // Import URL module to manipulate the URL

class MediaService {
    static async getQualitiy(req, res, next) {
        let videoUrl = req.query.url;
        if (!videoUrl) {
            return res.status(400).json({ error: 'URL parameter is required' });
        }

        try {
            // Modify the URL to include the 'c' and 'cver' parameters
            const url = new URL(videoUrl);  // Create a URL object to manipulate the URL
            url.searchParams.set('c', 'TVHTML5');  // Set the 'c' parameter
            url.searchParams.set('cver', '7.20190319');  // Set the 'cver' parameter

            // Get video info using ytdl-core with the modified URL
            const info = await ytdl.getInfo(url.toString(), {
                requestOptions: {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
                    }
                }
            });

            // Check if formats are available
            if (!info || !info.formats || info.formats.length === 0) {
                return res.status(500).json({ error: 'No formats found for the video' });
            }

            // Extract video qualities from formats
            const qualities = info.formats.map(file => ({
                id: file.itag,
                label: file.format_note,
                resolution: file.hasVideo ? `${file.height}p` : 'Audio',
                url: file.url,
                format: file.mimeType
            }));

            return res.status(200).json({ qualities });
        } catch (error) {
            console.error('Error fetching video info:', error);
            return res.status(500).json({ error: 'Error fetching video qualities', details: error.message });
        }
    }
}

module.exports = MediaService;
