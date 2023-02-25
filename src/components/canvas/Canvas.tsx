import { useEffect, useRef } from "react"
import "./styles.css"

export function Canvas() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const canvaSize = {
        width: 1024,
        height: 576
    }

    const startPosition = {
        x: canvaSize.width / 2,
        y: canvaSize.height / 2
    }


    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            canvas.width = canvaSize.width;
            canvas.height = canvaSize.height;

            const context = canvas.getContext("2d");
            // draw
            if (context) {
                context.fillStyle = '#FF0000'
                context.fillRect(0, 0, context.canvas.width, context.canvas.height)

                // background
                const image = new Image();
                image.src = "/src/assets/maps/village/background.png";


                // player
                const playerImage = new Image();
                playerImage.src = "/src/assets/characters/human/male/walk-front.png";


                image.onload = () => {
                    context.drawImage(image, -startPosition.x, -startPosition.y);
                    context.drawImage(
                        playerImage,
                        0,
                        0,
                        playerImage.width / 4,
                        playerImage.height,
                        canvaSize.width / 2 - ( playerImage.width / 4 ) / 2,
                        canvaSize.height / 2 - playerImage.height / 4,
                        playerImage.width / 4,
                        playerImage.height
                    );

                }
            }
        }

    }, []);


    return (
        <canvas ref={canvasRef} className="main-canvas">

        </canvas>
    )
}