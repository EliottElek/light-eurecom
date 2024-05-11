import argparse
import os
import pathlib
import socket
import sys
from utils import decode_received_file, read_cache, save_video_file

path_root = pathlib.Path(__file__).parents[2]
sys.path.append(str(path_root))

from server.utils import update_file
MULTICAST_GROUP = '224.0.0.1'
MULTICAST_PORT = 5007
BUFFER_SIZE = 1024 * 1024  # 1 MB buffer size


def main(receiver, id):
    RECEIVER_NAME = receiver
    
    if (receiver == 'receiver1'):
        cache_file = "R1_cache.txt"
    else:
        cache_file = "R2_cache.txt"

    CACHE = read_cache(os.path.join(pathlib.Path(__file__).parent, cache_file))

    print(f"{RECEIVER_NAME} is waiting for message...")
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
        print("Starting reconstruct")
        multicast_socket.close()
        
    if receiver == "receiver1":
        video_data = b''.join(video_chunks)
        decoded_chunk = decode_received_file(video_data, CACHE[1])
        file_path = os.path.join(pathlib.Path(__file__).parent.parent, 'videos', f"{RECEIVER_NAME}.mp4")
        save_video_file(file_path, CACHE[0] + decoded_chunk)
        update_file(id, ["nodes", 2, "data","video", 'url'], f'http://localhost:5000/videos/{RECEIVER_NAME}.mp4')
    else:
        video_data = b''.join(video_chunks)
        decoded_chunk = decode_received_file(video_data, CACHE[0])
        file_path = os.path.join(pathlib.Path(__file__).parent.parent, 'videos', f"{RECEIVER_NAME}.mp4")
        save_video_file(file_path, decoded_chunk + CACHE[0])
        update_file(id, ["nodes", 3, "data","video", 'url'], f'http://localhost:5000/videos/{RECEIVER_NAME}.mp4')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Multicast Receiver Script')
    parser.add_argument('receiver', choices=['receiver1', 'receiver2'], help='Receiver type (receiver1 or receiver2)')
    parser.add_argument('-id', '--simulation_id', required=True, help='Simulation identifier, to update the JSON file.')
    args = parser.parse_args()
    main(args.receiver, args.simulation_id)