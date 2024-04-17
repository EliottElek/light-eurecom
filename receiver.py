import socket

from core.main import get_destined_packet

MULTICAST_GROUP = '224.0.0.1'
MULTICAST_PORT = 5007

RECEIVER_KEY = "011110110010001001110000011000010110001101101011011001010111010001011111011010010110010000100010001110100010000000100010010000010010001000101100001000000010001001100100011000010111010001100001001000100011101000100000001000100100001101101111011011100111010001100101011011100111010000100000011001100110111101110010001000000111000001100001011000110110101101100001011001110110010100100000010000010010001001111101"

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
            print(f"Received for receiver 1:", data.decode())
        except Exception as e:
            print("[Error] " + str(e))
            break

    multicast_socket.close()
