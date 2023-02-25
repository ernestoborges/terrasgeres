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
                const backgroundImage = new Image();
                backgroundImage.src = "/src/assets/maps/village/background.png";

                // player
                const playerImage = new Image();
                playerImage.src = "/src/assets/characters/human/male/walk-front.png";


                // Background Class
                // BackgroundSpriteProps
                interface BackgroundSpriteProps {
                    position: {
                        x: number,
                        y: number
                    };
                    image: HTMLImageElement
                }

                class BackgroundSprite {
                    position: { x: number; y: number; };
                    image: HTMLImageElement;
                    motion: number = 0;
                    moving: boolean = false;
                    direction: string = "down";

                    constructor({ position, image }: BackgroundSpriteProps) {
                        this.position = position;
                        this.image = image;
                    }

                    draw() {
                        context?.drawImage(
                            this.image,
                            this.position.x,
                            this.position.y
                        );

                        if (this.moving) {
                            switch (this.direction) {
                                case "top":
                                    this.position.y += 1;
                                    break;
                                case "left":
                                    this.position.x += 1;
                                    break;
                                case "down":
                                    this.position.y -= 1;
                                    break;
                                case "right":
                                    this.position.x -= 1;
                                    break;
                            }
                            this.motion++;
                        } else {
                            this.motion = 0;
                        }
                        if (this.motion > (16 * 4)){
                            this.moving = false;
                        }

                    }
                }
                const background = new BackgroundSprite({ position: { x: -startPosition.x, y: -startPosition.y }, image: backgroundImage });

                // Player Class
                // PlayerSpriteProps
                interface PlayerSpriteProps {
                    moving: boolean;
                    image: HTMLImageElement;

                }

                class PlayerSprite {
                    moving
                    image
                    frame = { val: 0, elapsed: 0 }

                    constructor({ moving, image }: PlayerSpriteProps) {
                        this.moving = moving;
                        this.image = image;
                    }

                    draw() {
                        context?.drawImage(
                            this.image,
                            this.frame.val * this.image.width / 4,
                            0,
                            this.image.width / 4,
                            this.image.height,
                            canvaSize.width / 2 - (this.image.width / 4) / 2,
                            canvaSize.height / 2 - this.image.height / 4,
                            this.image.width / 4,
                            this.image.height
                        );

                        if(!background.moving) {
                                this.frame.val = 0;
                            return;
                        }

                        this.frame.elapsed += 2
                        if (this.frame.elapsed % 16 === 0) {
                            if (this.frame.val < 3) {
                                this.frame.val++
                            } else {
                                this.frame.val = 0;
                            } 
                                
                        }

                    }
                }
                const player = new PlayerSprite({ moving: false, image: playerImage });

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
                }

                // animation
                function animate() {
                    window.requestAnimationFrame(animate)
                    // background
                    background.draw();
                    // player
                    player.draw();
                }
                animate();

                // move player
                const handleCanvasKeydown = (event: KeyboardEvent) => {
                    if(!background.moving){
                        switch (event.key) {
                            case "w":
                                keys.w.pressed = true;
                                background.direction = "top";
                                break;
                            case "a":
                                keys.a.pressed = true;
                                background.direction = "left";
                                break;
                            case "s":
                                keys.s.pressed = true;
                                background.direction = "down";
                                break;
                            case "d":
                                console.log(keys)
                                keys.d.pressed = true;
                                background.direction = "right";
                                break;
                            default:
                                break;
                        }
                    }
                    background.moving = true;

                }
                const handleCanvasKeyup = (event: KeyboardEvent) => {
                    switch (event.key) {
                        case "w":
                            console.log(keys)
                            keys.w.pressed = false;
                            break;
                        case "a":
                            console.log(keys)
                            keys.a.pressed = false;
                            break;
                        case "s":
                            console.log(keys)
                            keys.s.pressed = false;
                            break;
                        case "d":
                            console.log(keys)
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