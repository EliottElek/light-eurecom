import json
import socket
import time

MULTICAST_GROUP = '224.0.0.1'
MULTICAST_PORT = 5007

MESSAGE = "Hello World !"

if __name__ == '__main__':
    print("Starting multicast sender...")
    multicast_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
    multicast_socket.setsockopt(socket.IPPROTO_IP, socket.IP_MULTICAST_TTL, 2)
    while True:
        try:
            multicast_socket.sendto(MESSAGE.encode(), (MULTICAST_GROUP, MULTICAST_PORT))
            print("Sent:", MESSAGE)
            print("Waiting 10s...")
            time.sleep(10)  # Delay for 10 seconds

        except Exception as e:
            print("[Error] " + str(e))
            break

    multicast_socket.close()
