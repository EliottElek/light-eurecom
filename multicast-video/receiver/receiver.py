import socket
from utils import get_rand_name

MULTICAST_GROUP = '224.0.0.1'
MULTICAST_PORT = 5007
RECEIVER_NAME = get_rand_name()
BUFFER_SIZE = 1024 * 1024  # 1 MB buffer size

if __name__ == '__main__':
    print("Starting multicast receiver...")
    multicast_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
    multicast_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT, 1)  # Use SO_REUSEPORT
    multicast_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    multicast_socket.bind(('', MULTICAST_PORT))
    multicast_socket.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, socket.inet_aton(MULTICAST_GROUP) + socket.inet_aton('0.0.0.0'))

    video_chunks = []

    try:
        while True:
            data, address = multicast_socket.recvfrom(BUFFER_SIZE)
            print(f"Received for receiver {RECEIVER_NAME}: {len(data)} bytes")
            if data == b'LAST_PACKET':
                break
            video_chunks.append(data)

    except Exception as e:
        print("[Error] " + str(e))

    finally:
        multicast_socket.close()

    # Rebuild the video from chunks
    video_data = b''.join(video_chunks)

    # Write the rebuilt video to a file
    with open("video_rebuilt.mp4", "wb") as video_file:
        video_file.write(video_data)

    print("Video successfully rebuilt and saved as video_rebuilt.mp4")
