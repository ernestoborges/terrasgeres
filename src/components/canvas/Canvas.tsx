import { useEffect, useRef } from "react"
import "./styles.css"
import { BackgroundSprite, PlayerSprite } from "../../classes/Sprites";

export function Canvas() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const canvasSize = {
        width: 1024,
        height: 576
    }

    const startPosition = {
        x: canvasSize.width / 2,
        y: canvasSize.height / 2
    }

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            canvas.width = canvasSize.width;
            canvas.height = canvasSize.height;

            const context = canvas.getContext("2d");
            // draw
            if (context) {
                context.fillStyle = '#FF0000'
                context.fillRect(0, 0, context.canvas.width, context.canvas.height)

                // background
                const backgroundImage = new Image();
                backgroundImage.src = "/src/assets/maps/village/background.png";

                // player
                const playerImageFront = new Image();
                playerImageFront.src = "/src/assets/characters/human/male/walk-front.png";
                const playerImageBack = new Image();
                playerImageBack.src = "/src/assets/characters/human/male/walk-back.png";
                const playerImageRight = new Image();
                playerImageRight.src = "/src/assets/characters/human/male/walk-right.png";
                const playerImageLeft = new Image();
                playerImageLeft.src = "/src/assets/characters/human/male/walk-left.png";
                const playerImageSprites = {
                    w: playerImageBack,
                    a: playerImageLeft,
                    s: playerImageFront,
                    d: playerImageRight
                }

                const background = new BackgroundSprite({
                    context: context, 
                    position: { x: -startPosition.x, y: -startPosition.y }, 
                    image: backgroundImage 
                });

                const player = new PlayerSprite({ 
                    context: context,
                    canvasSize: {
                        width: canvasSize.width,
                        height: canvasSize.height
                    }, 
                    sprites: playerImageSprites, 
                    moving: false, 
                    image: playerImageFront,
                    speed: 100 
                });

                // moving controler

                const keys = {
                    w: {
                        pressed: false
                    },
                    a: {
                        pressed: false
                    },
                    s: {
                        pressed: false
                    },
                    d: {
                        pressed: false
                    },
                    lastKey: "a"
                }

                // animation
                function animate() {
                    window.requestAnimationFrame(animate)
                    // background
                    background.draw(keys, player);
                    // player
                    player.draw(background, keys);
                }
                animate();

                // move player
                const handleCanvasKeydown = (event: KeyboardEvent) => {
                    if (!background.moving) {
                        switch (event.key) {
                            case "w":
                                keys.w.pressed = true;
                                keys.lastKey = "w";
                                background.moving = true;
                                break;
                            case "a":
                                keys.a.pressed = true;
                                keys.lastKey = "a";
                                background.moving = true;
                                break;
                            case "s":
                                keys.s.pressed = true;
                                keys.lastKey = "s";
                                background.moving = true;
                                break;
                            case "d":
                                keys.d.pressed = true;
                                keys.lastKey = "d";
                                background.moving = true;
                                break;
                            default:
                                break;
                        }
                    }

                }
                const handleCanvasKeyup = (event: KeyboardEvent) => {
                    switch (event.key) {
                        case "w":
                            keys.w.pressed = false;
                            break;
                        case "a":
                            keys.a.pressed = false;
                            break;
                        case "s":
                            keys.s.pressed = false;
                            break;
                        case "d":
                            keys.d.pressed = false;
                            break;
                        default:
                            break;
                    }
                }

                canvas.onkeydown = handleCanvasKeydown;
                canvas.onkeyup = handleCanvasKeyup;

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