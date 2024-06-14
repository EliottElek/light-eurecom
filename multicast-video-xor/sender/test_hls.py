import os
import subprocess
from pathlib import Path

def segment_video(file_path, output_dir, segment_time=10):
    """Segment the video into HLS chunks using ffmpeg."""
    try:
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        # Segment the video using ffmpeg
        subprocess.run([
            'ffmpeg', '-i', file_path,
            '-hls_time', str(segment_time),
            '-hls_playlist_type', 'vod',
            f'{output_dir}/index.m3u8'
        ], check=True)
        
        print(f"Video segmented into {output_dir} successfully.")
        
    except subprocess.CalledProcessError as e:
        print("[Error] Unable to segment video:", str(e))

def list_hls_chunks(output_dir):
    """List all HLS chunks in the given directory."""
    chunk_files = []
    for file in os.listdir(output_dir):
        if file.endswith(".ts"):
            chunk_files.append(os.path.join(output_dir, file))
    return sorted(chunk_files)

def xor_files(file1, file2, output_file):
    """Perform XOR operation on two files and save the result."""
    with open(file1, 'rb') as f1, open(file2, 'rb') as f2, open(output_file, 'wb') as out:
        f1_bytes = f1.read()
        f2_bytes = f2.read()
        out_bytes = bytes(a ^ b for a, b in zip(f1_bytes, f2_bytes))
        out.write(out_bytes)

def main():
    video1_path = "video1.mp4"
    video2_path = "video2.mp4"
    output_dir1 = "video1_hls"
    output_dir2 = "video2_hls"

    # Segment the original videos
    segment_video(video1_path, output_dir1, segment_time=1)
    segment_video(video2_path, output_dir2, segment_time=1)

    # List all HLS chunks
    video1_chunks = list_hls_chunks(output_dir1)
    video2_chunks = list_hls_chunks(output_dir2)

    # Ensure the number of chunks are the same for both videos
    if len(video1_chunks) != len(video2_chunks):
        print("[Error] Number of HLS chunks do not match between the two videos.")
        return

    # XOR chunks and save the results
    coded_chunks_dir = "coded_hls_chunks"
    if not os.path.exists(coded_chunks_dir):
        os.makedirs(coded_chunks_dir)
    
    coded_chunks = []
    for i, (chunk1, chunk2) in enumerate(zip(video1_chunks, video2_chunks)):
        coded_chunk_path = os.path.join(coded_chunks_dir, f"coded_chunk_{i}.ts")
        xor_files(chunk1, chunk2, coded_chunk_path)
        coded_chunks.append(coded_chunk_path)

    print("Coded HLS chunks created successfully.")

if __name__ == "__main__":
    main()
