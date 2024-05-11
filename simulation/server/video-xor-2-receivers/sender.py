import os
import pathlib
import socket
from utils import code_chunks, split_into_chunks, split_video
MULTICAST_GROUP = '224.0.0.1'
MULTICAST_PORT = 5007
BUFFER_SIZE = 1024

if __name__ == '__main__':
    print("Starting multicast sender...")
    multicast_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
    multicast_socket.setsockopt(socket.IPPROTO_IP, socket.IP_MULTICAST_TTL, 2)

    try:
        chunk_size = 2048
        video_path_1 = os.path.join(pathlib.Path(__file__).parent.parent, 'videos', "video1.mp4")
        video_path_2 = os.path.join(pathlib.Path(__file__).parent.parent, 'videos', "video2.mp4")
        print(video_path_1)
        v1_chunks = split_video(video_path_1)
        v2_chunks = split_video(video_path_2)
        if v1_chunks is not None and v2_chunks is not None:
            coded_chunk = code_chunks(v1_chunks[1], v2_chunks[0])

            coded_chunks_2048 = split_into_chunks(coded_chunk, 2048)
            for chunk in coded_chunks_2048:
                multicast_socket.sendto(chunk, (MULTICAST_GROUP, MULTICAST_PORT))
                if chunk == b'LAST_PACKET':
                    break
                print("Sent chunk of size:", len(chunk))

    except OSError as e:
        print("[Error] OS Error:", str(e))

    finally:
        multicast_socket.close()
