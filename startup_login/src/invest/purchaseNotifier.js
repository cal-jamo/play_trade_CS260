class ShareEventNotifier {
        constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        
        this.socket.onopen = () => {
            console.log('WebSocket connection established');
        };
    
        this.socket.onclose = () => {
            console.error('WebSocket connection closed');
        };
    
        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        }
    
        broadcastShareBoughtEvent(from, teamName, price, date) {
            console.log('Broadcasting share bought event');
            if (this.socket.readyState === WebSocket.OPEN) {
                const event = {
                from,
                type: 'shareBought',
                value: { teamName, price, date },
                };
                this.socket.send(JSON.stringify(event));
                console.log('Share bought event sent', event);
            } else {
                console.error('WebSocket is not open. ReadyState:', this.socket.readyState);
            }
        }
}

const ShareNotifier = new ShareEventNotifier();
export { ShareNotifier };
  