import { useEffect, useRef } from "react"
import "./styles.css"

export function Canvas() {

    const canvasRef = useRef<HTMLCanvasElement>(null);


    useEffect(() => {
        const canvas = canvasRef.current;
        
        if (canvas) {
            canvas.width = 1024;
            canvas.height= 576;
            
            const context = canvas.getContext("2d");
            // draw
            if (context) {
                context.fillStyle = '#FF0000'
                context.fillRect(0, 0, context.canvas.width, context.canvas.height)
            }
        }

    }, []);


    return (
        <canvas ref={canvasRef} className="main-canvas">

        </canvas>
    )
}