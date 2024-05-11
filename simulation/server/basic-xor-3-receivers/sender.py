import argparse
from pathlib import Path
import sys
import time
path_root = Path(__file__).parents[2]
sys.path.append(str(path_root))
import socket
from server.utils import split_strings, multicast_coded_message, update_file

MULTICAST_GROUP = '224.0.0.1'
MULTICAST_PORT = 5007

def main(id):
    V1 = "why_so_serio"
    V2 = "not_so_perfe"
    V3 = "tom_is_minim"
    
    # Split videos into chunks
    V1_chunks = split_strings(V1, 3)
    V2_chunks = split_strings(V2, 3)
    V3_chunks = split_strings(V3, 3)
    
    print(V1_chunks)
    print(V2_chunks)
    print(V3_chunks)
    # update_file(id, ["nodes", 0,"data", "message"], "Selecting three messages : '{V1}', '{V2}' and '{V3}'.")
    # time.sleep(2)
    # update_file(id, ["nodes", 0,"data", "message"], "Splitting three messages into three chunks each.")
    # time.sleep(2)
    coded_message = multicast_coded_message(V1_chunks[2], V2_chunks[1], V3_chunks[0])
    print(repr(coded_message))
    # update_file(id, ["nodes", 0, "data","message"], f"Preparing XORed message : {repr(coded_message)}") 
    # time.sleep(2)   
    multicast_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
    multicast_socket.setsockopt(socket.IPPROTO_IP, socket.IP_MULTICAST_TTL, 2)
    # time.sleep(1)
    # update_file(id, ["nodes", 0,"data", "message"], f"Sending message to multicast...")
    # update_file(id, ["edges", 0, "animated"], True)
    # time.sleep(2)
    # update_file(id, ["edges", 0, "animated"], False)
    # update_file(id, ["nodes", 0, "data","active"], False)
    # update_file(id, ["nodes", 1, "data","active"], True)
    # time.sleep(2)
    multicast_socket.sendto(bytes(coded_message, 'utf-8'), (MULTICAST_GROUP, MULTICAST_PORT))
    multicast_socket.close()
    # update_file(id, ["nodes", 1, "data","active"], False)
    # update_file(id, ["edges", 1, "animated"], True)
    # update_file(id, ["edges", 2, "animated"], True)
    # time.sleep(4)
    # update_file(id, ["edges", 1, "animated"], False)
    # update_file(id, ["edges", 2, "animated"], False)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Multicast Receiver Script')
    parser.add_argument('-id', '--simulation_id', required=False, help='Simulation identifier, to update the JSON file.')
    args = parser.parse_args()
    main(args.simulation_id)