# Multicast with Python

Here is a simple multicast implementation with python, using the xor operation to send the same packets to two different receivers, but in the end interpreting two different videos.

## Without docker

This implies you have `python3` installed on your machine.
make sure you are in `/multicast-video-xor` folder.

Start by opening 3 terminals.


1. Terminal 1 (receiver 1)
```
cd receiver1 && python3 receiver.py
```
2. Terminal 2 (receiver 2)
```
cd receiver2 && python3 receiver.py
```

Make sure you have receiver 1 and 2 started and waiting before launching the server, as the server will not wait for them to connect and send the packets as soon as it's up.

3. Terminal 3 (server)
```
cd sender && python3 sender.py
```
