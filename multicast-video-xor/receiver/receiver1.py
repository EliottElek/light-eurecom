import socket
from utils import decode_received_file, read_cache, save_video_file

MULTICAST_GROUP = '224.0.0.1'
MULTICAST_PORT = 5007
RECEIVER_NAME = 'Receiver 1'
BUFFER_SIZE = 1024 * 1024  # 1 MB buffer size

CACHE = read_cache("R1_cache.txt")

if __name__ == '__main__':
    print(f"{RECEIVER_NAME} is waiting for message...")
    multicast_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
    multicast_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT, 1)  # Use SO_REUSEPORT
    multicast_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    multicast_socket.bind(('', MULTICAST_PORT))
    multicast_socket.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, socket.inet_aton(MULTICAST_GROUP) + socket.inet_aton('0.0.0.0'))

    video_chunks = []

    try:
        data_0 = None
        while True:
            data, address = multicast_socket.recvfrom(BUFFER_SIZE)
            print(f"Received for receiver {RECEIVER_NAME}: {len(data)} bytes")
            if data == b'LAST_PACKET':
                break
            if len(video_chunks) == 30:
                video_chunks.append(data_0)
            else:
                video_chunks.append(data)
            
            data_0 = data

    except Exception as e:
        print("[Error] " + str(e))

    finally:
        print("Starting reconstruct")
        multicast_socket.close()

    # Rebuild the video from chunks
    video_data = b''.join(video_chunks)
    decoded_chunk = decode_received_file(video_data, CACHE[1])

    # Save the decoded file (V1 + V2) at Receiver 1
    save_video_file(f"{RECEIVER_NAME}.mp4", CACHE[0] + decoded_chunk)

    print(f"Video successfully rebuilt and saved as '{RECEIVER_NAME}.mp4'")
