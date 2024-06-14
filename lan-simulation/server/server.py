import json
import os
from flask import Flask, Response, jsonify, send_from_directory
from flask_cors import CORS
import m3u8

app = Flask(__name__)
CORS(app)

@app.route('/stream.m3u8')
def stream():
    static_dir = os.path.join(app.root_path, 'static')
    os.makedirs(static_dir, exist_ok=True)

    # Load the local playlist file
    playlist_path = os.path.join(static_dir, 'stream.m3u8')
    playlist = m3u8.load(playlist_path)

    return Response(playlist.dumps(), mimetype='application/vnd.apple.mpegurl')

@app.route('/video/<path:folder>/<path:filename>')
def stream_video_hls(folder, filename):
    return send_from_directory('static/video/',os.path.join(folder, filename))

@app.route('/videos')
def get_videos():
    videos_dir = os.path.join(app.root_path, 'videos')
    video_files = [f for f in os.listdir(videos_dir) if f.endswith('.json')]  # List of JSON files in videos directory
    videos = []

    # Read each JSON file and append its contents to the videos list
    for file in video_files:
        file_path = os.path.join(videos_dir, file)
        with open(file_path, 'r') as f:
            video_data = json.load(f)
            videos.append(video_data)

    return jsonify(videos)


@app.route('/video-metadata/<path:video_id>')
def get_video(video_id):
    try:
        with open(os.path.join(app.root_path, "videos", f'{video_id}.json'), 'r') as f:
                video_data = json.load(f)
                return jsonify(video_data)
    except Exception as e:
        return jsonify("Ressource not found.")


@app.route('/images/<path:filename>')
def get_image(filename):
    return send_from_directory('images', filename)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
