"use client"

import { Circle } from '@/draw/circle';
import { Rectangle } from '@/draw/rectangle';
import React, { useRef, useEffect, useState } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canvasSize, setCanvasSize]=useState({width: 0, height: 0})

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
      Rectangle(canvasRef as React.RefObject<HTMLCanvasElement>);
    }
  }, [canvasRef]);

  return (
    <div className="w-screen h-screen">
      <button className='border-2 bg-amber-500' onClick={() => { 

       }}>Rectangle</button>
      <button className='border-2 bg-amber-500' onClick={() => { 

       }}>Circle</button>
      <canvas ref={canvasRef} className="border-2" width={canvasSize.width} height={canvasSize.height}></canvas>
    </div>
  );
}