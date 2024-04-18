import json
import socket
import time

from utils import create_packet, encode_message_chunks

MULTICAST_GROUP = '224.0.0.1'
MULTICAST_PORT = 5007

MESSAGE = b"This is a sample message."
chunks = create_packet(MESSAGE)
encoded_chunks = encode_message_chunks(chunks[1], chunks[2])

if __name__ == '__main__':
    print("Starting multicast sender...")
    print(f"Sending all message: '{MESSAGE}'")
    multicast_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
    multicast_socket.setsockopt(socket.IPPROTO_IP, socket.IP_MULTICAST_TTL, 2)
    for chunk in encoded_chunks:
        try:
            multicast_socket.sendto(chunk, (MULTICAST_GROUP, MULTICAST_PORT))
            print("Sent:", chunk)

        except Exception as e:
            print("[Error] " + str(e))
            break

    multicast_socket.close()
