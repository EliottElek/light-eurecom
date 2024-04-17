import json
import socket
import time

from core.main import str_to_binary, xor

MULTICAST_GROUP = '224.0.0.1'
MULTICAST_PORT = 5007

packages = [
        json.dumps({"packet_id": "A", "data": "Content for package A"}),  # JSON representation of package A
        json.dumps({"packet_id": "B", "data": "Content for package B"}),  # JSON representation of package B
        json.dumps({"packet_id": "C", "data": "Content for package C"}),   # JSON representation of package C
        json.dumps({"packet_id": "D", "data": "Content for package D"})   # JSON representation of package D
    ]

if __name__ == '__main__':
    print("Starting multicast sender...")
    multicast_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
    multicast_socket.setsockopt(socket.IPPROTO_IP, socket.IP_MULTICAST_TTL, 2)
    binary_packages = [str_to_binary(package) for package in packages]  # Convert packages to binary strings
    result = xor(*binary_packages)
    while True:
        try:
            multicast_socket.sendto(result.encode(), (MULTICAST_GROUP, MULTICAST_PORT))
            print("Sent:", result)
            print("Waiting 10s...")
            time.sleep(10)  # Delay for 10 seconds

        except Exception as e:
            print("[Error] " + str(e))
            break

    multicast_socket.close()
