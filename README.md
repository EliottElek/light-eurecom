# multicast with Python

## Start the multicast server

Start by building the image of the server.
```
cd sender
docker build -t multicast-sender .
```
then start the container:

```
docker run --name my-multicast-sender multicast-sender
```

## Start the receivers

We'll use two receivers for the moment.
Start by building the image of the receiver.
```
cd receiver
docker build -t multicast-receiver .
```
then start the two containers:

```
docker run --name my-multicast-receiver-1 multicast-receiver
docker run --name my-multicast-receiver-2 multicast-receiver
# Two separate terminals
```

Make sure all your containers are running, using `docker ps`:

```
eliottmorcillo@MacBook-Pro-de-Eliott ~/D/E/m/receiver (main)> docker ps
CONTAINER ID   IMAGE                COMMAND                 CREATED              STATUS              PORTS     NAMES
c3730874a1cd   multicast-receiver   "python3 receiver.py"   About a minute ago   Up About a minute             my-multicast-receiver-2
3788216bfb98   multicast-receiver   "python3 receiver.py"   About a minute ago   Up About a minute             my-multicast-receiver-1
1268c4dd699c   multicast-sender     "python3 sender.py"     About a minute ago   Up About a minute             my-multicast-sender
```
## Start the multicast

Open three terminal, and access the containers via ssh. Run:

1. Terminal 1 (server)
```
docker exec -it my-multicast-sender  /bin/bash
```
then:
```bash
python3 sender.py
```

2. Terminal 2 (receiver 1)
```
docker exec -it my-multicast-receiver-1  /bin/bash
```
then:
```bash
python3 receiver.py
```

3. Terminal 3 (receiver 2)
```
docker exec -it my-multicast-receiver-2  /bin/bash
```
then:
```bash
python3 receiver.py
```

You should get something like:

![image](https://github.com/EliottElek/multicast/assets/64375473/c9559051-8c97-435b-85b4-3705caf81a44)

