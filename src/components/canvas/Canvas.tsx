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

                // SpriteProps

                interface SpriteProps {
                    position: {
                        x: number, 
                        y: number
                    };
                    image: HTMLImageElement
                }

                class Sprite  {
                    position: { x: number; y: number; };
                    image: HTMLImageElement;
                   
                    constructor({position, image}: SpriteProps){
                        this.position = position;
                        this.image = image;
                    }

                    draw(){
                        context?.drawImage(this.image, this.position.x, this.position.y);
                    }
                }

                const background = new Sprite({position: {x: -startPosition.x, y: -startPosition.y}, image: image});
               
                // animation

                function animate(){
                    window.requestAnimationFrame(animate)

                    // background
                    background.draw();
                    // player
                    context?.drawImage(
                        playerImage,
                        0,
                        0,
                        playerImage.width / 4,
                        playerImage.height,
                        canvaSize.width / 2 - (playerImage.width / 4) / 2,
                        canvaSize.height / 2 - playerImage.height / 4,
                        playerImage.width / 4,
                        playerImage.height
                    );
                }
                animate();
 
                // move player

                const handleCanvasKeydown = (event: KeyboardEvent) => {
                    switch (event.key) {
                        case "w":
                            console.log(event.key);
                            background.position.y += 16 * 4;
                            break;
                        case "a":
                            console.log(event.key);
                            background.position.x += 16 * 4;
                            break;
                        case "s":
                            console.log(event.key);
                            background.position.y -= 16 * 4;
                            break;
                        case "d":
                            console.log(event.key);
                            background.position.x -= 16 * 4;
                            break;
                        default:
                            break;
                    }
                }

                canvas.onkeydown = handleCanvasKeydown

        }
    }

    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="main-canvas"
            tabIndex={0}
        />
    )
}