import socket

from utils import get_destined_packet

MULTICAST_GROUP = '224.0.0.1'
MULTICAST_PORT = 5007

if __name__ == '__main__':
    print("Starting multicast receiver...")
    multicast_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
    multicast_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT, 1)  # Use SO_REUSEPORT
    multicast_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    multicast_socket.bind(('', MULTICAST_PORT))
    multicast_socket.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, socket.inet_aton(MULTICAST_GROUP) + socket.inet_aton('0.0.0.0'))

    while True:
        try:
            data, address = multicast_socket.recvfrom(1024)
            result = get_destined_packet(data)
            print(f"Received:", result.decode())
        except Exception as e:
            print("[Error] " + str(e))
            break

    multicast_socket.close()
