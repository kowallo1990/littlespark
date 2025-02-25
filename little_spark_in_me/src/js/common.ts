export const textFade = (textObj:Phaser.GameObjects.Text, yPosition: number, text: string, time: number, context: any) => {
    setTimeout(() => {
        textObj = context.make.text({
            x: window.innerWidth/2,
            y: yPosition,
            text: text,
            origin: { x: 0.5, y: 0.5 },
            style:  {
                fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
                stroke: '#000000', strokeThickness: 4,
                align: 'left'
            },
            alpha: 0,
        });

        context.tweens.add({
            targets: textObj,
            alpha: { from: 0, to: 1 },
            ease: 'Sine.InOut',
            duration: 2000,
            repeat: 0,
        });
    }, time)
}

