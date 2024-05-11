import json
import os
import pathlib
import subprocess
import uuid
from flask import Flask, jsonify, send_file, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/demos')
def get_demos():
    try:
        # Read the contents of "demo.json"
        with open('demos.json', 'r') as file:
            demos = json.load(file)
        # Return the contents as JSON
        return jsonify(demos)
    except FileNotFoundError:
        return jsonify({'error': 'demos.json not found'}), 404

@app.route('/demos/<int:demo_id>')
def get_demo(demo_id):
    try:
        # Read the contents of "demos.json"
        with open('demos.json', 'r') as file:
            demos = json.load(file)
        # Search for the demo with the corresponding ID
        for demo in demos:
            if demo.get('id') == demo_id:
                return jsonify(demo)
        # Return an error if the demo with the specified ID is not found
        return jsonify({'error': f'Demo with ID {demo_id} not found'}), 404
    except FileNotFoundError:
        return jsonify({'error': 'demos.json not found'}), 404
    
    
@app.route('/basic-xor-2-receivers', methods=['POST'])
def run_process_2_rec():
    id = str(uuid.uuid1())
    print(id)
    # Define the command to run
    command = ['python3', './basic-xor-2-receivers/main.py', '-id', id]
    try:
        subprocess.run(command)
        return jsonify({'simulation_id': id}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
       
@app.route('/basic-xor-3-receivers', methods=['POST'])
def run_process_3_rec():
    id = str(uuid.uuid1())
    print(id)
    # Define the command to run
    command = ['python3', './basic-xor-3-receivers/main.py', '-id', id]
    try:
        subprocess.run(command)
        return jsonify({'simulation_id': id}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/video-xor-2-receivers', methods=['POST'])
def run_process_2_rec_video():
    id = str(uuid.uuid1())
    # Define the command to run
    command = ['python3', './video-xor-2-receivers/main.py', '-id', id]
    try:
        subprocess.run(command)
        return jsonify({'simulation_id': id}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/simulations/<simulation_id>')
def get_simulation(simulation_id):
    try:
        # Read the contents of "demos.json"
        script_dir = pathlib.Path(__file__).parent
        simulations_folder = script_dir / "simulations"
        simulation_path = os.path.join(simulations_folder, f'{simulation_id}.json')
        with open(simulation_path, 'r') as file:
            simulation = json.load(file)
        return jsonify(simulation), 200
    except FileNotFoundError:
        return jsonify({'error': f'{simulation_id}.json not found'}), 404
    
@app.route('/simulations')
def get_simulations():
    try:
        simulations = []
        script_dir = pathlib.Path(__file__).parent
        simulations_folder = script_dir / "simulations"
        
        # Iterate over all files in the simulations directory
        for filename in os.listdir(simulations_folder):
            if filename.endswith(".json"):
                with open(os.path.join(simulations_folder, filename), 'r') as file:
                    simulation_data = json.load(file)
                    simulations.append(simulation_data)
        
        return jsonify(simulations), 200
    except FileNotFoundError:
        return jsonify({'error': 'simulations folder not found'}), 404
    
@app.route('/status')
def status():
    return jsonify({"status": "running"})

@app.route('/images/<path:filename>')
def get_image(filename):
    # Construct the path to the image file
    image_path = os.path.join("images", filename)
    
    # Check if the file exists
    if os.path.isfile(image_path):
        # Return the image file
        return send_file(image_path, mimetype='image/jpeg')
    else:
        # Return a 404 error if the file doesn't exist
        abort(404)

@app.route('/videos/<path:filename>')
def get_video(filename):
    # Construct the path to the image file
    video_path = os.path.join("videos", filename)
    
    # Check if the file exists
    if os.path.isfile(video_path):
        # Return the image file
        return send_file(video_path, mimetype='video/mp4')
    else:
        # Return a 404 error if the file doesn't exist
        abort(404)
if __name__ == '__main__':
    app.run(debug=True)
