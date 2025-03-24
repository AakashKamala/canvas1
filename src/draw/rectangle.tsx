"use client";

export function Draw(canvasRef: React.RefObject<HTMLCanvasElement>, shape: string) {
    const canvas = canvasRef.current;

    if (!canvas) {
        console.error("Canvas element is not available.");
        return;
    }

    let isDrawing = false;
    let startX = 0;
    let startY = 0;

    function handleMouseDown(e: MouseEvent) {
        e.preventDefault();
        isDrawing = true;
        startX = e.clientX;
        startY = e.clientY;
    }

    function handleMouseMove(e: MouseEvent) {
        if (!isDrawing) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const currentX = e.clientX;
        const currentY = e.clientY;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const width = currentX - startX;
        const height = currentY - startY;

        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        if(shape=="rect") {
            ctx.fillRect(startX, startY, width, height);
        }
        if(shape=="circle") {

            ctx.beginPath();
            const radius = Math.sqrt(width * width + height * height) / 2;
            const centerX = startX + width / 2;
            const centerY = startY + height / 2;
            ctx.arc(centerX, centerY, Math.abs(radius), 0, 2 * Math.PI);
            ctx.stroke();

        }
    }

    function handleMouseUp() {
        isDrawing = false;
    }

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseout', handleMouseUp);

    return () => {
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('mouseout', handleMouseUp);
    };
}