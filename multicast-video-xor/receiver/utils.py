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

def split_into_chunks(data, chunk_size):
    """Split data into chunks of specified size."""
    return [data[i:i+chunk_size] for i in range(0, len(data), chunk_size)]

def read_cache(file_path):
    """Read cache from a text file."""
    try:
        with open(file_path, "r") as file:
            cache = [eval(line.strip()) for line in file.readlines()]
        return cache
    except Exception as e:
        print("[Error] Unable to read cache:", str(e))
        return None