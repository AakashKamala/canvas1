"use client"

import { Draw } from '@/draw/rectangle';
import React, { useRef, useEffect, useState } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canvasSize, setCanvasSize]=useState({width: 0, height: 0})
  const [shape, setShape]=useState<"rect" | "circle" | "pencil">("rect")

  useEffect(()=>{
    const updateCanvasSize = ()=>{
      setCanvasSize({width: window.innerWidth, height: window.innerHeight})
    }

    window.addEventListener("resize", updateCanvasSize)

    updateCanvasSize()


    return ()=>{
      window.removeEventListener("resize", updateCanvasSize)
    }
  },[])

  useEffect(() => {
    if (canvasRef.current) {
      Draw(canvasRef as React.RefObject<HTMLCanvasElement>, shape);
    }
  }, [canvasRef, shape]);

  return (
    <div className="w-screen h-screen">
      <button className='border-2 bg-amber-500' onClick={() => { 
        setShape("rect")
       }}>Rectangle</button>
      <button className='border-2 bg-amber-500' onClick={() => { 
        setShape("circle")
       }}>Circle</button>
      <canvas ref={canvasRef} className="border-2" width={canvasSize.width} height={canvasSize.height}></canvas>
    </div>
  );
}