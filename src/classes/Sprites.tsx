
// Background Class
// BackgroundSpriteProps
interface BackgroundSpriteProps {
    context: CanvasRenderingContext2D,
    position: {
        x: number,
        y: number
    };
    image: HTMLImageElement
}
interface KeysProps {
    w: { pressed: boolean },
    s: { pressed: boolean },
    d: { pressed: boolean },
    a: { pressed: boolean },
    lastKey: string
}
export class BackgroundSprite {
    context
    position: { x: number; y: number; };
    image: HTMLImageElement;
    motion: number = 0;
    moving: boolean = false;
    direction: string = "down";

    constructor({ context, position, image }: BackgroundSpriteProps) {
        this.context = context;
        this.position = position;
        this.image = image;
    }

    draw(keys: KeysProps, player: PlayerSprite) {
        this.context?.drawImage(
            this.image,
            this.position.x,
            this.position.y
        );

        if (this.moving) {
            if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed || this.motion <= (16 * 4)) {
                switch (keys.lastKey) {
                    case "w":
                        this.position.y += 1;
                        break;
                    case "a":
                        this.position.x += 1;
                        break;
                    case "s":
                        this.position.y -= 1;
                        break;
                    case "d":
                        this.position.x -= 1;
                        break;
                    default:
                        break;
                }
                if (this.motion > (16 * 4)) {
                    switch (keys.lastKey) {
                        case "w":
                            player.image = player.sprites.w;
                            break;
                        case "a":
                            player.image = player.sprites.a;
                            break;
                        case "s":
                            player.image = player.sprites.s;
                            break;
                        case "d":
                            player.image = player.sprites.d;
                        default:
                            break;
                    }
                    this.motion = 0;
                } else {
                    this.motion++;
                }
            } else {
                this.motion = 0;
                this.moving = false
            }
        }

    }
}

// Player Class
// PlayerSpriteProps
interface PlayerSpriteProps {
    context: CanvasRenderingContext2D;
    moving: boolean;
    image: HTMLImageElement;
    sprites: {
        w: HTMLImageElement,
        s: HTMLImageElement,
        d: HTMLImageElement,
        a: HTMLImageElement
    };
    canvasSize: {
        width: number;
        height: number;
    };
    speed?: number

}

export class PlayerSprite {
    context
    moving
    image
    frame = { val: 0, elapsed: 0 }
    sprites
    canvasSize
    speed

    constructor({ context, moving, image, sprites, canvasSize, speed }: PlayerSpriteProps) {
        this.context = context;
        this.moving = moving;
        this.image = image;
        this.sprites = sprites
        this.canvasSize = canvasSize;
        this.speed = { val: speed ? speed : 100, min: 0, max: 200 };
    }

    draw(background: BackgroundSprite, keys: KeysProps) {

        this.context?.drawImage(
            this.image,
            this.frame.val * this.image.width / 4,
            0,
            this.image.width / 4,
            this.image.height,
            this.canvasSize.width / 2 - (this.image.width / 4) / 2,
            this.canvasSize.height / 2 - this.image.height / 4,
            this.image.width / 4,
            this.image.height
        );

        if (!background.moving) {
            this.frame.val = 0;
            return;
        }

        this.frame.elapsed += 1
        if (this.frame.elapsed % (16 * 100 / (this.speed.val < this.speed.min ? this.speed.min : this.speed.val > this.speed.max ? this.speed.max : this.speed.val)) === 0) {
            if (this.frame.val < 3) {
                this.frame.val++
            } else {
                this.frame.val = 0;
            }

        }

    }
}