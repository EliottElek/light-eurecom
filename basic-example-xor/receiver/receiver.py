import socket
from utils import Cache, decode_received_file

MULTICAST_GROUP = '224.0.0.1'
MULTICAST_PORT = 5007

if __name__ == '__main__':
    print("Starting multicast receiver...")
    multicast_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
    multicast_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT, 1)  # Use SO_REUSEPORT
    multicast_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    multicast_socket.bind(('', MULTICAST_PORT))
    multicast_socket.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, socket.inet_aton(MULTICAST_GROUP) + socket.inet_aton('0.0.0.0'))

    # Use cacheR1.txt for receiver 1
    cache = Cache("cacheR1.txt", 2)
    R1_cache_chunk1 = bytes(cache.get('chunk1'), 'utf-8')  # Convert cached chunk to bytes
    R1_cache_chunk2 = bytes(cache.get('chunk2'), 'utf-8')  # Convert cached chunk to bytes

# Use cacheR2.txt for receiver 2
    # cache = Cache("cacheR2.txt", 2)
    # R2_cache_chunk1 = bytes(cache.get('chunk1'), 'utf-8')  # Convert cached chunk to bytes
    # R2_cache_chunk2 = bytes(cache.get('chunk2'), 'utf-8')  # Convert cached chunk to bytes
    while True:
        try:
            data, address = multicast_socket.recvfrom(1024)
            print("Received:", data)
            
            if len(data) == len(R1_cache_chunk2):
                decoded_chunk_at_R1 = decode_received_file(data, R1_cache_chunk2)
                V1_V2_at_R1 = R1_cache_chunk1 + bytes(decoded_chunk_at_R1)
                print("Receiver 1 can read:", V1_V2_at_R1.decode())


            # if len(data) == len(R2_cache_chunk1):
            #     decoded_chunk_at_R2 = decode_received_file(data, R2_cache_chunk1)
            #     V3_V4_at_R2 = decoded_chunk_at_R2 + R2_cache_chunk2
            #     print("Receiver 2 can read:", V3_V4_at_R2.decode())

            
            else:
                print("[Error] Received chunk size does not match cached chunk size")
                
        except Exception as e:
            print("[Error] " + str(e))
            break

    multicast_socket.close()
