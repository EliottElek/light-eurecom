export const data = {
    "default_setup": {
        "defaultViewport": { zoom: 1 },
        "edges": [
            // {
            //     "id": "e1-2",
            //     "source": "1",
            //     "target": "2",
            //     "animated": true,
            //     "style": {
            //         "strokeWidth": 2
            //     }
            // },
            {
                "id": "e2-3",
                "source": "2",
                "target": "3",
                "animated": true,
                "style": {
                    "strokeWidth": 2
                }
            },
            {
                "id": "e2-4",
                "source": "2",
                "target": "4",
                "animated": true,
                "style": {
                    "strokeWidth": 2
                }
            },
            {
                "id": "e2-5",
                "source": "2",
                "target": "5",
                "animated": true,
                "style": {
                    "strokeWidth": 2
                }
            },
            {
                "id": "e2-6",
                "source": "2",
                "target": "6",
                "animated": true,
                "style": {
                    "strokeWidth": 2
                }
            }, {
                "id": "e2-7",
                "source": "2",
                "target": "7",
                "animated": true,
                "style": {
                    "strokeWidth": 2
                }
            }
        ],
        "nodes": [
            // {
            //     "id": "1",
            //     "type": "custom",
            //     "data": {
            //         "name": "Main server",
            //         "ip": "127.0.0.1",
            //         "icon": "server",
            //         "message": "Prepares the packet."
            //     },
            //     "position": {
            //         "x": 0,
            //         "y": 150
            //     }
            // },
            {
                "id": "2",
                "type": "custom",
                "data": {
                    "name": "Multicast server",
                    "ip": "224.0.0.1",
                    "icon": "server",
                    "message": "Sends the same packet to all",
                },
                "position": {
                    "x": 180,
                    "y": 150
                }
            },
            {
                "id": "3",
                "type": "custom",
                "data": {
                    "name": "Receiver 1",
                    "ip": "127.0.0.2",
                    "icon": "client",
                    "message": "Decodes the packet with own cache.",
                    "video": {
                        "status": "playing",
                        "url": "https://giphy.com/embed/xT5LMLPhW6qWTHjaWk"
                    }
                },
                "position": {
                    "x": 330,
                    "y": 0
                }
            },
            {
                "id": "4",
                "type": "custom",
                "data": {
                    "name": "Receiver 2",
                    "ip": "127.0.0.3",
                    "icon": "client",
                    "message": "Decodes the packet with own cache.",
                    "video": {
                        "status": "playing",
                        "url": "https://media1.giphy.com/media/xT5LMLPhW6qWTHjaWk/200w.webp"
                    }
                },
                "position": {
                    "x": 330,
                    "y": 80
                }
            },
            {
                "id": "5",
                "type": "custom",
                "data": {
                    "name": "Receiver 3",
                    "ip": "127.0.0.4",
                    "icon": "client",
                    "message": "Decodes the packet with own cache.",
                    "video": {
                        "status": "playing",
                        "url": "https://www.youtube.com/watch?v=w5uWZXsBNx0"
                    }
                },
                "position": {
                    "x": 330,
                    "y": 160
                }
            },
            {
                "id": "6",
                "type": "custom",
                "data": {
                    "name": "Receiver 4",
                    "ip": "127.0.0.4",
                    "icon": "client",
                    "message": "Decodes the packet with own cache.",
                    "video": {
                        "status": "playing",
                        "url": "https://www.youtube.com/watch?v=tY9o9668kYY"
                    }
                },
                "position": {
                    "x": 330,
                    "y": 240
                }
            },
            {
                "id": "7",
                "type": "custom",
                "data": {
                    "name": "Receiver 5",
                    "ip": "127.0.0.4",
                    "icon": "client",
                    "message": "Decodes the packet with own cache.",
                    "video": {
                        "status": "playing",
                        "url": "https://www.youtube.com/watch?v=3LOTivgJfcw"
                    }
                },
                "position": {
                    "x": 330,
                    "y": 320
                }
            }
        ]
    }
}