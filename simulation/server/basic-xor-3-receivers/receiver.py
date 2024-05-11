from pathlib import Path
import sys
import time
path_root = Path(__file__).parents[2]
sys.path.append(str(path_root))

import argparse
import os
import socket
from server.utils import Cache, decode_received_message, update_file, xor_strings

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
    elif receiver == "receiver3":
        cache_file = 'cacheR3.txt'


    script_dir = os.path.dirname(os.path.abspath(__file__))
    cache_folder = os.path.join(script_dir, cache_file)

    cache = Cache(cache_folder, 6)
    cache_chunk1_1 = cache.get('chunk1-1')  # Convert cached chunk to bytes
    cache_chunk1_2 = cache.get('chunk1-2')  # Convert cached chunk to bytes
    cache_chunk2_1 = cache.get('chunk2-1')  # Convert cached chunk to bytes
    cache_chunk2_2 = cache.get('chunk2-2')  # Convert cached chunk to bytes
    cache_chunk3_1 = cache.get('chunk3-1')  # Convert cached chunk to bytes
    cache_chunk3_2 = cache.get('chunk3-2')  # Convert cached chunk to bytes

    while True:
        try:
            data, _ = multicast_socket.recvfrom(1024)
            data = data.decode()      
            update_file(id, ["nodes", 2, "data","active"], True)
            update_file(id, ["nodes", 3, "data","active"], True)
            update_file(id, ["nodes", 4, "data","active"], True)
            time.sleep(2)  
            update_file(id,["nodes", 2, "data","message"], "Receiving : " + repr(data))
            update_file(id,["nodes", 3, "data","message"], "Receiving : " + repr(data))
            update_file(id,["nodes", 4, "data","message"], "Receiving : " + repr(data))
            time.sleep(2)  
            update_file(id, ["nodes", 2, "data","active"], False)
            update_file(id, ["nodes", 3, "data","active"], False)
            update_file(id, ["nodes", 4, "data","active"], False)
            time.sleep(2)  
            update_file(id, ["nodes", 2, "data","message"], "Decoding message with cache...")
            update_file(id, ["nodes", 3, "data","message"], "Decoding message with cache...")
            update_file(id, ["nodes", 4, "data","message"], "Decoding message with cache...")
            time.sleep(2)         
            if receiver == "receiver1":
                    decoded_chunk = decode_received_message(data, xor_strings(cache_chunk2_2, cache_chunk3_1))
                    update_file(id, ["nodes", 2, "data","message"], f'Performing {cache_chunk1_1} + {cache_chunk1_2} + {decoded_chunk}')
                    decoded = cache_chunk1_1 + cache_chunk1_2 + decoded_chunk
                    time.sleep(1)  
                    update_file(id, ["nodes", 2, "data","message"], f'Decoded message: {str(decoded)}')
            elif receiver == "receiver2":
                    decoded_chunk = decode_received_message(data, xor_strings(cache_chunk1_2, cache_chunk3_1))
                    update_file(id, ["nodes", 3, "data","message"], f'Performing {cache_chunk2_1} + {decoded_chunk} + {cache_chunk2_2}')
                    decoded = cache_chunk2_1 + decoded_chunk + cache_chunk2_2 
                    time.sleep(1)  
                    update_file(id, ["nodes", 3, "data","message"], f'Decoded message: {str(decoded)}')
            elif receiver=="receiver3":
                    decoded_chunk = decode_received_message(data, xor_strings(cache_chunk1_2, cache_chunk2_1))
                    update_file(id, ["nodes", 4, "data","message"], f'Performing {decoded_chunk} + {cache_chunk3_1} + {cache_chunk3_2}')
                    decoded = decoded_chunk + cache_chunk3_1 +  cache_chunk3_2 
                    time.sleep(1)  
                    update_file(id, ["nodes", 4, "data","message"], f'Decoded message: {str(decoded)}')

            time.sleep(1)
            update_file(id, ["nodes", 0, "data","message"], "Socket closed.")
            
        except Exception as e:
            update_file(id, "status", "Receiver error")
            time.sleep(1)
            update_file(id, "message", str(e))
            break

    multicast_socket.close()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Multicast Receiver Script')
    parser.add_argument('receiver', choices=['receiver1', 'receiver2', 'receiver3'], help='Receiver type (receiver1 or receiver2)')
    parser.add_argument('-id', '--simulation_id', required=False, help='Simulation identifier, to update the JSON file.')
    args = parser.parse_args()
    main(args.receiver, args.simulation_id)