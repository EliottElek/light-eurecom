import socket
import os

MULTICAST_GROUP = '224.0.0.1'
MULTICAST_PORT = 5007
BUFFER_SIZE = 1024

def split_video(file_path, chunk_size):
    try:
        # Open the video file
        video = open(file_path, 'rb')

        # Get the size of the video file
        video_size = os.path.getsize(file_path)

        # Calculate number of chunks
        num_chunks = video_size // chunk_size
        if video_size % chunk_size != 0:
            num_chunks += 1

        print("Total number of chunks:", num_chunks)

        # Read and send video chunks
        for i, chunk in enumerate(iter(lambda: video.read(chunk_size), b'')):
            yield chunk
            if i == num_chunks - 1:
                yield b'LAST_PACKET'  # Send a special packet indicating the last packet

        # Close the video file
        video.close()

    except Exception as e:
        print("[Error] Unable to split video:", str(e))

if __name__ == '__main__':
    print("Starting multicast sender...")
    multicast_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
    multicast_socket.setsockopt(socket.IPPROTO_IP, socket.IP_MULTICAST_TTL, 2)

    try:
        file_path = "video.mp4"
        chunk_size = 2048
        for chunk in split_video(file_path, chunk_size):
            multicast_socket.sendto(chunk, (MULTICAST_GROUP, MULTICAST_PORT))
            if chunk == b'LAST_PACKET':
                break
            print("Sent chunk of size:", len(chunk))

    except OSError as e:
        print("[Error] OS Error:", str(e))

    finally:
        multicast_socket.close()
