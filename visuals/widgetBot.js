// widgetBot.js - Plataform Store

if (!device.mobile) {
    const script = Object.assign(document.createElement('script'), {
        src: 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3',
        async: true,
        defer: true,
        onload: () => {
            const discEmbed = new Crate({
                server: '1286573512831533056',
                channel: '1286573601687867433',
                location: ['bottom', 'right'],
                notifications: true,
                indicator: true,
                allChannelNotifications: true,
                color: '#5865F2' // Discord Blurple for better branding
            });

            plppdo.on('domChanged', () => {
                if (window.location.href.includes("khanacademy.org/profile")) {
                    discEmbed.show();
                } else {
                    discEmbed.hide();
                }
            });
        }
    });
    document.body.appendChild(script);
}
