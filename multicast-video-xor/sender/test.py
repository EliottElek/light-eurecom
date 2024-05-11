import os

def xor_chunks(chunk1, chunk2):
    """Perform XOR operation between two chunks."""
    return bytes(a ^ b for a, b in zip(chunk1, chunk2))

def split_video(file_path):
    """Split the video into 2 equal-sized chunks."""
    try:
        # Open the video file
        video = open(file_path, 'rb')

        # Get the size of the video file
        video_size = os.path.getsize(file_path)

        # Calculate chunk size
        chunk_size = video_size // 2

        # Read and return video chunks
        chunks = []
        for i in range(2):
            chunk = video.read(chunk_size)
            chunks.append(chunk)

        # Close the video file
        video.close()

        return chunks

    except Exception as e:
        print("[Error] Unable to split video:", str(e))
        return None

def code_chunks(chunk1, chunk2):
    """Code two chunks together using XOR."""
    return xor_chunks(chunk1, chunk2)

def decode_received_file(received_file, cached_chunk):
    """Decode the received file using XOR with a cached chunk."""
    return xor_chunks(received_file, cached_chunk)

def save_video_file(file_path, data):
    """Save the video file."""
    with open(file_path, "wb") as file:
        file.write(data)
        
def save_cache_to_file(cache, file_path):
    """Save cache to a text file."""
    with open(file_path, "w") as file:
        for chunk in cache:
            file.write(str(chunk) + "\n")

# Split videos into chunks
v1_chunks = split_video("video1.mp4")
v2_chunks = split_video("video2.mp4")


if v1_chunks is not None and v2_chunks is not None:
    # Cache chunks at receivers
    R1_cache = [v1_chunks[0], v2_chunks[0]]
    R2_cache = [v1_chunks[1], v2_chunks[1]]
    # Save the caches to text files
    save_cache_to_file(R1_cache, "R1_cache.txt")
    save_cache_to_file(R2_cache, "R2_cache.txt")

    # Code chunks together: V2 [XOR] V3
    coded_chunk = code_chunks(v1_chunks[1], v2_chunks[0])

    # Multicast the coded video file
    # Here, we simulate transmitting the coded chunk to both receivers

    # Receiver 1 decodes the received file
    decoded_chunk_R1 = decode_received_file(coded_chunk, R1_cache[1])

    # Save the decoded file (V1 + V2) at Receiver 1
    save_video_file("V1_V2_received_at_R1.mp4", R1_cache[0] + decoded_chunk_R1)

    # Receiver 2 decodes the received file
    decoded_chunk_R2 = decode_received_file(coded_chunk, R2_cache[0])

    # Save the decoded file (V1 + V2) at Receiver 2
    save_video_file("V1_V2_received_at_R2.mp4",decoded_chunk_R2 + R2_cache[0] )
else:
    print("Error occurred while splitting videos.")
