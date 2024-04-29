from pathlib import Path
import sys
import time
path_root = Path(__file__).parents[2]
sys.path.append(str(path_root))

import argparse
import os
import socket
from server.utils import Cache, decode_received_message, update_file

MULTICAST_GROUP = '224.0.0.1'
MULTICAST_PORT = 5007

def main(receiver, id):
    multicast_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
    multicast_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT, 1)  # Use SO_REUSEPORT
    multicast_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    multicast_socket.bind(('', MULTICAST_PORT))
    multicast_socket.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, socket.inet_aton(MULTICAST_GROUP) + socket.inet_aton('0.0.0.0'))

    cache_file = 'cacheR1.txt'
    if receiver=="receiver2":
        cache_file = 'cacheR2.txt'

    script_dir = os.path.dirname(os.path.abspath(__file__))
    cache_folder = os.path.join(script_dir, cache_file)

    cache = Cache(cache_folder, 2)
    cache_chunk1 = cache.get('chunk1')  # Convert cached chunk to bytes
    cache_chunk2 = cache.get('chunk2')  # Convert cached chunk to bytes
    print("cache chunk1: ",cache_chunk1)
    print("cache chunk2: ",cache_chunk2)

    while True:
        try:
            data, _ = multicast_socket.recvfrom(1024)
            print("Received:", data.decode())
            data = data.decode()             

            if(receiver=="receiver1"):
                    update_file(id, ["nodes", 2, "data","active"], True)
                    update_file(id,["nodes", 2, "data","message"], "Receiving : " + repr(data))
                    time.sleep(2)  
                    update_file(id, ["nodes", 2, "data","message"], "Decoding message with cache...")
                    time.sleep(2)   
                    update_file(id, ["nodes", 2, "data","message"], f'Performing {repr(data)} ⊕ {cache_chunk2}')
                    time.sleep(2)
                    decoded_chunk_at_R1 = decode_received_message(data, cache_chunk2)
                    time.sleep(2)
                    update_file(id, ["nodes", 2, "data","message"], f'Performing {cache_chunk1} + {decoded_chunk_at_R1}')
                    decoded = cache_chunk1 + decoded_chunk_at_R1
                    update_file(id, ["nodes", 2, "data","message"], f'Decoded message: {str(decoded)}')
            else:
                    update_file(id, ["nodes", 3, "data","active"], True)
                    update_file(id,["nodes", 3, "data","message"], "Receiving : " + repr(data))
                    time.sleep(2)  
                    update_file(id, ["nodes", 3, "data","message"], "Decoding message with cache...")
                    time.sleep(2)
                    update_file(id, ["nodes", 3, "data","message"], f'Performing {repr(data)} ⊕ {cache_chunk1}')
                    time.sleep(2)
                    decoded_chunk_at_R2 = decode_received_message(data, cache_chunk1)
                    time.sleep(2)
                    update_file(id, ["nodes", 3, "data","message"], f'Performing {decoded_chunk_at_R2} + {cache_chunk2}')
                    decoded = decoded_chunk_at_R2 + cache_chunk2
                    update_file(id, ["nodes", 3, "data","message"], f'Decoded message: {str(decoded)}')


            update_file(id, ["nodes", 0, "data","message"], "Socket closed.")
            update_file(id, ["nodes", 2, "data","active"], False)
            update_file(id, ["nodes", 3, "data","active"], False)

        except Exception as e:
            update_file(id, "status", "Receiver error")
            time.sleep(1)
            update_file(id, "message", str(e))
            break

    multicast_socket.close()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Multicast Receiver Script')
    parser.add_argument('receiver', choices=['receiver1', 'receiver2'], help='Receiver type (receiver1 or receiver2)')
    parser.add_argument('-id', '--simulation_id', required=True, help='Simulation identifier, to update the JSON file.')
    args = parser.parse_args()
    main(args.receiver, args.simulation_id)