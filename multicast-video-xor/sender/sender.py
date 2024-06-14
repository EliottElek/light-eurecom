import socket
import time
from utils import code_chunks, split_into_chunks, split_video

MULTICAST_GROUP = '224.0.0.1'
MULTICAST_PORT = 5007
BUFFER_SIZE = 1024
TTL = 3  # Time to Live for multicast packets

def send_multicast():
    print("Starting multicast sender...")
    multicast_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
    multicast_socket.setsockopt(socket.IPPROTO_IP, socket.IP_MULTICAST_TTL, TTL)

    try:
        chunk_size = 2048
        v1_chunks = split_video("video1.mp4")
        v2_chunks = split_video("video2.mp4")
        if v1_chunks is not None and v2_chunks is not None:
            coded_chunk = code_chunks(v1_chunks[1], v2_chunks[0])

        coded_chunks_2048 = split_into_chunks(coded_chunk, chunk_size)
        for chunk in coded_chunks_2048:
            multicast_socket.sendto(chunk, (MULTICAST_GROUP, MULTICAST_PORT))
            print("Sent chunk of size:", len(chunk))
            time.sleep(.05)


        # Send the last packet indicator
        multicast_socket.sendto(b'LAST_PACKET', (MULTICAST_GROUP, MULTICAST_PORT))
        print("Sent last packet indicator")

        # Adding a short delay to ensure the last packet is sent before closing the socket
        time.sleep(1)

    except OSError as e:
        print("[Error] OS Error:", str(e))

    finally:
        multicast_socket.close()
        print("Multicast socket closed")

if __name__ == '__main__':
    send_multicast()
