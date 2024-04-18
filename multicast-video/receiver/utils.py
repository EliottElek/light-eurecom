from faker import Faker


def get_destined_packet(main_packet):
    """
    Logical function that returns the packet specific to one end user.
    for now, it only returns the main packet.
    """
    return main_packet

class Cache:
    """
    Exemple usage of cache:
    cache = Cache('cache.txt', 2)
    cache.put("combinaison", '10100101111101001')
    print(cache.get("combinaison"))  # Output: 10100101111101001
    """
    def __init__(self, filename, capacity):
        self.filename = filename
        self.capacity = capacity
        # Create the file if it doesn't exist
        try:
            with open(self.filename, 'r'):
                pass
        except FileNotFoundError:
            with open(self.filename, 'w'):
                pass

    def get(self, key):
        with open(self.filename, 'r') as file:
            for line in file:
                k, v = line.strip().split(':')
                if k == str(key):
                    return v
        return None

    def put(self, key, value):
        cache = {}
        with open(self.filename, 'r') as file:
            for line in file:
                k, v = line.strip().split(':')
                cache[k] = v

        cache[str(key)] = str(value)

        # If cache exceeds capacity, remove the oldest entry
        if len(cache) > self.capacity:
            del cache[next(iter(cache))]

        with open(self.filename, 'w') as file:
            for k, v in cache.items():
                file.write(f"{k}:{v}\n")




def get_rand_name():
    fake = Faker()
    return fake.first_name()
