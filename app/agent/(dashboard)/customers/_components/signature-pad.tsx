'use client';

import {
  forwardRef,
  PointerEvent,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Button } from '@/components/ui/button';

export interface SignaturePadHandle {
  isEmpty(): boolean;
  toFile(): Promise<File>;
}

interface SignaturePadProps {
  onChange(hasSignature: boolean): void;
}

function pointForEvent(canvas: HTMLCanvasElement, event: PointerEvent<HTMLCanvasElement>) {
  const bounds = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - bounds.left) * canvas.width) / bounds.width,
    y: ((event.clientY - bounds.top) * canvas.height) / bounds.height,
  };
}

export const SignaturePad = forwardRef<SignaturePadHandle, SignaturePadProps>(function SignaturePad(
  { onChange },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const [hasSignature, setHasSignature] = useState(false);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    onChange(false);
  };

  const beginStroke = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    event.preventDefault();
    canvas.setPointerCapture(event.pointerId);
    const context = canvas.getContext('2d');
    if (!context) return;
    const point = pointForEvent(canvas, event);
    context.beginPath();
    context.moveTo(point.x, point.y);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 5;
    context.strokeStyle = '#1A1A1A';
    drawingRef.current = true;
  };

  const drawStroke = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !drawingRef.current) return;
    event.preventDefault();
    const context = canvas.getContext('2d');
    if (!context) return;
    const point = pointForEvent(canvas, event);
    context.lineTo(point.x, point.y);
    context.stroke();
    if (!hasSignature) {
      setHasSignature(true);
      onChange(true);
    }
  };

  const finishStroke = (event: PointerEvent<HTMLCanvasElement>) => {
    drawingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  useImperativeHandle(ref, () => ({
    isEmpty: () => !hasSignature,
    toFile: () =>
      new Promise<File>((resolve, reject) => {
        const canvas = canvasRef.current;
        if (!canvas || !hasSignature) {
          reject(new Error('Customer signature is required'));
          return;
        }
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Could not prepare the signature image'));
            return;
          }
          resolve(new File([blob], 'customer-signature.png', { type: 'image/png' }));
        }, 'image/png');
      }),
  }));

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={720}
        height={240}
        className="h-40 w-full touch-none rounded-lg border border-dashed border-border bg-white"
        aria-label="Customer signature pad"
        onPointerDown={beginStroke}
        onPointerMove={drawStroke}
        onPointerUp={finishStroke}
        onPointerCancel={finishStroke}
      />
      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Sign using a finger, stylus, or mouse.</p>
        <Button type="button" variant="ghost" size="sm" onClick={clear} disabled={!hasSignature}>
          Clear signature
        </Button>
      </div>
    </div>
  );
});
